export interface Tourists {
    _id?: string;
    name?: string;
    gender?: string;
    dob?: string;
    phoneNumber?: number;
    email?: string;
    picUrl?: string;
    nationality?: string;
    password?: string;
    interests?: Interests[];
    languages?: string[];
    statusCurrent?: boolean;
    // tokens?: string[];
}


export enum Interests {
    GAMES = 'GAMES',
    BARS = 'BARS',
    RELIGIOUSPLACE = 'RELIGIOUSPLACE',
    FOODY = 'FOODY',
    MOVIES = 'MOVIES',
    MUSEUM = 'MUSEUM',
    SHOPPING = 'SHOPPING',
    MONUMENTS = 'MONUMENTS',
    ADVENTURES = 'ADVENTURES',
    NATIONALPARKS = 'NATIONALPARKS',
    ARTGALLERY = 'ARTGALLERY',
    SHOOTINGPLACES = 'SHOOTINGPLACES'
}