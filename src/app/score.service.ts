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
}
  public submitScore(scoreData: { playerName: string, score: number }) {
  const URL = 'https://scores.chrum.it/scores';
  const requestbody = {
    name: scoreData.playerName,
    game: 'race',
    score: scoreData.score
  }
  // debugger;
  return this._http.post(URL, requestbody, {
    headers: {
      'auth-token': '1234',
      'Content-Type': 'application/json'
    }
}).subscribe(
  () => {
    console.log('Score submitted successfully');
  },
  (error) => {
    console.error('Error submitting score:', error);
  })

}

};
