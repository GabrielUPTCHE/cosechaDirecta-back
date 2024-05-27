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

    async createUser(data: Prisma.userCreateInput): Promise<UserDTO | any> {
        const user: User | any = await this.prismaService.user.create({
            data
        })
        return this.getUserDTO(user);
    }

    getUserDTO(user:User | any):UserDTO {
        return {
            id_user:user.id_user,
            username:user.username, 
            fullname:user.fullname,
            role: user.role, 
            email:user.email ,
            direction:user.direction,
            location_id:user.id_location,
            phone:user.username,
            user_img:user.user_img
        };
    }

}