import { ForbiddenException } from '@nestjs/common';

export class LoginOccupiedException extends ForbiddenException {
  constructor() {
    super('Login is occupied');
  }
}
