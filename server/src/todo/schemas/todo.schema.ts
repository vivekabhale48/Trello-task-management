import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


export enum Status {
    TODO ='todo',
    INPROGRESS = 'in progress',
    UNDERREVIEW = 'under review',
    FINISED = 'finished'
}

export enum Priority {
    URGENT = 'urgent',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

@Schema({
    timestamps: true
})
export class Todo {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: Status;

    @Prop()
    priority: Priority;

    @Prop({type: Date})
    deadline: Date;

    @Prop()
    attachments: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    reporters: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);