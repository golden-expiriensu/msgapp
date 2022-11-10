import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { DBAccessModule } from './db-access.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DBAccessModule,
    {
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
  );
  await app.listen();
}
bootstrap();
