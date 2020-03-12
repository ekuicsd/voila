import { Guide } from './guide.model';
import { Tousists } from './tourists.model';

export class Booking {
    guideId: Guide;
    touristId: Tousists;
    bookingDate : Date;
    price: number;
    noOfPeople: number;
    startDate : Date;
    endDate : Date;
    groupType : string;
    rating : number;
    review : string;
    reviewDate : Date;
    status : BookingStatus;
}

export enum BookingStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    ONGOING = 'ONGOING'
}

export enum GroupType {
    FAMILY = 'FAMILY',
    COUPLES = 'COUPLES',
    FRIENDS = 'FRIENDS'
}