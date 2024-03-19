import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxRaceModule } from 'ngx-race';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { IntroComponent } from './intro/intro.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxRaceModule, FormsModule, GameComponent, IntroComponent,RouterOutlet],
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

public state: 'intro' | 'game' = 'intro';

public startGame(event: {playerName: string, email: string}) { 
    this.state = 'game';
    this.playerName = event.playerName;
    this.email = event.email;
    this.gameStarted = true; 
}

public exitGame (event:boolean) {
    this.state = 'intro';
    this.gameStarted = event
  
}

}


