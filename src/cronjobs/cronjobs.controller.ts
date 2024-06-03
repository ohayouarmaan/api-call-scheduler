import { Controller, Get } from "@nestjs/common";
import { CronjobsService } from "./cronjobs.service";

@Controller('cron')
export class CronJobController {
    constructor(private cronService: CronjobsService){};

    @Get("/")
    getAll() {
        return this.cronService.getAll(); 
    }
}