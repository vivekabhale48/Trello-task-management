import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signUp(
        @Body()
        signUpCreds: SignUpDto,
        @Res()
        res: Response
    ):Promise<any> {
        const user = await this.authService.signUp(signUpCreds);
        return res.send({user, message: 'Account created Successfully!'});
    }

    @Post('/login')
    async login(
        @Body()
        userLoginCreds: LoginDto,
        @Res()
        res: Response
    ):Promise<void> {
        console.log(userLoginCreds);
        const {token} = await this.authService.login(userLoginCreds);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'strict',
            maxAge: 360000
        })
        res.send({message: 'Login Successful'})
    }
}


