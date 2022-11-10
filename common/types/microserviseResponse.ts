import { ForbiddenException } from '@nestjs/common';

export class MicroserviceResponse<T> {
  public errorMessage: string = undefined;

  constructor(public result: T | ForbiddenException) {
    if (result instanceof ForbiddenException)
      this.errorMessage = result.message;
  }
}
