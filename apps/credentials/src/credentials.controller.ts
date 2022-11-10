import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto, EditUserDto } from 'apps/db-access/src/dto';
import { User } from 'apps/db-access/src/entity/user';

import { CredentialsService } from './credentials.service';

@Controller()
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.credentialsService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.credentialsService.createUser(user);
  }

  @Patch(':id')
  editUser(@Param('id') id: number, @Body() user: EditUserDto): Promise<User> {
    return this.credentialsService.editUser(id, user);
  }
}
