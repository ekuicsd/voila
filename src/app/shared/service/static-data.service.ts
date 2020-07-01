import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {

    constructor() {}

    getAllInterestList() : string[] {
        const interests = [
            'Shopping',
            'Sports',
            'Nature',
            'Religious Places',
            'Food',
            'Bars',
            'Movies',
            'History',
            'Culture',
            'Adventures',
            'National Parks',
            'Art'
        ];
        return interests;
    }

    getAllGroupTypes(): string[] {
        const groupTypes = [
            'Family',
            'Friends',
            'Couples'
        ];
        return groupTypes;
    }
    
}