import { Controller, Get, Param } from "@nestjs/common";
import { LocationService } from "./location-service.service";
import { Location } from "./location.model";

@Controller('location')
export class LocationController {

    constructor(private readonly locationService: LocationService){}

    @Get('get-all')
    async getAllLcations():Promise<Location[]>{
        return this.locationService.getAllLocations();
    }

    @Get('get/:id')
    async getLocation(@Param('id') id: number): Promise<Location>{
        return this.locationService.getLocation(id);
    }

    @Get('get-all-departments')
    async getAllDepartments():Promise<Location[]>{
        return this.locationService.getDepartaments();
    }

    @Get('get-cities/:id')
    async getCitiesByDepartment(@Param('id') deparment:number):Promise<Location[]>{
        return this.locationService.getCitiesByDepartments(deparment);
    }

}