import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location-service.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers:[LocationController],
    providers:[LocationService, PrismaService]
})
export class LocationModule {}
