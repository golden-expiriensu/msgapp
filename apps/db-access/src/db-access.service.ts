import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'argon2';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

import { LoginOccupiedException } from '../errors';
import { CreateUserDto, EditUserDto } from './dto';
import { User } from './entity/user';

const userCacheKeyPrefix = 'users';

@Injectable()
export class DBAccessService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    const cachedUser = await this.getCache<User>(id, userCacheKeyPrefix);

    if (cachedUser) {
      return cachedUser;
    } else {
      const user = await this.userRepository.findOneBy({ id });
      if (user) await this.setCache(user, userCacheKeyPrefix);
      return user;
    }
  }

  async createUser(user: CreateUserDto): Promise<User | ForbiddenException> {
    if (await this.isLoginOccupied(user.login))
      return new LoginOccupiedException();

    const userRecord = this.userRepository.create(user);
    userRecord.password = await hash(userRecord.password);

    const createdUser = await this.userRepository.save(userRecord);
    await this.setCache(createdUser, userCacheKeyPrefix);

    return createdUser;
  }

  async editUser(
    id: number,
    user: EditUserDto,
  ): Promise<User | ForbiddenException> {
    if (await this.isLoginOccupied(user.login))
      return new LoginOccupiedException();

    if (user.password) user.password = await hash(user.password);

    await this.userRepository.update(id, user);

    const newUser = await this.userRepository.findOneBy({ id });
    await this.setCache(newUser, userCacheKeyPrefix);

    return newUser;
  }

  private async isLoginOccupied(login: string): Promise<boolean> {
    return Boolean(await this.userRepository.findOne({ where: { login } }));
  }

  private getCache<T extends { id: number }>(
    id: number,
    entityCacheKeyPrefix?: string,
  ): Promise<T> {
    return this.cacheManager.get<T>(entityCacheKeyPrefix + id);
  }

  private setCache<T extends { id: number }>(
    entity: T,
    entityCacheKeyPrefix?: string,
  ): Promise<T> {
    return this.cacheManager.set(entityCacheKeyPrefix + entity.id, entity, 0);
  }
}
