import { Module } from '@nestjs/common';
import { CacheDbService } from './cache-db.service';

@Module({
  providers: [CacheDbService],
  exports: [CacheDbService],
})
export class CacheDbModule {}
