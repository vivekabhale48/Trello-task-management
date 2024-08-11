import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                let token = null;
                if(req && req.cookies) {
                    token = req.cookies['token'];
                }
                return token;
            }]),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload:any) {
        console.log(payload);
        const { id } = payload;

        const user = this.userModel.findById(id);

        if(!user) {
            throw new UnauthorizedException('LOgin first to access the Home page.')
        }

        return user;
    }

}