import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { ConfigService } from 'src/config/config.service';
import { SqsMessageDto } from './dto/sqs-message.dto';

@Injectable()
export class SqsManagerService {
  private readonly QUEUE_NAME = ConfigService.getENV().AWS_QUEUE_NAME;
  private readonly QUEUE_URL = `${ConfigService.getENV().AWS_SERVICE_ENDPOINT}/${ConfigService.getENV().AWS_ACCOUNT_ID}/${this.QUEUE_NAME}`;

  constructor(
    @InjectAwsService(SQS) private readonly sqs: SQS,
  ) {}

  async createQueue() {
    try {
      const createParams: SQS.Types.CreateQueueRequest = {
        QueueName: this.QUEUE_NAME
      };
  
      return this.sqs.createQueue(createParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getQueueAttributes() {
    try {
      const createParams: SQS.Types.GetQueueAttributesRequest = {
        QueueUrl: this.QUEUE_URL,
        AttributeNames: ['All']
      };
  
      return this.sqs.getQueueAttributes(createParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendMessage(sqsMessageDto: SqsMessageDto) {
    try {
      const sendParams: SQS.Types.SendMessageRequest = {
        QueueUrl: this.QUEUE_URL,
        MessageBody: JSON.stringify(sqsMessageDto)
      };
  
      return this.sqs.sendMessage(sendParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async receiveMessage() {
    try {
      const receiveParams: SQS.Types.ReceiveMessageRequest = {
        QueueUrl: this.QUEUE_URL
      };
      
      const receiveMessageResult = await this.sqs.receiveMessage(receiveParams).promise();
      
      if (receiveMessageResult.Messages && receiveMessageResult.Messages.length > 0) {
        receiveMessageResult.Messages.map(async (message) => {
          await this.deleteMessage(message.ReceiptHandle);
        });
      } else {
        throw new NotFoundException('No messages found');
      }

      return receiveMessageResult;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException(error.message);
    }
  }

  private async deleteMessage(receiptHandle: string) {
    try {
      const deleteParams: SQS.Types.DeleteMessageRequest = {
        QueueUrl: this.QUEUE_URL,
        ReceiptHandle: receiptHandle
      };
  
      return this.sqs.deleteMessage(deleteParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
