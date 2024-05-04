import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LocationModule } from './location/location.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authentication/strategy/JwtStrategy';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, LocationModule, AuthenticationModule,
    JwtModule.register({
      global:true,
      secret:`${process.env.SECRET_KEY}`,
      signOptions:{expiresIn:'1h'}
    })
  ],
  controllers: [],
  providers: [UserService, AuthenticationModule, PrismaService, JwtStrategy],
})
export class AppModule {}
