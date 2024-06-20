import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxRaceComponent, NgxRaceModule } from 'ngx-race';
import { FilterHistoryPipe } from '../filter-history.pipe';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { Router, RouterLink } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { ScoreService } from '../score.service';
import { MyscoreComponent } from '../myscore/myscore.component';
import { TopScoresPipe } from "../top-scores.pipe";


interface GameEvent {
  timestamp: Date;
  action: string;
}

interface Highscore {
  name: string;
  score: number;
}


@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
    imports: [MyscoreComponent, NgxRaceModule, FormsModule, CommonModule, FilterHistoryPipe, KeyboardShortcutsModule, RouterLink, TopScoresPipe]
})

export class GameComponent {
  @Output() public isexitGame = new EventEmitter<boolean>();  // MOZNA USUNAC ALE PRZEZ SERVICE PRZEKAZAC
  @Input() playerName: string
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
  highscores: Highscore[] = [];
  loadingError: string | undefined;
  sortOrder: string = 'desc';

  constructor(
    private playerData: PlayerDataService,
    private router: Router,
    private scoreService: ScoreService, 
  ) {
    this.playerName = this.playerData.getPlayerName();
    this.email = this.playerData.getEmail();
    
    if (!this.playerName || !this.email) {
      alert('Wprowadź imię i adres e-mail');
      this.router.navigate(['/intro']);
  }
    this.loadHighscores();
    this.updateScoresList();
  };

  loadHighscores() {
    this.scoreService.load().subscribe((data: any) => {
      this.highscores = data
    },
    (error) => {
      console.error('Błąd podczas pobierania danych:', error);
      this.loadingError = 'Wystąpił błąd podczas pobierania wyników.';
    });
  };
    
  // sortByScoreAsc() {
  //     this.highscores.sort((a, b) => a.score - b.score)
  //   };
  
  // sortByScoreDesc() {
  //     this.highscores.sort((a, b) => b.score - a.score)
  //   };

    public onSubmitScore() {
      // console.log(this.playerName!, this.points)
      const scoreData = {
        playerName: this.playerName!,  // DODAC IF WCZESNIEJ LUB  playerName: this.playerName!, TO NIE JEST NULL
        score: this.points
      };
      this.scoreService.submitScore(scoreData)
    
      
    }
     private updateScoresList() {
      setInterval(() => {
        this.loadHighscores(); 
      }, 30000); 
    }
  

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
    alert('Game over, score send on server');
    // this.onSubmitScore();  //TU ODKOMENTOWAC WTEDY WYSLE SERWER 
    clearInterval(this.timer);
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
    this.email = '';
    this.isexitGame.emit(false);
    clearInterval(this.timer);
    this.recordEvent('Exit');
    this.playerName = '';
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

