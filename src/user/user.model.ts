import { Prisma } from "@prisma/client";


export class User implements Prisma.userCreateInput {
    fullname: string;
    username: string;
    password: string;
    description?: string;
    user_img?: string;
    role: string;
    id_number: string;
    phone: string;
    email: string;
    direction: string;
    inventory?: Prisma.inventoryCreateNestedManyWithoutUserInput;
    configuration?: Prisma.configurationCreateNestedOneWithoutUserInput;
    location?: Prisma.locationCreateNestedOneWithoutUserInput;
   
}