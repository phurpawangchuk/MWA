import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesDataService } from '../services/games-data.service';
import { CommonModule } from '@angular/common';
import { Reviews } from '../model/games';
import { SuccessPageComponent } from '../success-page/success-page.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, SuccessPageComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsComponent implements OnInit {

  constructor(
    private _route: Router,
    private _avtiveRoute: ActivatedRoute,
    private _gameService: GamesDataService) { }

  reviews: Reviews[] = [];
  gameId!: string;

  deleteClick: boolean = false;

  ngOnInit(): void {
    this.gameId = this._avtiveRoute.snapshot.params["gameId"];

    this._gameService.getReviews(this.gameId).subscribe(reviews => {
      console.log(reviews)
      this.reviews = reviews;
    })
  }

  delete(reviewid: string) {
    this._gameService.deleteReviews(this.gameId, reviewid).subscribe(game => {
      alert("Deleted")
      this.deleteClick = true;
      this.reviews = this.reviews.filter((review => review._id !== reviewid));
    })
  }

}
