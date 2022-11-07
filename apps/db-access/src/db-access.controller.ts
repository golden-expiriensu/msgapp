import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";

import { DBAccessService } from "./db-access.service";
import { CreateUserDto } from "./dto/user";
import { User } from "./entity/user";

@Controller()
export class DBAccessController {
  constructor(private readonly dbAccessService: DBAccessService) {}
  
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.dbAccessService.getUser(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.dbAccessService.createUser(user);
  }
}
