import { Component } from '@angular/core';
import { GamesService } from '../../servics/games.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Game } from '../models/games';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {


  games: Game[] = [];
  constructor(private gameService: GamesService, private router: Router) {
  }
  ngOnInit(): void {
    this.gameService.getAllGames()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.games = res;
        },
        error: () => {
          console.log("There is issue loading information, try later!");
        }
      });
  }

  moreDetails(gameId: any) {
    this.router.navigate(['/games', gameId]);
  };

  deleteGame(gameId: any) {
    console.log(gameId);
    this.gameService.deleteGame(gameId);
  }
}
