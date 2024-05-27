import { Prisma } from "@prisma/client";

export class Sale implements Prisma.saleCreateInput {
    sale_date: string | Date;
    sale_status: string;
    payment_method: string;
    delivery_status: string;
    is_paid: number;
    id_user_producer: number;
    id_user_bussines: number;
    user_sale_id_user_bussinesTouser: Prisma.userCreateNestedOneWithoutSale_sale_id_user_bussinesTouserInput;
    sales_detail?: Prisma.sales_detailCreateNestedManyWithoutSaleInput;
}

export class SaleDetail implements Prisma.sales_detailCreateInput {
    user: Prisma.userCreateNestedOneWithoutSales_detailInput;
    unit_price: number;
    amount: number;
    id_sale: number;
    id_product: number;
    id_user_producer: number;
    sale: Prisma.saleCreateNestedOneWithoutSales_detailInput;
    product: Prisma.productCreateNestedOneWithoutSales_detailInput;
}