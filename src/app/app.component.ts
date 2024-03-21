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
  imports: [CommonModule, NgxRaceModule, FormsModule, GameComponent, IntroComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}


