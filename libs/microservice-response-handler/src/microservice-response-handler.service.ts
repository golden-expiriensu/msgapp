import { ForbiddenException, Injectable } from '@nestjs/common';
import { MicroserviceResponse } from 'common';

@Injectable()
export class MicroserviceResponseHandlerService {
  extract<T>(response: MicroserviceResponse<T>): T {
    if (response.errorMessage)
      throw new ForbiddenException(response.errorMessage);
    return response.result as T;
  }
}
