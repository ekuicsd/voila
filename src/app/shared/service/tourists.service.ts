import { Injectable } from "@angular/core";
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TouristsService {

    constructor(private userService: UserService, private apiService: ApiService) {}

    touristsSignup(body) : Observable<any> {
        let url = '/signup/tourist';
        return new Observable<any>( obs => {
            this.apiService.post(url, body).subscribe( res => {
                obs.next(res.body);
            });
        });
    }

    getAllBookingsByStatus(status: string) : Observable<any> {
        let url = '/tourist/bookings/' + status;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res.bookings);
            })
        });
    }

    cancelrequest(id, status: string) : Observable<any>  {
        let url = '/tourist/editBooking/' + id + '/' + status;
        // let url = '/tourist/editBooking/:bookingId/:change';
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe(res => {
                obs.next(res);
            })
        });
    }

    updateUserDetails(body) : Observable<any> {
        let url = '/tourist/profile/update/TOURIST';
        return new Observable<any>( obs => {
            this.apiService.put(url, body).subscribe( res => {
                obs.next(res);
            })
        });
    }

    changePwd(newPassword) : Observable<any> {
        let url = '/tourist/profile/changePassword';
        return new Observable<any>( obs=> {
            this.apiService.put(url, {"newPassword": newPassword}).subscribe( res => {
                obs.next(res);
            })
        })
    }

    getAllFavorites() : Observable<any> {
        let url = '/tourist/favoriteDeals';
        return new Observable<any>( obs=> {
            this.apiService.get(url).subscribe( res => {
                obs.next(res.deals);
            })
        });
    }

    bookForPersonalTour(id, body) : Observable<any> {
        let url = '/tourist/guides/offer/' + id; 
        return new Observable<any>( obs => {
            this.apiService.post(url, body).subscribe( res => {
                obs.next(res);
            });
        })
    }

    addToFavourite(id) : Observable<any> {
        let url = '/tourist/deals/fav/' + id;
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            })
        })
    }

    BookingDeal(id, body) : Observable<any> {
        let url = '/tourist/guides/deals/' + id;
        return new Observable<any>( obs => {
            this.apiService.post(url, body).subscribe(res => {
                obs.next(res);
            })
        })
    }

    updateInterestAndLang(request) : Observable<any> {
        let url = '/tourist/updateInterestAndLang';
        return new Observable<any>( obs => {
            this.apiService.post(url, request).subscribe(res => {
                obs.next(res.body);
            })
        })
    }

}