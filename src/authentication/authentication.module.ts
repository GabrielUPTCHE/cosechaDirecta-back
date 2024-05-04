import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UserService, PrismaService]
})
export class AuthenticationModule {}
