import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shorttext'
})
export class ShortTextPipe implements PipeTransform {
    transform(value: any) {
        if(value.length > 15) {
        return value.substr(0, 15);
        }
        return value;
    }
    
}
   