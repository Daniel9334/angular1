import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';

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
  @ViewChild(NgxRaceComponent)
  private _race!: NgxRaceComponent;

  public onStartOnButtonPressed() {
    this.gameStarted = true;
    this.timer = setInterval(() => {
      this.timePlayed++;
    }, 1000);
    this._race.actionStart();
  }
  public onStopOnButtonPressed() {
    this.gameStarted = false;
    clearInterval(this.timer);
    this._race.actionStop();
  }
  public onResetOnButtonPressed() {
    this.gameStarted = false;
    this.timePlayed = 0;
    this.points = 0;
    clearInterval(this.timer);
    this._race.actionReset();
  }
  title = 'race';  
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;
  timer: any;

  exitGame() {
    this.gameStarted = false;
    this.playerName = '';
    this.email = '';
    this.isexitGame.emit(false);
    clearInterval(this.timer);
  }

  grantPoints() {
    this.points += 1;
  }
  
}

