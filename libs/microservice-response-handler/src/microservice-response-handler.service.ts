import { ForbiddenException, Injectable } from '@nestjs/common';
import { MicroserviceResponse } from 'common';

@Injectable()
export class MicroserviceResponseHandlerService {
  extract<T>(response: MicroserviceResponse<T>): T {
    if (response.isError)
      throw new ForbiddenException(
        (response.result as ForbiddenException).message,
      );
    return response.result as T;
  }
}
