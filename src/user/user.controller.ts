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
    async createUser(@Body() data: User | any):Promise<UserDTO | any>{
        try {
            data.location = { connect: { id_location: data.location } };
            data.password = await bcrypt.hash(data.password, 16);
            const user = await this.userService.createUser(data)
            return  {status:'success', detail:'Creacion exitosa', message:'Usuario creado con éxito. ¡Bienvenido!', user:user};
        } catch (error) {
            console.log('error:::', error);
            if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
                return {status:'error',code:error.code,detail:'Nombre de usuario repetido', message: 'El nombre de usuario ya está en uso. Por favor, elija otro.'}
            }
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
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