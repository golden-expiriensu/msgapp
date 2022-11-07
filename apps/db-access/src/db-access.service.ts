import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
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

  async createUser(user: CreateUserDto): Promise<User> {
    const userRecord = this.userRepository.create(user);
    userRecord.password = await hash(userRecord.password);

    return this.userRepository.save(userRecord);
  }
}
