import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Sale } from './models/sale';
import { PaymentsService } from './payments.service';
import { Auth } from 'src/authentication/decorators/auth.decorator';

@Controller('payments')
export class PaymentsController {

    constructor(private paymentService: PaymentsService) {}

    @Post('create-sale')
    async createSale(@Body() sale: Sale | any ): Promise<Sale | any> {
        return await this.paymentService.createSale(sale)
    }

    @Get('get-sales/:id_user_bussines')
    async getSales(@Param('id_user_bussines') id_user_bussines: number ): Promise<any[]> {
        return await this.paymentService.getSalesBussines(id_user_bussines);
    }
    
    @Get('get-sale-details/:id_sales')
    async getSalesDetails(@Param('id_sales') id_sales: number ): Promise<any[]> {
        return await this.paymentService.getSalesDetail(id_sales);
    }
    @Get('get-sale-details-by-producer/:id_producer')
    async getSalesDetailsByProducer(@Param('id_producer') id_producer: number ): Promise<any[]> {
        return await this.paymentService.getSalesDetailByProducer(id_producer);
    }

    

}
