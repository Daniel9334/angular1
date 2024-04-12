import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  title = 'race';
  playerName: string | undefined;
  token: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;

  constructor(
    private router: Router,
    private playerData: PlayerDataService,
    private http: HttpClient
  ) { }

  public startGame() {
    if (this.playerName && this.token) {
      this.playerData.setPlayerData(this.playerName, this.token);
      this.validateToken(this.token);
    }
  }
   private validateToken(token: string) {
    this.http.post('https://scores.chrum.it/check-token', { 'auth-token': token }).subscribe(
      (response: any) => {
        if (response && response.success === true) {
          alert('Udało się zalogować');
          this.router.navigate(['/game']);
        } else {
          alert('Nieprawidłowy token autoryzacyjny');
        }
      },
      (error: any) => {
        console.error('Błąd weryfikacji tokenu:', error);
        alert('Wystąpił błąd podczas weryfikacji tokenu');
      }
    );
  }
}