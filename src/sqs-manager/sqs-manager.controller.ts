import { Body, Controller, Get, Post } from '@nestjs/common';
import { SqsMessageDto } from './dto/sqs-message.dto';
import { SqsManagerService } from './sqs-manager.service';

@Controller('sqs-manager')
export class SqsManagerController {
  constructor(private sqsManagerService: SqsManagerService) {}

  @Post('create-queue')
  async createQueue() {
    return this.sqsManagerService.createQueue();
  }

  @Get('queue-attributes')
  async getQueueAttributes() {
    return this.sqsManagerService.getQueueAttributes();
  }

  @Post('send-message')
  async sendMessage(@Body() sqsMessageDto: SqsMessageDto) {
    return this.sqsManagerService.sendMessage(sqsMessageDto);
  }

  @Get('receive-message')
  async receiveMessage() {
    return this.sqsManagerService.receiveMessage();
  }
}
