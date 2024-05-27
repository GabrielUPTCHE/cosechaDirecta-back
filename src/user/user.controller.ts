import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {  User } from "./user.model";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { UserDTO } from "./dto/user.dto";
import { Auth } from "src/authentication/decorators/auth.decorator";
import { Role } from "src/constant/role";


@Controller('user')

export class UserController {
    
    constructor(private readonly userService: UserService){}
    
    @Auth(Role.N, Role.A)
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

}