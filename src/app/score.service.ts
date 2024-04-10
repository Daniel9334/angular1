import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
    constructor(private _http: HttpClient) { }
  
    
    public load() {
      const URL = 'https://scores.chrum.it/scores/race'
      return this._http.get(URL, {
        headers: {Accept: 'application/json'},
      });
}};
