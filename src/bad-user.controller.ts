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
} from '@nestjs/common';
import { BadUserService } from './bad-user.service';
import { Request, Response } from 'express';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

@Controller('users')
export class BadUserController {
  constructor(private userService: BadUserService) {}

  @Get()
  async getAllUsers(@Query() query: any, @Res() res: Response) {
    try {
      let users = await this.userService.findAll();

      // Business logic in controller - should be in service
      if (query.active === 'true') {
        users = users.filter((user) => user.isActive);
      }

      if (query.role) {
        users = users.filter((user) => user.role === query.role);
      }

      // Sorting logic in controller
      if (query.sortBy) {
        users.sort((a, b) => {
          if (query.sortBy === 'name') {
            return a.name.localeCompare(b.name);
          } else if (query.sortBy === 'email') {
            return a.email.localeCompare(b.email);
          }
          return 0;
        });
      }

      // Pagination logic in controller
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedUsers = users.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedUsers,
        total: users.length,
        page: page,
        totalPages: Math.ceil(users.length / limit),
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findById(parseInt(id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  }

  @Post()
  async createUser(
    @Body() userData: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // Validation in controller instead of using DTOs/pipes
    if (!userData.email || !userData.name || !userData.password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (userData.password.length < 6) {
      return res.status(400).json({ message: 'Password too short' });
    }

    // Business logic in controller
    const existingUser = await this.userService.findByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Direct manipulation of user data
    userData.createdAt = new Date();
    userData.isActive = true;
    userData.role = userData.role || 'user';

    const newUser = await this.userService.create(userData);
    res.status(201).json({ success: true, user: newUser });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: any,
    @Res() res: Response,
  ) {
    const userId = parseInt(id);
    const existingUser = await this.userService.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Dangerous: allows updating any field
    const updatedUser = await this.userService.update(userId, updateData);
    res.json({ message: 'User updated', user: updatedUser });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const userId = parseInt(id);
    await this.userService.delete(userId);
    res.json({ message: 'User deleted successfully' });
  }

  @Post(':id/send-welcome-email')
  async sendWelcomeEmail(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findById(parseInt(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Email logic in controller - should be separate service
    console.log(`Sending welcome email to ${user.email}`);

    // Fake email sending
    setTimeout(() => {
      console.log('Email sent!');
    }, 1000);

    res.json({ message: 'Welcome email sent' });
  }

  @Get(':id/profile')
  async getUserProfile(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findById(parseInt(id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Formatting logic in controller
    const profile = {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      memberSince: new Date(user.createdAt).toLocaleDateString(),
      isVip: user.totalPurchases > 1000,
      status: user.isActive ? 'Active' : 'Inactive',
    };

    res.json(profile);
  }
}
