import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/shared/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private apiService: ApiService) {}

    getRole() : string {
        return window.localStorage['role'];
    }

    getAllGuides() : Observable<any> {
        let url = '/admin/Guides';
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            }, error => {
                console.log(error);
            });
        });
    }

}