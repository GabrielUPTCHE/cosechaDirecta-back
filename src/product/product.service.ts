import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './product.model';
import { product } from '@prisma/client';

@Injectable()
export class ProductService {

    constructor(private prismaService: PrismaService) {}

    async createProduct(product: Product | any): Promise<Product | any> {
        try {
            return this.prismaService.product.create({
                data: {
                    product_name: product.product_name,
                    variety:product.variety,
                    description: product.description,
                    unit_measure: product.unit_measure,
                    time_period_size: product.time_period_size,
                    time_period_type: product.time_period_type
                }
                ,
                include: {
                    product_images: true 
                }
            });            
           
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw new Error("Error al crear el producto");
        }
    }

    async createProducImages(id_product:number,images:string[]): Promise <product | any> {
        return this.prismaService.product_images.createMany({
            data: images.map((url) => ({ id_product: id_product, url_image: url })),
        })
    }

    async getProduct(idProduct:string): Promise<Product | any> {
        return this.prismaService.product.findFirstOrThrow({where:{id_product:Number(idProduct)}, include:{
            product_images:true
        }})
    }

    async getAllProducts(): Promise<Product | any> {
        return this.prismaService.product.findMany({include:{product_images:true}});
    }

    getTimePeriodSize(periodType:string):any[]{
        if (periodType==='diario')
            return [
                {value:'1', name:'1'},
                {value:'2', name:'2'},
                {value:'3', name:'3'},
                {value:'4', name:'4'},
                {value:'5', name:'5'},
                {value:'6', name:'6'}
            ];
        if (periodType==='semanal') 
            return [
                {value:'1', name:'1'},
                {value:'2', name:'2'},
                {value:'3', name:'3'}
            ];
        if (periodType==='mensual') 
            return [
                {value:'1', name:'1'},
                {value:'2', name:'2'},
                {value:'3', name:'3'},
                {value:'4', name:'4'},
                {value:'5', name:'5'},
                {value:'6', name:'6'},
                {value:'7', name:'7'},
                {value:'8', name:'8'},
                {value:'9', name:'9'},
                {value:'10', name:'10'},
                {value:'11', name:'11'}
            ];
    }

    getTimePeriodType():any[] {
        return [
            {name:'diario', value:'diario'},
            {name:'semanal', value: 'semanal'}, 
            {name:'mensual', value: 'mensual'}
        ]
    }

    getUnitMeasures(): any[] {
        return [
            {name:'Kilogramo', unit:'Kg'}, 
            {name:'Libra',unit:'Lb'}, 
            {name:'Gramo',unit:'Gr'}, 
            {name:'Unidad',unit:'Und'}, 
            {name:'Bandeja', unit:'Bndj'}
        ];
    }

}



