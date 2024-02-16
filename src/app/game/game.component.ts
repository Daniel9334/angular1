import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() playerName: string | undefined

  title = 'race';  
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
