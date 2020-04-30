import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {

    constructor() {}

    getAllInterestList() : string[] {
        const interests = [
            'Games',
            'Bars',
            'Religious Places',
            'Foody',
            'Movies',
            'Museum',
            'Shopping',
            'Monumnets',
            'Adventures',
            'National Parks',
            'Art Galllery',
            'Shooting Places'
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