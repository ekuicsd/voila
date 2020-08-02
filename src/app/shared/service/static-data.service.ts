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
            'Couples',
            'All Types'
        ];
        return groupTypes;
    }

    getTopDestinations() : TopDestination[] {
        return [
            {
                imgUrl: 'https://voila2020.herokuapp.com/profileImages/trending/golden.jpeg',
                place: 'Golden Temple',
                state: 'Punjab',
                city: 'Amritsar',
                description: 'The Golden Temple is also referred to as "Darbar Sahib” or “Harmandar Sahib", and is one of the oldest worship places for the Indian Sikh. It is located in Amritsar, Punjab. 2. The entire top of the temple is made of pure gold, adding to the beauty of the temple'
            },
            {
                imgUrl: 'https://voila2020.herokuapp.com/profileImages/trending/unity.jpeg',
                place: 'Statue of Unity',
                state: 'Gujarat',
                city: 'Surat',
                description: "world's tallest statue with a height of 182 metres (597 ft). It is located on a river facing the Sardar Sarovar Dam on the river Narmada in the Kevadiya colony, 100 kilometres (62 mi) southeast of the city of Vadodara and 150 kilometres (93 mi) from Sura"
            },
            {
                imgUrl: 'https://voila2020.herokuapp.com/profileImages/trending/taj.jpeg',
                place: 'Taj Mahal',
                state: 'Uttar Pradesh',
                city: 'Lucknow',
                description:"The Taj Mahal is a white tomb built in the 16th century by the Mughal emperor, Shah Jahan in memory of his wife, Mumtaz Mahal. The building is in the city of Agra, Uttar Pradesh. Widely thought as one of the most beautiful buildings in the world, it is one of India's biggest tourist attractions."
            },
            {
                imgUrl: 'https://voila2020.herokuapp.com/profileImages/trending/hawa.jpeg',
                place: 'Hawa Mahal',
                state: 'Rajasthan',
                city: 'Jaipur',
                description: "Hawa Mahal (English translation: 'The Palace of Winds' or 'The Palace of Breeze') is a palace in Jaipur, India. Made with the red and pink sandstone, the palace sits on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers."
            }
        ];
    }

    getGradientClassesList() : string[] {
        return [
            'zero',
            'first',
            'second',
            'third',
            'forth',
            'fifth',
            'sixth',
            'seventh',
            'eighth',
            'ninth'
        ];
    }

    getSiteDevelopers() : any[] {
        return [
            {
                name: 'Ekta Garg',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/Ekta.jpeg',
                email: 'happyekta99@gmail.com',
                instagram: 'ektagarg99',
                github: 'ekuicsd'
            },
            {
                name: 'Rajat Sharma',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/rajat.jpg',
                email: 'rajatsharmaatri@gmail.com',
                instagram: 'rajat_sd',
                github: 'RAJATsd'
            },
            {
                name: 'Venu Gopal',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/venu.jpeg',
                email: 'venugopalsinghal@gmail.com',
                instagram: 'venugopalsinghal',
                github: 'venugopalsinghal'
            },
            {
                name: 'Shobit Jain',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/Shobhit.jpeg',
                email: 'jainshobit0@gmail.com',
                instagram: 'sj_2050_',
                github: 'sj1218305'
            },
            {
                name: 'Vidhi Agrawal',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/vidhi.JPG',
                email: 'vidhiagrawal305@gmail.com',
                instagram: 'vidhi_agrawal3',
                github: 'vidhiagrawal3'
            },
            {
                name: 'Archit Jain',
                picUrl: 'https://voilabucket2020.s3.ap-south-1.amazonaws.com/Assets/archit.JPG',
                email: 'architjain808@gmail.com',
                instagram: '_archit.jain_',
                github: 'architjain808'
            },
        ];
    }

    getProfileData() : string[] {
        return [ 
            "Guide",
            "Travel Agent", 
            "Travel Assistant",
            "Travel Manager",
            "Professional Travellers"
        ];
    }
    
}