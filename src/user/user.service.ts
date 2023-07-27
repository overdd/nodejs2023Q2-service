import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/interfaces/user.interface';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class UserService {
  private users: { [id: string]: User } = {};

  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    if (!login || !password) {
      throw new BadRequestException('Login and password are required fields');
    }
    const creationDate = Date.now();
    const newUserId = uuid();
    const newUser: User = {
      id: newUserId,
      login,
      password,
      version: 1,
      createdAt: creationDate,
      updatedAt: creationDate,
    };
    this.users[newUserId] = newUser;
    delete newUser.password;
    return newUser;
  }

  findAll() {
    return Object.values(this.users);
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const user = this.users[id];
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users[id];
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

    user.password = newPassword;
    return user;
  }

  remove(id: string) {
    if (!this.users[id]) {
      throw new NotFoundException('User not found');
    }
    delete this.users[id];
  }
}
