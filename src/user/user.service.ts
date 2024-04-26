import { PrismaService } from "src/prisma.service";
import { User } from "./user.model";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "./dto/user.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
    
    constructor(private prismaService: PrismaService){}

    async getAllUsers(): Promise<User[]>{
        return this.prismaService.user.findMany();
    }


    async getByUsername (username:string): Promise<User> {
        return this.prismaService.user.findFirstOrThrow({where:{username:username}});
    }
    async getUser(username:string, password:string): Promise<User>{
        return this.prismaService.user.findFirstOrThrow({where:{password:password, username:username}});
    }

    async createUser(data: Prisma.userCreateInput): Promise<UserDTO> {
        const user:User =  await this.prismaService.user.create({
            data
        })
        return this.getUserDTO(user); 
    }

    async updateUser(id:number,data: Prisma.userCreateInput): Promise<User> {
        return this.prismaService.user.update({
            where:{id_user:Number(id)},
            data:data
        })
    }

    async deleteUser(id:number): Promise<User> {
        return this.prismaService.user.delete({
            where:{id_user:Number(id)}
        })
    }

    getUserDTO(user:User):UserDTO {
        return {id_user:user.id_user,username:user.username, name:user.producer_name,role: user.role};
    }

}