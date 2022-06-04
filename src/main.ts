import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClusterService } from './cluster/cluster.service';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const port = ConfigService.getENV().UPLOAD_SERVICE_PORT;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  console.log(`Server (${process.pid}) is running on ${port}`);
}

ClusterService.clusterize(bootstrap);
