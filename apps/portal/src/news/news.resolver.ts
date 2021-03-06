/** @format */

//#region Imports NPM
import type { Request, Response } from 'express';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards, UnauthorizedException } from '@nestjs/common';
//#endregion
//#region Imports Local
import { User } from '@lib/types/user.dto';
import { CurrentUser } from '@back/user/user.decorator';
import { GqlAuthGuard } from '@back/guards/gqlauth.guard';
import { IsAdminGuard } from '@back/guards/gqlauth-admin.guard';
import { UserService } from '@back/user/user.service';
import { NewsService } from './news.service';
import { NewsEntity } from './news.entity';
//#endregion

@Resolver('News')
export class NewsResolver {
  constructor(private readonly newsService: NewsService, private readonly userService: UserService) {}

  /**
   * GraphQL query: news
   *
   * @returns {News[]}
   */
  @Query()
  @UseGuards(GqlAuthGuard)
  async news(): Promise<NewsEntity[]> {
    return this.newsService.news();
  }

  /**
   * GraphQL mutation: editNews
   *
   * @returns {string} - id of news
   */
  @Mutation()
  @UseGuards(GqlAuthGuard)
  @UseGuards(IsAdminGuard)
  async editNews(
    @Context('req') request: Request,
    @Args('title') title: string,
    @Args('excerpt') excerpt: string,
    @Args('content') content: string,
    @Args('id') id: string,
    @CurrentUser() user?: User,
  ): Promise<NewsEntity> {
    if (!user || !user.id) {
      throw new UnauthorizedException();
    }

    const author = await this.userService.byId({ id: user.id, loggerContext: { username: user.username, headers: request.headers } });
    return this.newsService.editNews({ title, excerpt, content, author, id });
  }

  /**
   * GraphQL mutation: deleteNews
   *
   * @returns {boolean} - true/false of delete news
   */
  @Mutation()
  @UseGuards(GqlAuthGuard)
  @UseGuards(IsAdminGuard)
  async deleteNews(@Args('id') id: string): Promise<boolean> {
    return this.newsService.deleteNews(id);
  }
}
