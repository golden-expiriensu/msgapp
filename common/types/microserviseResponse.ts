import { ForbiddenException } from '@nestjs/common';

export class MicroserviceResponse<T> {
  public readonly isError: boolean = false;

  constructor(public readonly result: T | ForbiddenException) {
    if (result instanceof ForbiddenException) this.isError = true;
  }
}
