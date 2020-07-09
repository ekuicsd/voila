import { Injectable } from "@angular/core";
import { TopDestination } from '../models/topDestinations.model';

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

    getTopDestinations() : TopDestination[] {
        return [
            {
                imgUrl: '',
                place: 'Golden Temple',
                state: 'Punjab',
                city: 'Amritsar',
                description: 'The Golden Temple is also referred to as "Darbar Sahib” or “Harmandar Sahib", and is one of the oldest worship places for the Indian Sikh. It is located in Amritsar, Punjab. 2. The entire top of the temple is made of pure gold, adding to the beauty of the temple'
            },
            {
                imgUrl: '',
                place: 'Statue of Unity',
                state: 'Gujarat',
                city: 'Surat',
                description: "world's tallest statue with a height of 182 metres (597 ft). It is located on a river facing the Sardar Sarovar Dam on the river Narmada in the Kevadiya colony, 100 kilometres (62 mi) southeast of the city of Vadodara and 150 kilometres (93 mi) from Sura"
            },
            {
                imgUrl: '',
                place: 'Taj Mahal',
                state: 'Uttar Pradesh',
                city: 'Lucknow',
                description:"The Taj Mahal is a white tomb built in the 16th century by the Mughal emperor, Shah Jahan in memory of his wife, Mumtaz Mahal. The building is in the city of Agra, Uttar Pradesh. Widely thought as one of the most beautiful buildings in the world, it is one of India's biggest tourist attractions."
            },
            {
                imgUrl: '',
                place: 'Hawa Mahal',
                state: 'Rajasthan',
                city: 'Jaipur',
                description: "Hawa Mahal (English translation: 'The Palace of Winds' or 'The Palace of Breeze') is a palace in Jaipur, India. Made with the red and pink sandstone, the palace sits on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers."
            }
        ];
    }
    
}