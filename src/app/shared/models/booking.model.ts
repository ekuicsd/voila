import { Guide } from './guide.model';
import { Tourists } from './tourists.model';

export interface Booking {
    _id?: string;
    guideId?: Guide;
    touristId?: Tourists;
    bookingDate?: Date;
    price?: number;
    noOfPeople?: number;
    startDate?: Date;
    endDate?: Date;
    groupType?: string;
    rating?: number;
    review?: string;
    reviewDate?: Date;
    status?: string;
    places?: string[];
    tourType?: string;
    duration?: number;
}

export enum BookingStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    ONGOING = 'ONGOING',
    CANCEL = 'CANCEL'
}

export enum GroupType {
    FAMILY = 'FAMILY',
    COUPLES = 'COUPLES',
    FRIENDS = 'FRIENDS'
}