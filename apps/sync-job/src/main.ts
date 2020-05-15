/** @format */
/* eslint spaced-comment:0 */
/// <reference types="../../../typings/global" />

// #region Imports NPM
import { resolve } from 'path';
import { ClientRedis } from '@nestjs/microservices';
import { PinoLogger, Logger } from 'nestjs-pino';
// #endregion
// #region Imports Local
import { ConfigService } from '@app/config';
import { pinoOptions } from '@back/shared/pino.options';
import { LDAP_SYNC } from '@lib/constants';
// #endregion

const configService = new ConfigService(resolve(__dirname, __DEV__ ? '../../..' : '../../..', '.env'));
const logger = new Logger(new PinoLogger(pinoOptions(configService.get<string>('LOGLEVEL'))), {});

async function bootstrap(config: ConfigService): Promise<boolean> {
  const client = new ClientRedis({
    url: config.get<string>('MICROSERVICE_URL'),
  });

  await client.connect();

  return client.send<boolean>(LDAP_SYNC, []).toPromise();
}

bootstrap(configService)
  .then((result) => {
    logger.log(`Microservice returns: ${result}`, 'Sync LDAP Job');

    return process.exit(result ? 0 : 1);
  })
  .catch((error) => {
    throw new Error(`Synch job: Result: ${JSON.stringify(error)}`);
  });
