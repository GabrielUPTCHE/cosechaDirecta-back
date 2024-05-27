import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Sale, SaleDetail } from './models/sale';

@Injectable()
export class PaymentsService {

    constructor(private prismaService: PrismaService) {}

    async createSale(saleInput: Sale | any):Promise<Sale | any> {
        const {sale, salesDetail} = saleInput;
        const resolvedSale = await this.prismaService.sale.create({data:
            {
                sale_date: sale.sale_date,
                sale_status:sale.sale_status,
                payment_method:sale.payment_method,
                delivery_status:sale.payment_method,
                is_paid:sale.is_paid,
                user_sale_id_user_bussinesTouser: {connect: {id_user:sale.id_user_bussines}},
            }
        })

        salesDetail.forEach( async element => {
            await this.prismaService.sales_detail.create({data:{
                amount:element.amount,
                unit_price: element.unit_price,
                product: {connect: {id_product: element.id_product}},
                sale: {connect: { id_sale: resolvedSale.id_sale}},
                user: {connect: {id_user: element.id_user_producer}}
            }})
            const inventory = await this.prismaService.inventory.findFirstOrThrow({where:{id_product:element.id_product}});
            const updateAvaiableQuantity = inventory.quantity_available - element.amount;
            await this.prismaService.inventory.update({
                where: { id_product_id_user: { id_product: Number(inventory.id_product), id_user: Number(inventory.id_user) } }, data: {
                    quantity_available: updateAvaiableQuantity
                }
            })
        });
        
        return null;
    }

    async createSaleDetail(saleDetail: SaleDetail) : Promise <SaleDetail | any> {
        return await this.prismaService.sales_detail.create(
            {
                data:
                {
                    amount:saleDetail.amount,
                    unit_price: saleDetail.unit_price,
                    product: {connect: {id_product: saleDetail.id_product} },
                    sale: {connect: {id_sale: saleDetail.id_sale}},
                    user: {connect: {id_user: saleDetail.id_user_producer}}
                }
            }
        )
    }


}
