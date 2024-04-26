import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthenticationService {

    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user: User = await this.userService.getByUsername(username);
        if (user && user.username === username && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async generateJwtToken(user: User): Promise<string> {
        const dto: UserDTO = this.userService.getUserDTO(user)
        const payload = { user: dto };
        return await this.jwtService.signAsync(payload);
    }
}
