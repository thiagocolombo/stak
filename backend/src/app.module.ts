import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module'; 
import { UsersModule } from './users/users.module'; 


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://evento:aRfwRWbzUk9MMRsM@events.lzrle.mongodb.net/'), 
    //MongooseModule.forRoot('mongodb://localhost:27017/bd-events'),
    EventsModule,
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
