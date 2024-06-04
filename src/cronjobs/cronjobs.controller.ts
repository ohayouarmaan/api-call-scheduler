import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CronjobsService } from "./cronjobs.service";
import { CreateCronDto, UpdateCronJobDto } from "src/schemas/cronjob.dto";
import { SkipThrottle } from "@nestjs/throttler";

@Controller('cron')
export class CronJobController {
    constructor(private cronService: CronjobsService){};

    @SkipThrottle({default: false})
    @Get("/")
    async getAll() {
        return await this.cronService.getAll(); 
    }

    @SkipThrottle({default: false})
    @Post("/create")
    async createOne(@Body() body: CreateCronDto) {
        return await this.cronService.createOne(body);
    }

    @SkipThrottle({default: false})
    @Put(":id")
    async updateOne(@Param() id: string, @Body() body: UpdateCronJobDto) {
        return await this.cronService.updateOne(id, body);
    }

    @SkipThrottle({default: false})
    @Delete(":id")
    async deleteOne(@Param() id: string) {
        return await this.cronService.deleteOne(id)
    }

    @SkipThrottle({default: false})
    @Get(":id")
    async getOne(@Param() id: string) {
        return await this.cronService.getOne(id);
    }
}