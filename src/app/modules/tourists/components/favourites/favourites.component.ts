import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';
import { Deals } from 'src/app/shared/models/deals.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public favouritesList: Deals[];

  constructor(private touristService: TouristsService) { }

  ngOnInit() {
    this.getAllFavouritesList();
  }

  getAllFavouritesList() {
    this.touristService.getAllFavorites().subscribe( res => {
      console.log(res);
      this.favouritesList = res;
    });
  }

}
