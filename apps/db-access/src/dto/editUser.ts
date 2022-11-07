import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './createUser';

export class EditUserDto extends PartialType(CreateUserDto) {}
