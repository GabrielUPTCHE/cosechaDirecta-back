import { Prisma } from "@prisma/client";

export class Product implements Prisma.productCreateInput {
    begin_period_date: string | Date;
    inventory?: Prisma.inventoryCreateNestedManyWithoutProductInput;
    product_name: string;
    variety: string;
    unit_measure: string;
    description?: string;
    time_period_size: string;
    time_period_type: string;
    location: Prisma.locationCreateNestedOneWithoutProductInput;
    product_images?: Prisma.product_imagesCreateNestedManyWithoutProductInput;
}

export class product_image implements Prisma.product_imagesCreateInput {
    url_image: string;
    product: Prisma.productCreateNestedOneWithoutProduct_imagesInput;

}

export class Inventory implements Prisma.inventoryCreateInput {
    quantity?: number;
    unit_price?: number;
    next_delivery_date?: string | Date;
    quantity_available?: number;
    product: Prisma.productCreateNestedOneWithoutInventoryInput;
    user: Prisma.userCreateNestedOneWithoutInventoryInput;
   
}


export interface InventoryDto {
    product_name: string;
    variety: string;
    unit_measure: string;
    description?: string;
    time_period_size: string;
    time_period_type: string;
    location: string;
    id_product: number;
    id_user: number;
    quantity?: number;
    unit_price?: number;
    begin_period_date: Date | string;
}

export interface ProductDTO {
    id_product:       number;
    product_name:     string;
    variety:          string;
    unit_measure:     string;
    description:      string;
    time_period_size: string;
    time_period_type: string;
    location_id:      number;
    product_images:   ProductImage[];
    inventory:        Inventory[];
    location:         Location;
    begin_period_date: Date | string;
    
}

export interface InventoryDTO {
    id_product: number;
    id_user:    number;
    quantity:   number;
    unit_price: number;
    quantity_available?: number;
    user: {
        fullname: string;
        id_user: number;
    }
}

export interface Location {
    id_location:     number;
    location_name:   string;
    location_parent: number;
    location_type:   string;
}

export interface ProductImage {
    id_product_images: number;
    id_product:        number;
    url_image:         string;
}



