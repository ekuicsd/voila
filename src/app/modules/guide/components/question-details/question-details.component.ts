import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  public questionDetails: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  // createForm() {
  //   this.questionDetails = new FormGroup({
      
  //   })
  // }

}
