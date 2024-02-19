import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRaceModule } from 'ngx-race';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRaceModule, FormsModule, GameComponent, IntroComponent],
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

startGame(event: {playerName: string, email: string}) { 
    this.playerName = event.playerName;
    this.email = event.email;
    this.gameStarted = true; 
}

exitGame (event:boolean) {
    this.gameStarted = event
}

}


