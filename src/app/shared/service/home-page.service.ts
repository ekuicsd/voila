import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private apiService: ApiService) {}

    getMapInfo() : Observable<any> {
        let url = '/allDestinationInfo';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            })
        });
    }

    getHotDeals() : Observable<any> {
        let url = '/randomDeals';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            })
        });
    }

    
}