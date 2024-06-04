import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Bree from 'bree';
import * as path from 'node:path';

@Injectable()
export class AppInitService implements OnModuleInit {
  private bree: Bree;

  constructor() {
    console.log(typeof Bree);
    this.bree = new Bree({
        root: path.join(__dirname, "jobs"),
        jobs: [
            {
              name: "task-runner.bgservice",
              timeout: 0,
            }
        ]
    })
  }

  onModuleInit() {
    console.log('Application has started');
    this.initializeCronJobs();
  }

  private initializeCronJobs() {
    this.bree.start();
    console.log('Initializing cron jobs...');
  }
}
