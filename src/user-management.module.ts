import { Module } from '@nestjs/common';
import { BadUserController } from './bad-user.controller';
import { BadUserService } from './bad-user.service';

@Module({
  controllers: [BadUserController],
  providers: [BadUserService],
  exports: [BadUserService],
})
export class UserManagementModule {}
