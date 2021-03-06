/** @format */

//#region Imports NPM
import { Controller, Get, Res, UseGuards, Param } from '@nestjs/common';
import { RenderableResponse } from 'nest-next';
//#endregion
//#region Imports Local
import { SessionGuard } from '@back/guards/session.guard';
//#endregion

@Controller('tasks')
export class TasksController {
  @Get()
  @UseGuards(SessionGuard)
  public async tasks(@Res() res: RenderableResponse): Promise<void> {
    res.render('tasks');
  }

  @Get(':where/:code')
  @UseGuards(SessionGuard)
  public async task(@Res() response: RenderableResponse, @Param('where') where: string, @Param('code') code: string): Promise<void> {
    response.render('tasks', { where, code });
  }
}
