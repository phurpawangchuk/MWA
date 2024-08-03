import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../model/games';
import { GamesDataService } from '../services/games-data.service';
import { CommonModule } from '@angular/common';
import { StarsRatingComponent } from '../stars-rating/stars-rating.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, StarsRatingComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  game!: Game;

  constructor(
    private _router: ActivatedRoute,
    private _gameService: GamesDataService) {
  }

  ngOnInit(): void {
    let gameId = this._router.snapshot.params["gameId"];

    this._gameService.getGame(gameId).subscribe((game) => {
      this.game = game;
    });
  }

  editGame(id: string) {
    this._gameService.getGame
  }
  deleteGame(id: string) {

  }



}
