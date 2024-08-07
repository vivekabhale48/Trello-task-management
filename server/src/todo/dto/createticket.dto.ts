import { User } from "src/auth/schemas/user.schema";
import { Priority, Status } from "../schemas/todo.schema";
import { IsDate, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(Status, {message:'Please enter valid Status!'})
    readonly status: Status;

    @IsNotEmpty()
    @IsEnum(Priority, {message:'Please enter valid Priority!'})
    readonly priority: Priority;

    @IsNotEmpty()
    @IsString()
    readonly deadline: string;

    @IsOptional()
    @IsString()
    readonly attachments: string;

    @IsEmpty({message: 'You cannnot pass userID'})
    readonly reporters: User;

}