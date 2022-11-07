import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { DBAccessModule } from "./db-access.module";

async function bootstrap() {
  const app = await NestFactory.create(DBAccessModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
