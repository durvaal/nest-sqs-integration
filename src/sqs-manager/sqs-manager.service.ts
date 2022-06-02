import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { SqsMessageDto } from './dto/sqs-message.dto';

@Injectable()
export class SqsManagerService {
  private readonly queueName = process.env.AWS_QUEUE_NAME;
  private readonly queueUrl = `${process.env.AWS_SERVICE_ENDPOINT}/${process.env.AWS_ACCOUNT_ID}/${this.queueName}`;

  constructor(
    @InjectAwsService(SQS) private readonly sqs: SQS,
  ) {}

  async createQueue() {
    try {
      const createParams: SQS.Types.CreateQueueRequest = {
        QueueName: this.queueName,
      };
  
      return this.sqs.createQueue(createParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async sendMessage(sqsMessageDto: SqsMessageDto) {
    try {
      const sendParams: SQS.Types.SendMessageRequest = {
        QueueUrl: this.queueUrl,
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
        QueueUrl: this.queueUrl
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
        QueueUrl: this.queueUrl,
        ReceiptHandle: receiptHandle
      };
  
      return this.sqs.deleteMessage(deleteParams).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
