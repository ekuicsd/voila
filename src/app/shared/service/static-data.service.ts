import { Injectable } from "@angular/core";
import { TopDestination } from '../models/topDestinations.model';

@Injectable({
    providedIn: 'root'
})
export class StaticDataService {

    public currencyList: any[] = [];
    public currency;

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

    getCurrencyData() : any[] {
        this.currencyList =  [
            {name: 'INR',
            value: 1.0
            },
            {name: 'CAD',
            value: 0.0179363799
            },
            {name: 'HKD',
            value: 0.1035984453
            },
            {name: 'ISK',
            value: 1.8051457937
            },
            {name: 'PHP',
            value: 0.6557643382
            },
            {name: 'DKK',
            value: 0.0839866645
            },
            {name: 'HUF',
            value: 3.8917815097
            },
            {name: 'CZK',
            value: 0.2953105697
            },
            {name: 'GBP',
            value: 0.0101599246
            },
            {name: 'RON',
            value: 0.0545097619
            },
            {name: 'SEK',
            value: 0.1160201048
            },
            {name: 'IDR',
            value: 195.9034472644
            },
            {name: 'BRL',
            value: 0.0690682627
            },
            {name: 'RUB',
            value: 0.9893327166
            },
            {name: 'HRK',
            value: 0.0844074891
            },
            {name: 'JPY',
            value: 1.4024854601
            },
            {name: 'THB',
            value: 0.4168532924
            },
            {name: 'CHF',
            value: 0.0121497594
            },
            {name: 'EUR',
            value: 0.0112821612
            },
            {name: 'MYR',
            value: 0.0566702958
            },
            {name: 'BGN',
            value: 0.0220656509
            },
            {name: 'TRY',
            value: 0.0931850105
            },
            {name: 'CNY',
            value: 0.0932323956
            },
            {name: 'NOK',
            value: 0.1210835388
            },
            {name: 'NZD',
            value: 0.0200495287
            },
            {name: 'ZAR',
            value: 0.2267263117
            },
            {name: 'USD',
            value: 0.0133671046
            },
            {name: 'MXN',
            value: 0.2964726323
            },
            {name: 'SGD',
            value: 0.0183278709
            },
            {name: 'AUD',
            value: 0.0186020274
            },
            {name: 'ILS',
            value: 0.0454806483
            },
            {name: 'KRW',
            value: 15.9028831563
            },
            {name: 'PLN',
            value: 0.0496798687
            }
          ];
          this.currency = this.currencyList[0];
          return this.currencyList;
    }
    
}