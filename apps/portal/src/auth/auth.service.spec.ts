/** @format */

//#region Imports NPM
import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/common';
import { LdapService } from 'nestjs-ldap';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
//#endregion
//#region Imports Local
import { ConfigService } from '@app/config';
import { UserService } from '@back/user/user.service';
import { AuthService } from './auth.service';
//#endregion

jest.mock('@app/config/config.service');

const serviceMock = jest.fn(() => ({}));
// const repositoryMock = jest.fn(() => ({
//   metadata: {
//     columns: [],
//     relations: [],
//   },
// }));

describe(AuthService.name, () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ConfigService,
        AuthService,
        { provide: WINSTON_MODULE_PROVIDER, useValue: serviceMock },
        { provide: HttpService, useValue: serviceMock },
        { provide: LdapService, useValue: serviceMock },
        { provide: UserService, useValue: serviceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
