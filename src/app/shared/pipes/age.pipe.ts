import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {
    public today = new Date();
    public year;

    constructor() {
        this.year = this.today.getFullYear();
    }

    transform(value: any) {
        let birthYear = new Date(value).getFullYear();
        return this.year - birthYear;
    }
    
}
   