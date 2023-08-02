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
  ParseUUIDPipe,
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
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userService.findOne(id);
    return { statusCode: HttpStatus.OK, user };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = this.userService.update(id, updateUserDto);
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.userService.remove(id);
  }
}
