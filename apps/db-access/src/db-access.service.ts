import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/user';
import { User } from './entity/user';

@Injectable()
export class DBAccessService {
  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(user: CreateUserDto): Promise<User> {
    const userRecord = this.userRepository.create(user);
    return this.userRepository.save(userRecord);
  }
}
