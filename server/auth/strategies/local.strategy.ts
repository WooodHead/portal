/** @format */

// #region Imports NPM
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// #endregion
// #region Imports Local
import { AuthService } from '../auth.service';
import { UserResponse } from '../../user/models/user.dto';
// #endregion

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate = async (username: string, password: string): Promise<UserResponse | null> =>
    this.authService.validate(username, password);
}