import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { User } from 'common';

import { envSchema } from '../../../env-joi-schema';
import { DBAccessController } from './db-access.controller';
import { DBAccessService } from './db-access.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      envFilePath: '.env',
    }),
    CacheModule.register({
      store: redisStore.create({
        host: String(process.env.REDIS_HOST || 'localhost'),
        port: Number(process.env.REDIS_PORT || 6379),
        password: String(process.env.REDIS_PASSWORD || 'redispw'),
        // @ts-ignore
        ttl: 60 * 60 * 24 * 10, // 10 days
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.POSTGRES_HOST || 'localhost'),
      port: Number(process.env.POSTGRES_PORT || 5432),
      username: String(process.env.POSTGRES_USER_NAME || 'postgres'),
      password: String(process.env.POSTGRES_PASSWORD || 'postgres'),
      database: String(process.env.POSTGRES_BASE_NAME || 'postgres'),
      entities: [User],
      synchronize: Boolean(process.env.POSTGRES_SYNCHRONIZE || false),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [DBAccessService],
  controllers: [DBAccessController],
  exports: [DBAccessService],
})
export class DBAccessModule {}
