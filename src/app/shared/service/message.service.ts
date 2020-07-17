import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private apiService: ApiService) { }

    sendMessage(senderId, receiverId, receiverName, message, senderRole) : Observable<any> {
        console.log(senderId, receiverId, receiverName, message);
        let url = '/' + senderRole +'/chat-messages/' + senderId + '/' + receiverId;
        return new Observable<any>( obs => {
            this.apiService.post(url, {
                receiverId,
                receiverName,
                message,
                senderRole
            }).subscribe( res => {
                obs.next(res);
            });
        });
    }

    getAllMessage(role, senderId, receiverId) : Observable<any> {
        let url = '/' + role + '/chat-messages/' + senderId + '/' + receiverId;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            })
        })
    }

    // markMessages(sender, receiver) : Observable<any> {
    //     let url = '/receiver-messages/' + sender + '/' + receiver;
    //     return new Observable<any>(obs => {
    //         this.apiService.get(url).subscribe( res => {
    //             obs.next(res);
    //         })
    //     })
    // }

    getGuideMessageList(guideId) : Observable<any> {
        let url = '/guide/messages/' + guideId;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            });
        });
    }

    getTouristMessageList(touristId) : Observable<any> {
        let url = '/tourist/messages/' + touristId;
        return new Observable<any>(obs => {
            this.apiService.get(url).subscribe( res => {
                obs.next(res);
            });
        });
    }
   
    
}