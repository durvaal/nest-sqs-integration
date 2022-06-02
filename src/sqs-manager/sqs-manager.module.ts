import { Module } from '@nestjs/common';
import { SqsManagerService } from './sqs-manager.service';
import { SqsManagerController } from './sqs-manager.controller';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SQS } from 'aws-sdk';

@Module({
  imports: [AwsSdkModule.forFeatures([SQS])],
  providers: [SqsManagerService],
  controllers: [SqsManagerController],
  exports: [SqsManagerService]
})
export class SqsManagerModule {}
