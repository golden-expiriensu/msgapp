import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, EditUserDto, User } from 'common';
import { MicroserviceResponse } from 'common/types/microserviseResponse';
import { MicroserviceResponseHandlerService } from 'libs/microservice-response-handler/src';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CredentialsService {
  constructor(
    @Inject('DB_ACCESS') private readonly dbAccessMicroservice: ClientProxy,
    private readonly rabbitmqHandler: MicroserviceResponseHandlerService,
  ) {}

  getUser(id: number): Promise<User> {
    const source = this.dbAccessMicroservice.send<User, number>('get_user', id);
    return lastValueFrom(source);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const source = this.dbAccessMicroservice.send<
      Promise<MicroserviceResponse<User>>,
      CreateUserDto
    >('create_user', user);

    return this.rabbitmqHandler.extract(await lastValueFrom(source));
  }

  async editUser(id: number, user: EditUserDto): Promise<User> {
    const source = this.dbAccessMicroservice.send<
      Promise<MicroserviceResponse<User>>,
      EditUserDto & { id: number }
    >('edit_user', { ...user, id });

    return this.rabbitmqHandler.extract(await lastValueFrom(source));
  }
}
