import { Interests } from './tourists.model';

export class Guide {
    name: string;
    gender : string;
    password : string;
    dob : Date;
    phoneNumber : number;
    email : string;
    address : string;
    experience : string[];
    picUrl: string;
    aadhaarNumber : number;
    interests : Interests[];
    languages : string;
    city: string;
    state : string;
    statusCurrent: CurrentStatus;
}

export enum CurrentStatus {
    PENDING ='PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED'
}