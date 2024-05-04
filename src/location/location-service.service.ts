import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Location } from './location.model';

@Injectable()
export class LocationService {

    constructor(private prismaService: PrismaService){}

    async getAllLocations():Promise<Location[]>{
        return this.prismaService.location.findMany();
    }

    async getLocation(id:number): Promise<Location> {
        return this.prismaService.location.findUnique({where:{id_location:Number(id)}})
    }

    async getDepartaments():Promise<Location[]>{
        return this.prismaService.location.findMany({where:{location_type:'D'}})
    }

    async getCitiesByDepartments(deparment: number):Promise<Location[]>{
        return this.prismaService.location.findMany({where:{location_parent:Number(deparment)}});
    }


}
