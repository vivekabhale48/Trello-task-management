import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true,
})
export class User {
  
    @Prop()
    name: string;

    @Prop({unique: [true, 'Already Registered with this Email!']})
    email: string;

    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);