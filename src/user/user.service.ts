import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db/db.service';
import { v4 as uuid, validate } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly db: DbService) {}

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
    this.db.addNewUser(newUser);
    const userForReturn = structuredClone(newUser);
    delete userForReturn.password;
    return userForReturn;
  }

  findAll() {
    return this.db.findAllUsers();
  }

  findOne(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    const user = this.db.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException('Invaid type of DTO');
    }
    const user = this.db.findOneUser(id);
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
    user.version++;
    user.updatedAt = Date.now();
    const userForReturn = structuredClone(user);
    delete userForReturn.password;
    return userForReturn;
  }

  remove(id: string) {
    const isUUID = validate(id);
    if (!isUUID) {
      throw new BadRequestException('Provided id is not valid');
    }
    if (!this.db.findOneUser(id)) {
      throw new NotFoundException('User not found');
    }
    this.db.deleteUser(id);
  }
}
