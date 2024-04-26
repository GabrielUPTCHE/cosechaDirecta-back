import { Prisma } from "@prisma/client";

export class Location implements Prisma.locationCreateInput {
    id_location: number;
    location_name: string;
}