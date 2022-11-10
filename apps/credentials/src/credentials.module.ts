import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envSchema } from 'env-joi-schema';
import { MicroserviceResponseHandlerModule } from 'libs/microservice-response-handler/src';

import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      envFilePath: '.env',
    }),
    ClientsModule.register([
      {
        name: 'DB_ACCESS',
        transport: Transport.RMQ,
        options: {
          urls: [
            {
              protocol: String(process.env.RABBITMQ_PROTOCOL || 'amqp'),
              hostname: String(process.env.RABBITMQ_HOST || 'localhost'),
              port: Number(process.env.RABBITMQ_PORT || '5672'),
              username: String(process.env.RABBITMQ_USER_NAME || ''),
              password: String(process.env.RABBITMQ_PASSWORD || ''),
            },
          ],
          queue: String(process.env.RABBITMQ_DB_ACCESS_QUEUE || 'default'),
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MicroserviceResponseHandlerModule,
  ],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
