import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { InferSchemaType } from "mongoose";

// For additional features. (still wip)
export enum Status {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    ARCHIVE = "ARCHIVE",
    TAKEN = "TAKEN"
}

@Schema({
    timestamps: true
})
export class Cronjob {
    @Prop()
    name: string

    @Prop()
    link: string

    @Prop()
    api_key: string

    @Prop()
    scheduled_time: string

    @Prop()
    start_date: Date

    @Prop({ type: String, enum: Status, default: Status.ACTIVE })
    status: Status

    @Prop()
    next_execution: Date

    @Prop({ type: Number, default: 0 })
    number_of_executions: number

    @Prop({ type: Number, default: 0 })
    number_of_failures: number
}

export const CronjobSchema = SchemaFactory.createForClass(Cronjob);

export type ICron = InferSchemaType<typeof CronjobSchema>
