/** @format */

import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RedisService } from 'nestjs-redis';

import { ConfigService } from '@app/config';
import { SoapService } from '@app/soap';
import { TicketsService } from './tickets.service';

jest.mock('@app/config/config.service');
jest.mock('nestjs-redis');

const serviceMock = jest.fn(() => ({}));
// const repositoryMock = jest.fn(() => ({
//   metadata: {
//     columns: [],
//     relations: [],
//   },
// }));

describe(TicketsService.name, () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useFactory: () => ({}),
        }),
      ],
      providers: [
        ConfigService,
        TicketsService,
        RedisService,
        {
          provide: 'PUB_SUB',
          useValue: serviceMock,
        },
        { provide: WINSTON_MODULE_PROVIDER, useValue: serviceMock },
        { provide: SoapService, useValue: serviceMock },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
