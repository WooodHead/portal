/** @format */

// #region Imports NPM
import { Test, TestingModule } from '@nestjs/testing';
// #endregion
// #region Imports Local
import { SoapModule, SoapOptions } from '@app/soap';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// #endregion

jest.mock('@app/soap/soap.service');

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SoapModule.registerAsync({
          useFactory: () => ({} as SoapOptions),
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('"synchronization" should be defined', () => {
      expect(appController.synchronization()).toBeDefined();
    });
  });
});