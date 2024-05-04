import { Prisma } from "@prisma/client";


export class User implements Prisma.userCreateInput {
    id_number: string;
    phone: string;
    email: string;
    direction: string;
    id_user: number; 
    fullname: string;
    username: string;
    password: string;
    description?: string;
    user_img?: string;
    role: string;
    configuration?: Prisma.configurationCreateNestedOneWithoutUserInput;
    location?: Prisma.locationCreateNestedOneWithoutUserInput;
}