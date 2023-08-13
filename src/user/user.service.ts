import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  @Inject(DbService)
  private readonly db: DbService;

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new BadRequestException('Login and password are required fields');
    }
    const creationDate = Date.now();
    const newUserId = uuid();
    const newUser = new User()
    newUser.id = newUserId;
    newUser.login = login;
    newUser.password = password;
    newUser.version = 1;
    newUser.createdAt = creationDate;
    newUser.updatedAt = creationDate;
    return await this.db.addNewUser(newUser);
  }

  findAll() {
    return this.db.findAllUsers();
  }

  findOne(id: string) {
    const user = this.db.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const user = await this.db.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { oldPassword, newPassword } = updateUserDto;

    if (!oldPassword || !newPassword) {
      throw new BadRequestException(
        'Both oldPassword and newPassword are required fields',
      );
    }
    if (user.password !== oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }
    const dto = {
      version: user.version + 1,
      updatedAt: Date.now(),
      password: newPassword,
    }
    return await this.db.updateUser(user, dto);
  }

  remove(id: string) {
    if (!this.db.findOneUser(id)) {
      throw new NotFoundException('User not found');
    }
    this.db.deleteUser(id);
  }
}
