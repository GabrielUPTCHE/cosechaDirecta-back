import { Prisma } from "@prisma/client";

export class Product implements Prisma.productCreateInput{
    product_name: string;
    variety: string;
    unit_measure: string;
    description?: string;
    time_period_size: string;
    time_period_type: string;
    product_images?: Prisma.product_imagesCreateNestedManyWithoutProductInput;
   
}

export class product_image implements Prisma.product_imagesCreateInput {
    url_image: string;
    product: Prisma.productCreateNestedOneWithoutProduct_imagesInput;

}

