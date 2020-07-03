import { Component, OnInit } from '@angular/core';
// For MDB Angular Free
import { TooltipModule, ButtonsModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getStateData(state) {
    alert(state);
  }

}
