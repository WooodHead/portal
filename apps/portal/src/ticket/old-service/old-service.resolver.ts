/** @format */

// #region Imports NPM
import { UseGuards, UnauthorizedException } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
// #endregion
// #region Imports Local
import { ConfigService } from '@app/config';
import { User } from '../../user/models/user.dto';
import { GqlAuthGuard } from '../../guards/gqlauth.guard';
import { OldService, OldTicketNewInput, OldTicketNew } from './models/old-service.interface';
import { TicketOldService } from './old-service.service';
// #endregion

@Resolver('TicketOldServiceResolver')
export class TicketOldServiceResolver {
  constructor(private readonly configService: ConfigService, private readonly ticketOldService: TicketOldService) {}

  /**
   * GraphQL query: GetService
   *
   * @returns {OldService[]}
   */
  @Query()
  @UseGuards(GqlAuthGuard)
  async OldTicketService(@Context('req') req: Request): Promise<OldService[]> {
    const user = req.user as User;

    if (user) {
      return this.ticketOldService
        .OldTicketService(user.username, user.passwordFrontend as string, this.configService.get<string>('SOAP_DOMAIN'))
        .catch((error: Error) => {
          throw new UnauthorizedException(error.message);
        });
    }

    throw new UnauthorizedException();
  }

  /**
   * GraphQL mutation: TicketNew
   *
   * @returns {OldService[]}
   */
  @Mutation()
  @UseGuards(GqlAuthGuard)
  async OldTicketNew(@Context('req') req: Request, @Args('ticket') ticket: OldTicketNewInput): Promise<OldTicketNew[]> {
    const user = req.user as User;

    if (user) {
      // return this.ticketOldService
      //   .GetService(user.username, user.passwordFrontend as string, this.configService.get<string>('SOAP_DOMAIN'))
      //   .catch((error: Error) => {
      //     throw new UnauthorizedException(error.message);
      //   });
    }

    throw new UnauthorizedException();
  }
}
