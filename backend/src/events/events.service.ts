import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  async createEvent(createEventDto: any): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findById(id: string): Promise<Event | null> {
    return this.eventModel.findById(id).exec();
  }

  async updateEvent(id: string, updateEventDto: any): Promise<Event | null> {
    return this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true });
  }
  
  async deleteEvent(id: string): Promise<any> {
    return this.eventModel.findByIdAndDelete(id); 
  }
}