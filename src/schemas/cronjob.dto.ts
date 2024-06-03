import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateCronDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsString()
    @IsNotEmpty()
    api_key: string;

    @IsString()
    @IsNotEmpty()
    scheduled_time: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_date: Date;
}