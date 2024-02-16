import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  @Output() public isStartGame = new EventEmitter<{playerName: string, email: string}>();

  title = 'race';  
  playerName: string | undefined;
  email: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;

  startGame() {
    if (this.playerName && this.email) {
      this.isStartGame.emit({ playerName: this.playerName, email: this.email })
    } else {
      alert('Proszę wypełnić wszystkie pola formularza!');
    }
  }
}


