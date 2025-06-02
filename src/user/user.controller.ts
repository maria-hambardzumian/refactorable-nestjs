import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto } from './dtos/user-query.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: UserQueryDto) {
    return this.userService.findAllWithFilters(query);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateUserDto>,
  ) {
    return this.userService.update(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Post(':id/send-welcome-email')
  async sendWelcomeEmail(@Param('id', ParseIntPipe) id: number) {
    return this.userService.sendWelcomeEmail(id);
  }

  @Get(':id/profile')
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.calculateUserStats(id);
  }
}
