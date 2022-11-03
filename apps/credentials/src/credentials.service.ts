import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialsService {
  getHello(): string {
    return 'Hello World!';
  }
}
