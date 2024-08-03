import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GamesDataService } from '../services/games-data.service';
import { Game } from '../model/games';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})

export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private _gamesService: GamesDataService, private _router: Router) {

  }

  ngOnInit(): void {
    this._gamesService.getGames().subscribe((games) => {
      this.games = games;
    })
  }

  // goToGame(gameId: string) {
  //   console.log(gameId);
  //   this._router.navigate(["/game", gameId]);
  //   this._router.navigate(["game/" + gameId]);
  // }
}
