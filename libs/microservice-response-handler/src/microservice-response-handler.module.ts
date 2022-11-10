import { Module } from '@nestjs/common';

import { MicroserviceResponseHandlerService } from './microservice-response-handler.service';

@Module({
  providers: [MicroserviceResponseHandlerService],
  exports: [MicroserviceResponseHandlerService],
})
export class MicroserviceResponseHandlerModule {}
