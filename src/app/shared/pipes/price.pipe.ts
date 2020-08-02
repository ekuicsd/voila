import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'price'
})
export class PricePipe implements PipeTransform {
    constructor() {
    }

    transform(value: number) {
        return value.toFixed(2);
    }
    
}
   