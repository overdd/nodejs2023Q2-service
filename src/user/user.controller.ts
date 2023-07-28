import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() response: Response, @Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return response.status(HttpStatus.CREATED).send(user);
  }

  @Get()
  findAll() {
    return [
      { statusCode: HttpStatus.OK },
      { users: this.userService.findAll() },
    ];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findOne(id);
    return { statusCode: HttpStatus.OK, user };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      this.userService.remove(id);
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return { statusCode: HttpStatus.NOT_FOUND, message: err.message };
      }
      if (err.status === HttpStatus.BAD_REQUEST) {
        return { statusCode: HttpStatus.BAD_REQUEST, message: err.message };
      }
      throw err;
    }
  }
}
