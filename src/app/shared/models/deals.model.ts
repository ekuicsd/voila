import { Guide } from './guide.model';
import { Tousists } from './tourists.model';

export class Deals {
    places : string[];
    price : number;
    guideId : Guide;
    favourites : Tousists[]
}