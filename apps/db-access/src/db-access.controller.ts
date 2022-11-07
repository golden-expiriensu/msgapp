import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { DBAccessService } from './db-access.service';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './entity/user';

@Controller()
export class DBAccessController {
  constructor(private readonly dbAccessService: DBAccessService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.dbAccessService.getUser(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.dbAccessService.createUser(user);
  }

  @Patch(':id')
  editUser(@Param('id') id: number, @Body() user: EditUserDto): Promise<User> {
    return this.dbAccessService.editUser(id, user);
  }
}
