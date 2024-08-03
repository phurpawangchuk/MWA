import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, Publisher, Reviews } from '../model/games';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  constructor(private _httpCLient: HttpClient) { }

  private _baseUrl = "http://localhost:3000/api";

  getGames(): Observable<Game[]> {
    return this._httpCLient.get<Game[]>(this._baseUrl + '/games');
  }

  getGame(gameId: string): Observable<Game> {
    return this._httpCLient.get<Game>(this._baseUrl + '/games/' + gameId);
  }

  editGame(gameId: string, data: Game): Observable<Game> {
    return this._httpCLient.patch<Game>(this._baseUrl + '/games/' + gameId, data);
  }

  deleteGame(gameId: string): Observable<Game> {
    return this._httpCLient.delete<Game>(this._baseUrl + '/games/' + gameId);
  }

  getPublisher(gameId: string): Observable<Publisher[]> {
    return this._httpCLient.get<Publisher[]>(this._baseUrl + '/games/' + gameId + '/publishers');
  }

  getReviews(gameId: string): Observable<Reviews[]> {
    return this._httpCLient.get<Reviews[]>(this._baseUrl + '/games/' + gameId + '/reviews');
  }

  deleteReviews(gameId: string, reviewId: string): Observable<Reviews[]> {
    console.log("Delete invoked" + gameId + "/reviews/" + reviewId)
    return this._httpCLient.delete<Reviews[]>(this._baseUrl + '/games/' + gameId + '/reviews/' + reviewId);
  }

  addReviews(gameId: string, data: Reviews): Observable<any> {
    console.log("Add review invoked" + gameId + "/reviews/" + data)
    return this._httpCLient.post<any>(this._baseUrl + '/games/' + gameId + '/reviews', data);
  }
}
