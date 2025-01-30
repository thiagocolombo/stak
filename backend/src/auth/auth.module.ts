// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule, // para buscar usuários no DB
    PassportModule,
    JwtModule.register({
      secret: '12345', // troque por algo seguro ou use .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
