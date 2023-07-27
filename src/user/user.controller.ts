import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = this.userService.create(createUserDto);
      return response.status(HttpStatus.CREATED).send(user);
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        return response.status(HttpStatus.BAD_REQUEST).send();
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return [
      { statusCode: HttpStatus.OK },
      { users: this.userService.findAll() },
    ];
  }

  @Get(':id')
  findOne(@Res() response, @Param('id') id: string) {
    try {
      const user = this.userService.findOne(id);
      return { statusCode: HttpStatus.OK, user };
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return response.status(HttpStatus.NOT_FOUND).send();
      }
      if (error.status === HttpStatus.BAD_REQUEST) {
        return response.status(HttpStatus.BAD_REQUEST).send();
      }
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = this.userService.update(id, updateUserDto);
      return { statusCode: HttpStatus.OK, user: updatedUser };
    } catch (err) {
      if (err.status === HttpStatus.NOT_FOUND) {
        return { statusCode: HttpStatus.NOT_FOUND, message: err.message };
      }
      if (err.status === HttpStatus.BAD_REQUEST) {
        return { statusCode: HttpStatus.BAD_REQUEST, message: err.message };
      }
      if (err.status === HttpStatus.FORBIDDEN) {
        return { statusCode: HttpStatus.FORBIDDEN, message: err.message };
      }
      throw err;
    }
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
