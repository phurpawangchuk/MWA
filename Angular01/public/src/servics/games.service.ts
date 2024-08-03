import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../app/models/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  BASE_API = 'http://localhost:3000/games';
  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.BASE_API);
  }

  getOneGame(gameId: any): Observable<Game> {
    return this.httpClient.get<Game>(this.BASE_API + '/' + gameId);
  }

  deleteGame(gameId: Object): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_API + '/' + gameId);
  }
}
