import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import io from  'socket.io-client';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
@Injectable({
    providedIn: 'root'
})
export class TouristsService {
    public socket = io(environment.baseUrl);

    constructor(private apiService: ApiService,
        private userService: UserService,
         private toastr: ToastrService) {
        if(this.userService.isAuthenticated && this.userService.getUser('tourist')) {
            this.socket.emit('initial_connect', { userType: 'TOURISTS', _id: JSON.parse(this.userService.getUser('tourist'))._id});
        }
        this.socket.on('new_notification_tourist', (data) => {
            this.toastr.info(data);
        });
    }

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

    cancelrequest(id, status: string, request) : Observable<any>  {
        let url = '/tourist/editBooking/' + id + '/' + status;
        return new Observable<any>(obs => {
            this.apiService.put(url, request).subscribe(res => {
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
                obs.next(res.body);
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

    removeFromFavourite(id) : Observable<any> {
        let url = '/tourist/deals/removeFav/' + id;
        return new Observable<any>( obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            });
        });
    }

    BookingDeal(id, body) : Observable<any> {
        let url = '/tourist/guides/deals/' + id;
        return new Observable<any>( obs => {
            this.apiService.post(url, body).subscribe(res => {
                obs.next(res.body);
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