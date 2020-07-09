import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncatetext'
})
export class TruncateTextPipe implements PipeTransform {
    transform(value: any) {
        if(value.length > 140) {
        return value.substr(0, 140) + '...';
        }
        return value;
    }
    
}
   