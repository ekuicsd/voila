import { Guide } from './guide.model';
import { Tousists } from './tourists.model';
import { Places } from './places.model';

export interface Deals {
    _id?: string;
    places?: Places[];
    price?: number;
    guideId?: Guide;
    // daysOfGuiding?:number;
    favourites?: Tousists[];
    startDate?: Date;
    endDate?: Date;
    city?: string;
    state?: string;
    peopleLimit?: number; // added
}