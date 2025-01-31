import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Criar novo usuário (email + password)
  async createUser(email: string, password: string): Promise<User> {
    // verificar se email já existe
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new BadRequestException('E-mail já cadastrado');
    }
    // em produção, lembrar de colocar (hash da senha)
    const created = new this.userModel({ email, password });
    return created.save();
  }

  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
