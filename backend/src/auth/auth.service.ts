import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // Validar e-mail e senha
  async validateUserByEmailPassword(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    
    if (user.password !== pass) return null;

    const { password, ...rest } = user.toObject();
    return rest;
  }

  // Gerar JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
