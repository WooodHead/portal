/** @format */

// #region Imports NPM
import { Controller, Get, Res } from '@nestjs/common';
import { NextResponse } from 'nest-next-module';
// #endregion
// #region Imports Local
// #endregion

@Controller('meetings')
export class MeetingsController {
  @Get()
  public async phonebook(@Res() res: NextResponse): Promise<void> {
    return res.nextRender('/meetings');
  }
}