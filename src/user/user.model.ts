import { Prisma } from "@prisma/client";

export class Administrator implements Prisma.administratorCreateInput {
    id_administrator: number;
    username: string;
    password: string;
    name: string;
}

export class User implements Prisma.userCreateInput {
    id_user: number;
    producer_name: string;
    username: string;
    password: string;
    description?: string;
    user_img?: string;
    role: string;
    configuration?: Prisma.configurationCreateNestedOneWithoutUserInput;
    location?: Prisma.locationCreateNestedOneWithoutUserInput;
}