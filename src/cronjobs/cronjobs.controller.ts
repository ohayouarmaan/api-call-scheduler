import { Body, Controller, Get, Post } from "@nestjs/common";
import { CronjobsService } from "./cronjobs.service";
import { CreateCronDto } from "src/schemas/cronjob.dto";

@Controller('cron')
export class CronJobController {
    constructor(private cronService: CronjobsService){};

    @Get("/")
    getAll() {
        return this.cronService.getAll(); 
    }

    @Post("/create")
    createOne(@Body() body: CreateCronDto) {
        return this.cronService.createOne(body);
    }
}