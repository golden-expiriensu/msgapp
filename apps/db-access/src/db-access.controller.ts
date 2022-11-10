import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateUserDto,
  EditUserDto,
  LoginOccupiedException,
  User,
} from 'common';

import { DBAccessService } from './db-access.service';

@Controller()
export class DBAccessController {
  constructor(private readonly dbAccessService: DBAccessService) {}

  @MessagePattern('get_user')
  getUser(@Payload() id: number): Promise<User> {
    return this.dbAccessService.getUser(id);
  }

  @MessagePattern('create_user')
  createUser(
    @Payload() user: CreateUserDto,
  ): Promise<User | LoginOccupiedException> {
    return this.dbAccessService.createUser(user);
  }

  @MessagePattern('edit_user')
  editUser(
    @Payload() user: EditUserDto & { id: number },
  ): Promise<User | LoginOccupiedException> {
    return this.dbAccessService.editUser(user.id, user);
  }
}
