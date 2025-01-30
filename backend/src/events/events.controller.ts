import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventsService } from './events.service'; 
 
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: any) {
    // Aqui poderíamos também validar manualmente se os campos existem
    // mas se confiamos no required do Mongoose, ele rejeitará documentos sem eles
    return this.eventsService.createEvent(createEventDto);
  }

  @Get() 
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }
 
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: any, 
  ) { 
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}

