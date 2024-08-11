import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)//or ('User') basically schema class name.
        private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async signUp(userData: SignUpDto):Promise<SignUpDto> {
        const {name, email, password} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);

        const saveUser = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
        })

        return saveUser;
    }

    async login(userDetails: LoginDto):Promise<{user: User, token: string}> {

        const {email, password} = userDetails;

        // const encryptedPass = await 
        const user = await this.userModel.findOne({email});
        if(!user) throw new UnauthorizedException('Invalid email or password!');
        const isPassword = await bcrypt.compare(password, user.password);
        
        if(!isPassword) throw new UnauthorizedException('Invalid email or password!');

        const token = this.jwtService.sign({id: user._id});
        return {user, token};
    }
}
