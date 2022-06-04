import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Credentials } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsManagerModule } from './sqs-manager/sqs-manager.module';
import { ClusterService } from './cluster/cluster.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        endpoint: ConfigService.getENV().AWS_SERVICE_ENDPOINT,
        region: ConfigService.getENV().AWS_REGION,
        credentials: new Credentials({
          accessKeyId: ConfigService.getENV().AWS_ACCESS_KEY_ID,
          secretAccessKey: ConfigService.getENV().AWS_SECRET_ACCESS_KEY,
        }),
      },
    }),
    SqsManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ClusterService, ConfigService],
})
export class AppModule {}
