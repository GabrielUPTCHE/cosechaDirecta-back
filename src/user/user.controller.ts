import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {  User } from "./user.model";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "./dto/user.dto";


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get('get-all')
    async getAllUsers():Promise<User[]>{
        return this.userService.getAllUsers();
    }
    @Post('create')
    async createUser(@Body() data: User):Promise<UserDTO>{
        data.password =  await bcrypt.hash(data.password, 16)
        return this.userService.createUser(data);
    }

    @Post('validate-user')
    async validateUser(@Body() data: {username:string, password:string}): Promise<User>{
        return this.userService.getUser(data.username, data.password);
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id:number): Promise<User> {
        return this.userService.deleteUser(id)
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: number,@Body() data: User):Promise<User>{
        return this.userService.updateUser(id,data);
    }

}