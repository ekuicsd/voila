import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    constructor() {
    }

    transform(value: any[], searchValue: string) {
        if(!value) return [];
        if(searchValue === '') return value;

        searchValue = searchValue.toLowerCase();

        return value.filter( ele => {
            return ele.toLowerCase().includes(searchValue);
        })
        
    }
    
}
   