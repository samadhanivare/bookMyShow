import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {
  // receive the value from other components
  // attribute
  @Input() count = 0

  stars = []

  constructor() {}

  ngOnInit() {
    // add the number of stars based on the value of count
    for (let index = 0; index < this.count; index++) {
      this.stars.push(index)
    }
  }
}
