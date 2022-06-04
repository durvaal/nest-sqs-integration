import { Injectable } from '@nestjs/common';

import * as cluster from 'cluster';
import * as os from 'os'
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    // @ts-ignore
    if (cluster.isPrimary && !ConfigService.isDevEnvironment()) {
      console.log(`Master server started on (${process.pid})`);
      const numCPUs = os.cpus().length;

      for (let i = 0; i < numCPUs; i++) {
        // @ts-ignore
        cluster.fork();
      }

      // @ts-ignore
      cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
      });
    } else {
      callback();
    }
  }
}
