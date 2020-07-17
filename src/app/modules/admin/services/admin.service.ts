import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor() {}

    getUser() : string {
        return 'admin';
    }
}