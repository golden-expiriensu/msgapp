import { NestFactory } from '@nestjs/core';
import { CredentialsModule } from './credentials.module';

async function bootstrap() {
  const app = await NestFactory.create(CredentialsModule);
  await app.listen(3000);
}
bootstrap();
