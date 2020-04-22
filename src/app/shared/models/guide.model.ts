import { Interests } from './tourists.model';

export interface Guide {
    _id?: string;
    name?: string;
    gender?: string;
    password?: string;
    dob?: Date;
    phoneNumber?: number;
    email?: string;
    address?: string;
    experience?: Experience[];
    peopleLimit?: number;
    perHeadCharge?: number;
    perDayCharge?: number;
    picUrl?: string;
    aadhaarNumber?: number;
    interests?: Interests[];
    languages?: string[];
    city?: string;
    state?: string;
    // tokens?: string[];
    occupied?: boolean;
    statusCurrent: CurrentStatus;
}

export interface Experience {
    work?: string;
    startYear?: number;
    duration?: number;
    profile?: string;
}

export enum CurrentStatus {
    PENDING ='PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED'
}