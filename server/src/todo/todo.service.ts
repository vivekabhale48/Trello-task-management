import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import mongoose from 'mongoose';
import { CreateTicketDto } from './dto/createticket.dto';
import { UpdateTicketDto } from './dto/updateticket.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectModel(Todo.name)
        private todoModel:mongoose.Model<Todo>
    ) {}

    async getAllTickets():Promise<Todo[]> {
        
        const getTickets = await this.todoModel.find();
        return getTickets;
    }

    async saveATicket(ticketInfo:CreateTicketDto, requestedUser:any):Promise<Todo> {

        const completeTicket = {...ticketInfo, reporters: requestedUser}
        const savedTicket = await this.todoModel.create(completeTicket);
        return savedTicket;
    }

    async updateATicket(ticketInfo:UpdateTicketDto):Promise<Todo> {

        const ticketToUpdateId = ticketInfo.updateTicketId;
        //below line deletes the updateTicketId field from ticketInfo 
        const { updateTicketId, ...newTicketInfo } = ticketInfo;
        const savedTicket = await this.todoModel.findByIdAndUpdate(ticketToUpdateId, newTicketInfo, {
            new: true,
            runValidators: true
        })
        return savedTicket;
    }
}
