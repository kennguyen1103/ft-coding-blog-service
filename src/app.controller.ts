import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @Get()
  ping() {
    return 'Pong';
  }
}
