import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { FilterHistoryPipe } from '../filter-history.pipe';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { RouterLink } from '@angular/router';


interface GameEvent {
  timestamp: Date;
  action: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxRaceModule, FormsModule, CommonModule, FilterHistoryPipe, KeyboardShortcutsModule, RouterLink],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  @Output() public isexitGame = new EventEmitter<boolean>();
  @Input() playerName: string | undefined
  @ViewChild(NgxRaceComponent)
  private _race!: NgxRaceComponent;

  title = 'race';  
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;
  timer: any;

  filterAction: string = '';
  gameHistory: GameEvent[] = [];

  public onStartOnButtonPressed() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.timer = setInterval(() => {
        this.timePlayed++;
      }, 1000);
      this._race.actionStart();
      this.recordEvent('Start');
    }
  }
  public onStopOnButtonPressed() {
    this.gameStarted = false;
    clearInterval(this.timer);
    this._race.actionStop();
    this.recordEvent('Stop');
  }
  public onResetOnButtonPressed() {
    this.gameStarted = false;
    this.timePlayed = 0;
    this.points = 0;
    clearInterval(this.timer);
    this._race.actionReset();
    this.recordEvent('Reset');
    this.gameHistory = [];
  }

  public onLeftOnButtonPressed() {
    this._race.actionLeft()
    this.recordEvent('Left');
  }
  public onRightButtonPressed() {
    this._race.actionRight()
    this.recordEvent('Right');
  }
  public onTurboOnButtonPressed() {
    this._race.actionTurboOn()
    this.recordEvent('Turbo ON');
  }
  public onTurboOffButtonPressed() {
    this._race.actionTurboOff()
    this.recordEvent('Turbo OFF');
  }
  public sortByNewest() {
    this.gameHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
  public sortByOldest() {
    this.gameHistory.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
  public onGameOver() {
    alert('Game over');
  }
  public shortcuts = [
    {
        key: 'up',
        preventDefault: true,
        command: (e: any) => this._race.actionTurboOn()
    },
    {
        key: 'left',
        preventDefault: true,
        command: (e: any) => this._race.actionLeft()
    },
    {
        key: 'right',
        preventDefault: true,
        command: (e: any) => this._race.actionRight()
    },
    {
        key: 'down',
        preventDefault: true,
        command: (e: any) => this._race.actionTurboOff()
    },
]

  exitGame() {
    this.gameStarted = false;
    this.playerName = '';
    this.email = '';
    this.isexitGame.emit(false);
    clearInterval(this.timer);
    this.recordEvent('Exit');
  }

  grantPoints() {
    this.points += 1;
    this.recordEvent('Overtaking');
  }
  
  recordEvent(action: string) {
    this.gameHistory.push({
      timestamp: new Date(),
      action: action
    });
    if (this.gameHistory.length > 15) {
      this.gameHistory.shift(); 
    }
  }
}

