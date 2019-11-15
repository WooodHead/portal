/** @format */

// #region Imports NPM
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
// #endregion
// #region Imports Local
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { LdapModule } from '../ldap/ldap.module';
import { LdapModuleOptions } from '../ldap/interfaces/ldap.interface';
import { AuthService } from './auth.service';
// #endregion

jest.mock('../ldap/ldap.service');
jest.mock('./auth.service');
jest.mock('../user/user.service');
jest.mock('../guards/gqlauth.guard');
jest.mock('../../__mocks__/ldap.service.mock');

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({}),

        LdapModule.registerAsync({
          useFactory: () => ({} as LdapModuleOptions),
        }),

        UserModule,
      ],
      providers: [AuthResolver, AuthService],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});