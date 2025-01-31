import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module'; 
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    //inserir acesso ao banco de dados do mongodb
    MongooseModule.forRoot('mongodb+srv://USUARIO:SENHA@NOME_DO_BANCO.lzrle.mongodb.net/'), 
    EventsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
