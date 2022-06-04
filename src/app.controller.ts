import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as os from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('process')
  process(): any {
    const numberOfCores = os.cpus().length;
    return {
      numberOfCores,
    };
  }
}
