import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: any) {
    const { email, password } = body;
    return this.usersService.createUser(email, password);
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
