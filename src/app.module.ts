import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Credentials, SQS } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsManagerModule } from './sqs-manager/sqs-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        endpoint: process.env.AWS_SERVICE_ENDPOINT,
        region: process.env.AWS_REGION,
        credentials: new Credentials({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }),
      },
    }),
    SqsManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
