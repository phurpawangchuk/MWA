import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../services/games-data.service';
import { Publisher } from '../model/games';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publishers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publishers.component.html',
  styleUrl: './publishers.component.css'
})

export class PublishersComponent implements OnInit {

  publisher: Publisher[] = [];
  constructor(private _activeRouer: ActivatedRoute, private _gameService: GamesDataService) { }

  ngOnInit(): void {
    let gameId = this._activeRouer.snapshot.params["gameId"]
    this._gameService.getPublisher(gameId).subscribe(publisher => {
      this.publisher = publisher;
    })
  }


}
