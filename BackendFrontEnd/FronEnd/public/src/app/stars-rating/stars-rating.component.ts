import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stars-rating.component.html',
  styleUrl: './stars-rating.component.css'
})
export class StarsRatingComponent {

  stars: number[] = [];
  otherStars: number[] = [];

  @Input()
  set rating(rating: number) {
    this.stars = new Array<number>(rating);
    if (rating < 5) {
      this.otherStars = new Array<number>(5 - rating);
    }
  }

}
