import { Module } from '@nestjs/common';
import { PermanentDbService } from './permanent-db.service';

@Module({
  providers: [PermanentDbService],
  exports: [PermanentDbService],
})
export class PermanentDbModule {}
