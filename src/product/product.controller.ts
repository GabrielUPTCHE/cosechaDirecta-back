import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/authentication/decorators/auth.decorator';
import { Role } from 'src/constant/role';
import { Inventory, Product } from './product.model';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}
    @Auth(Role.A, Role.P)
    @Get('period-sizes/:typePeriod')
    getPeriodSizes(@Param('typePeriod') typePeriod:string): string[] {
        return this.productService.getTimePeriodSize(typePeriod);
    }
    
    @Auth(Role.A, Role.P)
    @Get('period-types')
    getPeriodTypes( ): string[] {
        return this.productService.getTimePeriodType();
    }
    
    @Auth(Role.A, Role.P)
    @Get('unit-measures')
    getUnitMeasures( ): string[] {
        return this.productService.getUnitMeasures();
    }
    
    @Auth(Role.A, Role.P)
    @Post('create-product')
    async createProduct(@Body() product: Product): Promise< Product | any> {
        try {
            return await this.productService.createProduct(product);
        } catch (error) {
            console.log('el error:', error);
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }
    
    @Auth(Role.A, Role.P)
    @Post('create-product-images')
    async createProductImages(@Body() createProductImages:{productId:number, images:string[]}): Promise< Product | any> {
        try {
            const data =await this.productService.createProducImages(createProductImages.productId,createProductImages.images );
            return await this.productService.getProduct(createProductImages.productId.toString())
        } catch (error) {
            console.log('el error:', error);
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }

    @Auth(Role.A, Role.P)
    @Post('create-inventory')
    async createInventory(@Body() inventory: Inventory): Promise< Inventory | any> {
        try {
            return await this.productService.createInventory(inventory);
        } catch (error) {
            console.log('el error:', error);
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }

    @Auth(Role.A, Role.P)
    @Put('update-product')
    async updateProduct(@Body() product: Product): Promise< Product | any> {
        try {
            return await this.productService.updateProduct(product);
        } catch (error) {
            console.log('el error:', error);
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }

    @Auth(Role.A, Role.P)
    @Put('update-inventory')
    async updateInventory(@Body() inventory: Inventory): Promise< Inventory | any> {
        try {
            return await this.productService.updateInventory(inventory);
        } catch (error) {
            console.log('el error:', error);
            return {status:'error',code:error.code, detail:'Error al crear' ,message: 'Ocurrió un error al crear el usuario.'}
        }
    }
    
    @Get('get-product/:id_product')
    async getProduct(@Param('id_product') idProduct: string): Promise<Product | any>{
        return this.productService.getProduct(idProduct);
    }

    @Get('get-all-products')
    async getAllProducts(): Promise<Product[] | any> {
        return await this.productService.getAllProducts()
    }

    
    @Get('get-inventory/:id')
    async getInventoryByUser(@Param('id', ParseIntPipe) id:number): Promise<Product[] | any> {
        return await this.productService.getInventoryByUser(id)
    }

    @Delete('delete-product/:id_product')
    async deleteProduct(@Param('id_product') id_product:number): Promise<any> {
        return this.productService.deleteProduct(id_product);
    }


}
