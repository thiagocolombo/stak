import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module'; // (iremos criar em seguida)

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://evento:aRfwRWbzUk9MMRsM@events.lzrle.mongodb.net/'), 
    //MongooseModule.forRoot('mongodb://localhost:27017/bd-events'),
    EventsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
