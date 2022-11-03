import { Controller, Get } from '@nestjs/common';
import { CredentialsService } from './credentials.service';

@Controller()
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get()
  getHello(): string {
    return this.credentialsService.getHello();
  }
}
