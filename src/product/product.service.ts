import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {

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

    getTimePeriodType():string[] {
        return ['diario', 'semanal', 'mensual']
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



