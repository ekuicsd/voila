import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class GuideService{

    public socket = io(environment.baseUrl);

    constructor(private apiService: ApiService, private toastr: ToastrService) {
        this.socket.on('new_notification_guide', (data) => {
            this.toastr.info(data);
        });
    }

    guideSignup(body) : Observable<any> {
        let url = '/signup/guide';
        return new Observable<any>( obs => {
            this.apiService.postWithMedia(url, body).subscribe( res => {
                obs.next(res);
            });
        });
    }

    getAllBookingsByStatus(status: string) : Observable<any> {
        let url = '/guide/offers/' + status;
        // let url = '/guide/offers';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res.bookings);
            });
        });
    }

    reponseToTouristRequest(bookingId: any, status: string) : Observable<any> {
        let url = '/guide/booking/response/' + bookingId + '/' + status;
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            });
        });
    }

    createDeal(body) : Observable<any> {
        let url = '/guide/deals/add';
        return new Observable<any>( obs => {
            this.apiService.post(url, body).subscribe( res => {
                obs.next(res.body);
            });
        });
    }

    getAllDeals() : Observable<any> {
        let url = '/guide/deals';
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res.deals);
            });
        });
    }

    updateUserDetails(body) : Observable<any> {
        let url = '/guide/profile/update/GUIDE';
        return new Observable<any>( obs => {
            this.apiService.putWithMedia(url, body).subscribe( res => {
                obs.next(res);
            });
        });
    }

    changePwd(newPassword) : Observable<any> {
        let url = '/guide/profile/changePassword';
        return new Observable<any>( obs=> {
            this.apiService.put(url, {"newPassword": newPassword}).subscribe( res => {
                obs.next(res);
            })
        });
    }

    createGroupChatRoom(guideId, dealId, groupName) {
        let url = '/createRoom/' + guideId + '/' + dealId;
        return new Observable<any>( obs=> {
            this.apiService.post(url, {"name": groupName}).subscribe( res => {
                obs.next(res);
            });
        });  
    }
}