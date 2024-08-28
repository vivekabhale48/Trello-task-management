import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateTicketDto } from './dto/createticket.dto';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { UpdateTicketDto } from './dto/updateticket.dto';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService
    ) {}

    @Get()
    @UseGuards(AuthGuard())
    async provideTicketToUser():Promise<Todo[]> {
        return this.todoService.getAllTickets()
    }

    @Post('/create-todo')
    @UseGuards(AuthGuard())
    async saveTicketDetails(
        @Body()
        ticketDetails:CreateTicketDto,
        @Req()
        requestedUser: any
    ):Promise<Todo> {
        console.log(ticketDetails);
        return this.todoService.saveATicket(ticketDetails, requestedUser.user._id);
    }

    @Put('/update-todo')
    @UseGuards(AuthGuard())
    async updateTicket(
        @Body()
        updatedTicketDetails:UpdateTicketDto
    ):Promise<Todo> {

        return this.todoService.updateATicket(updatedTicketDetails);
    }


}
