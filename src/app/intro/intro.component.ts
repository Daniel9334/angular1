import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
 

 public constructor(private _router: Router) {
    if (this.playerName && this.email) {
      this._router.navigate(['/intro']);
    } 
  }

  public startGame() {
      alert('Udało się zalogować')
      this._router.navigate(['/game']); 
    } 
  }


