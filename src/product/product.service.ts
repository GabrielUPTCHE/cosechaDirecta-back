import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Inventory, InventoryDto, Product, ProductDTO } from './product.model';
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
                    time_period_type: product.time_period_type,
                    location: {connect: {id_location:product.location_id}},
                    begin_period_date: product.begin_period_date
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

    async getProduct(idProduct:string): Promise<ProductDTO | any> {
        let resolvedProduct =  await this.prismaService.product.findFirstOrThrow({where:{id_product:Number(idProduct)}, include:{
            product_images:true, inventory:{include:{user:{select:{fullname:true, id_user:true}}}}, location:true
        }})
        if(resolvedProduct.inventory[0].next_delivery_date && this.itsSameDate(resolvedProduct.inventory[0].next_delivery_date)){
            const inventory = {
                next_delivery_date: this.getDateNextDelivery(resolvedProduct.inventory[0].next_delivery_date, resolvedProduct.time_period_type),
                quantity: resolvedProduct.inventory[0].quantity,
                unit_price: resolvedProduct.inventory[0].unit_price,
                id_product: resolvedProduct.id_product,
                id_user: resolvedProduct.inventory[0].user.id_user
            }
            const resolvedInventory = await this.updateInventory(inventory);
            resolvedProduct =  await this.prismaService.product.findFirstOrThrow({where:{id_product:Number(idProduct)}, include:{
                product_images:true, inventory:{include:{user:{select:{fullname:true, id_user:true}}}}, location:true
            }})
        }
        return resolvedProduct;
    }

    async getAllProducts(): Promise<Product | any> {
        return this.prismaService.product.findMany({include:{product_images:true}});
    }

    async createInventory(inventory: Inventory | any): Promise<Inventory | any> {
        return await this.prismaService.inventory.create({
            data:{
                unit_price: inventory.inventory.unit_price,
                quantity: inventory.inventory.quantity,
                product:{connect: {id_product:inventory.inventory.id_product}},
                user: {connect: {id_user: inventory.inventory.id_user}},
                next_delivery_date: this.getDateNextDelivery(inventory.inventory.next_delivery_date, inventory.inventory.time_period_type),
                quantity_available: inventory.inventory.quantity
            }
        });
    }

    async getInventoryByUser(id_user: number): Promise<InventoryDto[]> {
        const products = await this.prismaService.inventory.findMany({where:{id_user}, include: {product: {include: {location: true}}} });
        return products.map( inventory => {return {
            id_product: inventory.id_product,
            id_user: inventory.id_user,
            location: inventory.product.location.location_name,
            product_name: inventory.product.product_name,
            time_period_size: inventory.product.time_period_size,
            time_period_type: inventory.product.time_period_type,
            unit_measure: inventory.product.unit_measure,
            variety: inventory.product.variety,
            description: inventory.product.description,
            quantity: inventory.quantity,
            unit_price: inventory.unit_price,
            begin_period_date: inventory.product.begin_period_date
        }})

    }

    async updateProduct(product: any ) : Promise<Product | any> {
        return await this.prismaService.product.update({
            where:{id_product: Number(product.id_product)},data: {
                begin_period_date: product.begin_period_date,
                product_name: product.product_name,
                variety:product.variety,
                description: product.description,
                unit_measure: product.unit_measure,
                time_period_size: product.time_period_size,
                time_period_type: product.time_period_type,
                location: {connect: {id_location:product.location_id}}
            }
        })
    }

    async updateInventory(inventory: any ) : Promise<Inventory | any> {
        return await this.prismaService.inventory.update({
            where: { id_product_id_user: { id_product: Number(inventory.id_product), id_user: Number(inventory.id_user) } },
            data: {
               product: {connect: {id_product: Number(inventory.id_product)}},
               quantity: inventory.quantity,
               unit_price:inventory.unit_price,
               user: { connect:{ id_user: Number(inventory.id_user) }},
               next_delivery_date: this.getDateNextDelivery(inventory.next_delivery_date, inventory.time_period_type)
            }
        })
    }

    async deleteProduct(id_product: number) : Promise<any> {
        await this.prismaService.sales_detail.deleteMany({where:{id_product:Number(id_product)}});
        await this.prismaService.product_images.deleteMany({where:{id_product:Number(id_product)}});
        await this.prismaService.inventory.deleteMany({where:{id_product:Number(id_product)}});
        const resolvedDelete = await  this.prismaService.product.delete({where:{id_product:Number(id_product)}, include:{inventory:true,product_images:true}});
        return resolvedDelete;
    }

    

    itsSameDate(deliveryDateString: Date): boolean {
        let deliveryDate = new Date(deliveryDateString);
        let todayDate = new Date();
        deliveryDate.setHours(0,0,0,0);
        todayDate.setHours(0,0,0,0);
        return deliveryDate.getTime() == todayDate.getTime(); 
    }
    
    getDateNextDelivery(date: Date, periodType: string) : Date {
        const resultDate = new Date(date);
        if (periodType === 'semanal') {
            resultDate.setDate(resultDate.getDate() + 7);
            return resultDate;
        }
        if (periodType === 'mensual') {
            resultDate.setMonth(resultDate.getMonth() + 1);
            return resultDate;
        }
        if (periodType === 'diario') {
            resultDate.setDate(resultDate.getDate() + 1);
            return resultDate;
        }
        return null;
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



