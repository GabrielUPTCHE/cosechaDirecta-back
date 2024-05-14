import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get('period-sizes/:typePeriod')
    getPeriodSizes(@Param('typePeriod') typePeriod:string): string[] {
        return this.productService.getTimePeriodSize(typePeriod);
    }
    
    @Get('period-types')
    getPeriodTypes( ): string[] {
        return this.productService.getTimePeriodType();
    }
    
    @Get('  ')
    getUnitMeasures( ): string[] {
        return this.productService.getUnitMeasures();
    }
    

}
