import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../servics/games.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../models/games';

enum Gender {
  MALE,
  FEMALE
}

type categoryList = {
  id: number,
  name: string
}

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {
  constructor(private gameService: GamesService, private router: Router, private route: ActivatedRoute) {
  }
  game: Game[] = [] || null;
  publisherCount: number = 0;
  title: string = '';
  genderList: Gender = Gender.FEMALE;

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('gameId');
    this.gameService.getOneGame(gameId).subscribe({
      next: (res: any) => {
        this.game = res;
        this.publisherCount = res.publisher.name === undefined ? 0 : 1;
      },
      error: () => {
        console.log("There is issue loading information, try later!");
      }
    })
    console.log("Game Detail Component", gameId);
  }

  deleteGame(gameId: any) {
    console.log(gameId)
    console.log(this.title);
    this.gameService.deleteGame(gameId);
    this.router.navigate(['/games']);
  }

}
