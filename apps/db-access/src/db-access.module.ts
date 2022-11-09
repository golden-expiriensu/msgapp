import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import * as Joi from 'joi';

import { DBAccessController } from './db-access.controller';
import { DBAccessService } from './db-access.service';
import { User } from './entity/user';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore.create({
        // @ts-ignore
        ttl: 60 * 60 * 24 * 10, // 10 days
      }),
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
      },
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_PORT: Joi.number(),
        POSTGRES_USER_NAME: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_BASE_NAME: Joi.string().required(),
        POSTGRES_SYNCHRONIZE: Joi.boolean(),
      }),
      envFilePath: 'apps/db-access/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER_NAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_BASE_NAME,
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
