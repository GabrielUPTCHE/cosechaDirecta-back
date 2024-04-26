import { Controller, Get, Param } from "@nestjs/common";
import { LocationService } from "./location-service.service";
import { Location } from "./location.model";

@Controller('location')
export class LocationController {

    constructor(private readonly locationService: LocationService){}

    @Get('get-all')
    async getAllAdministrator():Promise<Location[]>{
        return this.locationService.getAllLocations();
    }

    @Get('get/:id')
    async getAdministrator(@Param('id') id: number): Promise<Location>{
        return this.locationService.getLocation(id);
    }

}