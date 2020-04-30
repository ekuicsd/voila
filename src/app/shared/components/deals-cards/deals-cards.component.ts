import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-deals-cards',
  templateUrl: './deals-cards.component.html',
  styleUrls: ['./deals-cards.component.scss']
})
export class DealsCardsComponent implements OnInit {

  @Input() dealsList : any[];

  constructor() { }

  ngOnInit() {
  }

}
