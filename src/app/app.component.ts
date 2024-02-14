import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRaceModule } from 'ngx-race';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRaceModule, FormsModule, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'race';  
  playerName: string | undefined;
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;

  startGame() {
    if (this.playerName && this.email) {
      this.gameStarted = true;
    } else {
      alert('Proszę wypełnić wszystkie pola formularza!');
    }
  }

exitGame (event:boolean) {
    this.gameStarted = event
}

}
