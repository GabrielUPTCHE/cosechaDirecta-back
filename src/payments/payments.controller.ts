import { Body, Controller, Post } from '@nestjs/common';
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

}
