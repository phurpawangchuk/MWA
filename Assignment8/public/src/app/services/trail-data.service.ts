import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubTrail, Trails } from '../model/Trail';

@Injectable({
  providedIn: 'root'
})
export class TrailDataService {

  constructor(private _httpClient: HttpClient) { }

  private _baseUrl = 'http://localhost:3000/api';

  getAllTrails(): Observable<Trails[]> {
    return this._httpClient.get<Trails[]>(this._baseUrl);
  }

  getOneTrail(id: string): Observable<SubTrail[]> {
    return this._httpClient.get<SubTrail[]>(this._baseUrl + '/' + id);
  }

  deleteTrail(id: string, subId: string): Observable<any[]> {
    return this._httpClient.delete<any[]>(this._baseUrl + '/' + id + '/trails/' + subId);
  }

  getSubDocumentTrail(id: string, subId: string): Observable<any[]> {
    return this._httpClient.get<any[]>(this._baseUrl + '/' + id + '/trails/' + subId);
  }

  addTrail(id: string, data: SubTrail): Observable<any> {
    return this._httpClient.post(this._baseUrl + '/' + id + '/trails', data);
  }

  editTrail(id: string, subId: string, data: SubTrail): Observable<any> {
    return this._httpClient.put(this._baseUrl + '/' + id + '/trails/' + subId, data);
  }
}
