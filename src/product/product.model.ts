import { Prisma } from "@prisma/client";

export class Product {
    id_product: number;
    product_name: string;
    variety: string;
    unit_measure: string;
    description?: string;
    time_period_size: string;
    time_period_type: string;
    
}

export class product_image implements Prisma.product_imagesCreateInput {
    url_image: string;
    product: Prisma.productCreateNestedOneWithoutProduct_imagesInput;

}

