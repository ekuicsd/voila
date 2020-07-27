import { Component, OnInit } from '@angular/core';
import { TouristsService } from 'src/app/shared/service/tourists.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  public favouritesList: any[] = [];

  constructor(private touristService: TouristsService) { }

  ngOnInit() {
    this.getAllFavouritesList();
  }

  getAllFavouritesList() {
    this.touristService.getAllFavorites().subscribe( res => {
      if(res.length > 0) {
        this.favouritesList = res;
      } else {
        this.favouritesList = undefined;
      }
    });
  }

}
