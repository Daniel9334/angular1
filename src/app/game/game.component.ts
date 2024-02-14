import { Component, EventEmitter, Output } from '@angular/core';
import { NgxRaceModule } from 'ngx-race';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxRaceModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  @Output() public isexitGame = new EventEmitter<boolean>();

  title = 'race';  
  playerName: string | undefined;
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;
  
  exitGame() {
    this.gameStarted = false;
    this.playerName = '';
    this.email = '';
    this.isexitGame.emit(false);
  }

  grantPoints() {
    this.points += 1;
  }


}
