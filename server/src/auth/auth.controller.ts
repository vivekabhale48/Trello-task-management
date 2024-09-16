import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
        const {user, token} = await this.authService.login(userLoginCreds);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'none',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        res.send({user, message: 'Login Successful'})
    }

    @Post('logout')
    async logout(
        @Res()
        res: Response
    ) {
        res.cookie('token', '', {httpOnly: true, secure: true, sameSite: 'none', maxAge: 0});
        res.status(200).json({message: 'Logged out successfully!'});
    }

    @Get('user')
    @UseGuards(AuthGuard())
    async getUser(
        @Req()
        req: Request,
        @Res()
        res: Response
    ):Promise<void> {
        const user = req.user
        res.send({user, message: 'Fetched user successfully!'})
    }
}


