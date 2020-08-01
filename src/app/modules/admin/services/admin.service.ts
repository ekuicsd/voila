import { Injectable } from "@angular/core";
import { ApiService } from 'src/app/shared/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    public selectedGuide;

    constructor(private apiService: ApiService) {}

    getRole() : string {
        return window.localStorage['role'];
    }

    getAllGuides(status) : Observable<any> {
        let url = '/admin/Guides/' + status;
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            }, error => {
            });
        });
    }

    approvedrejectGuide(guideId, status) : Observable<any> {
        let url = '/admin/decision/' + guideId + '/' + status;
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            }, error => {
            });
        });
    }
}