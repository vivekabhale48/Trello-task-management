import { User } from "src/auth/schemas/user.schema";
import { Priority, Status } from "../schemas/todo.schema";
import { IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsEnum(Status, {message: 'Enter a valid Status!'})
    readonly status: Status;

    @IsOptional()
    @IsEnum(Priority, {message: 'Enter a valid Priority!'})
    readonly priority: Priority;

    @IsOptional()
    @IsString()
    readonly deadline: string;

    @IsOptional()
    @IsString()
    readonly attachments: string;

    @IsEmpty({message: 'User not supposed to add this feild'})
    readonly reporters: User;

    @IsNotEmpty()
    @IsString()
    readonly updateTicketId: string;

}