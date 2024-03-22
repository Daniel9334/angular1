import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';


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
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;

constructor(
  private router: Router,
  private playerData: PlayerDataService
) {}

public startGame() {
  if (this.playerName && this.email) {
    this.playerData.setPlayerData(this.playerName, this.email);
    alert('Udało się zalogować');
    this.router.navigate(['/game']);
  } 
  }
}
