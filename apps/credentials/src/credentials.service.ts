import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, EditUserDto } from 'apps/db-access/src/dto';
import { User } from 'apps/db-access/src/entity/user';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CredentialsService {
  constructor(
    @Inject('DB_ACCESS') private readonly dbAccessMicroservice: ClientProxy,
  ) {}

  getUser(id: number): Promise<User> {
    const source = this.dbAccessMicroservice.send<User, number>('get_user', id);
    return lastValueFrom(source);
  }

  createUser(user: CreateUserDto): Promise<User> {
    const source = this.dbAccessMicroservice.send<
      User | ForbiddenException,
      CreateUserDto
    >('create_user', user);

    return this.handleMicroserviseResponse(lastValueFrom(source));
  }

  editUser(id: number, user: EditUserDto): Promise<User> {
    const source = this.dbAccessMicroservice.send<
      User | ForbiddenException,
      EditUserDto & { id: number }
    >('edit_user', { ...user, id });

    return this.handleMicroserviseResponse(lastValueFrom(source));
  }

  private async handleMicroserviseResponse<T>(
    response: Promise<T | ForbiddenException>,
  ): Promise<T> {
    const raw = await response;
    // console.log((raw as ForbiddenException).getResponse())
    // if (raw instanceof ForbiddenException) throw raw
    // return raw as T
    console.log(raw);

    return raw as T;
  }
}
