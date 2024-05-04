import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly authservice: AuthenticationService){}

    @Post('login')
    async login(@Body() credentials: { username: string, password: string }) {
        const { username, password } = credentials;
        const user: User = await this.authservice.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = await this.authservice.generateJwtToken(user);
        return { token };
    }

}
