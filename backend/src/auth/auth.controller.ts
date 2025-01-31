import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    // Validação no BD
    const user = await this.authService.validateUserByEmailPassword(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Se ok, gera JWT
    return this.authService.login(user); 
  }
}
