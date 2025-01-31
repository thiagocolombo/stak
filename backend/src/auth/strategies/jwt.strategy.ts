
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY_AQUI',
    });
  }

  async validate(payload: any) {
    // 'payload.sub' = user._id
    // 'payload.email' = user.email
    return { userId: payload.sub, email: payload.email };
  }
}
