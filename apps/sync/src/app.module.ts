/** @format */
/* eslint spaced-comment:0 */
/// <reference types="../../../typings/global" />

//#region Imports NPM
import { resolve } from 'path';
import { parse as urlLibParse } from 'url';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LdapModule, Scope, ldapADattributes } from 'nestjs-ldap';
import { RedisModule, RedisModuleOptions, RedisService } from 'nestjs-redis';
import type { Redis } from 'ioredis';
//#endregion
//#region Imports Local
import { redisOptions } from '@back/shared/redis.options';
import { LoggingInterceptor } from '@app/logging.interceptor';
import { winstonOptions } from '@back/shared/logger.options';
import { UserModule } from '@back/user/user.module';
import { UserEntity } from '@back/user/user.entity';
import { ProfileModule } from '@back/profile/profile.module';
import { ProfileEntity } from '@back/profile/profile.entity';
import { GroupModule } from '@back/group/group.module';
import { GroupEntity } from '@back/group/group.entity';
import { TypeOrmLogger } from '@back/shared/typeorm.logger';

import { ConfigModule, ConfigService } from '@app/config';

import { AppController } from './app.controller';
import { SyncService } from './app.service';
//#endregion

const environment = resolve(__dirname, '../../..', '.local/.env');

@Module({
  imports: [
    //#region Config & Log module
    ConfigModule.register(environment),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => winstonOptions(configService),
    }),
    //#endregion

    //#region Redis module
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const result: RedisModuleOptions[] = [];

        if (configService.get<string>('DATABASE_REDIS_URI')) {
          result.push(
            redisOptions({
              name: 'DATABASE',
              url: urlLibParse(configService.get<string>('DATABASE_REDIS_URI')),
              ttl: configService.get<number>('DATABASE_REDIS_TTL') || 60,
              prefix: 'DATABASE:',
            }),
          );
        }

        if (configService.get<string>('LDAP_REDIS_URI')) {
          result.push(
            redisOptions({
              name: 'LDAP',
              url: urlLibParse(configService.get<string>('LDAP_REDIS_URI')),
              ttl: configService.get<number>('LDAP_REDIS_TTL') || 60,
              prefix: 'LDAP:',
            }),
          );
        }

        return result;
      },
    }),
    //#endregion

    //#region LDAP Module
    LdapModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService, redisService: RedisService) => {
        let cache: Redis | undefined;
        try {
          cache = redisService.getClient('LDAP');
        } catch {
          cache = undefined;
        }
        return {
          url: configService.get<string>('LDAP_URL'),
          bindDN: configService.get<string>('LDAP_BIND_DN'),
          bindCredentials: configService.get<string>('LDAP_BIND_PW'),
          searchBase: configService.get<string>('LDAP_SEARCH_BASE'),
          searchFilter: configService.get<string>('LDAP_SEARCH_USER'),
          searchScope: 'sub' as Scope,
          groupSearchBase: configService.get<string>('LDAP_SEARCH_BASE'),
          groupSearchFilter: configService.get<string>('LDAP_SEARCH_GROUP'),
          groupSearchScope: 'sub' as Scope,
          groupDnProperty: 'dn',
          groupSearchAttributes: ldapADattributes,
          searchAttributes: ldapADattributes,
          searchBaseAllUsers: configService.get<string>('LDAP_SEARCH_BASE'),
          searchFilterAllUsers: configService.get<string>('LDAP_SEARCH_FILTER_ALL_USERS'),
          searchFilterAllGroups: configService.get<string>('LDAP_SEARCH_FILTER_ALL_GROUPS'),
          searchScopeAllUsers: 'sub' as Scope,
          searchAttributesAllUsers: ldapADattributes,
          reconnect: true,
          cache,
          cacheTtl: configService.get<number>('LDAP_REDIS_TTL'),
        };
      },
    }),
    //#endregion

    //#region TypeORM
    TypeOrmModule.forRootAsync({
      imports: [WinstonModule],
      inject: [ConfigService, WINSTON_MODULE_NEST_PROVIDER],
      useFactory: async (configService: ConfigService, logger: Logger) =>
        ({
          name: 'default',
          keepConnectionAlive: true,
          type: 'postgres',
          replication: {
            master: {
              url: configService.get<string>('DATABASE_URI'),
            },
            slaves: [{ url: configService.get<string>('DATABASE_URI_RD') }],
          },
          schema: configService.get<string>('DATABASE_SCHEMA'),
          uuidExtension: 'pgcrypto',
          logger: new TypeOrmLogger(logger),
          synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE'),
          dropSchema: configService.get<boolean>('DATABASE_DROP_SCHEMA'),
          logging:
            configService.get('DATABASE_LOGGING') === 'false'
              ? false
              : configService.get('DATABASE_LOGGING') === 'true'
              ? true
              : JSON.parse(configService.get('DATABASE_LOGGING')),
          entities: [ProfileEntity, GroupEntity, UserEntity],
          migrationsRun: configService.get<boolean>('DATABASE_MIGRATIONS_RUN'),
          cache: {
            type: 'redis',
            options: {
              url: configService.get<string>('DATABASE_REDIS_URI'),
            },
            duration: configService.get<number>('DATABASE_REDIS_TTL'),
          },
        } as TypeOrmModuleOptions),
    }),
    //#endregion

    //#region TypeORM
    TypeOrmModule.forFeature([ProfileEntity, GroupEntity, UserEntity]),
    //#endregion

    GroupModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [SyncService, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
