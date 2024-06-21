import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { provideHttpClient } from '@angular/common/http';
import { PlayerDataGuard } from './player-data-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {path: 'intro', component:IntroComponent },
      {path: 'game', component: GameComponent, canActivate: [PlayerDataGuard]},
      {path: 'game/:colors', component: GameComponent, canActivate: [PlayerDataGuard]},
      {path: '**', redirectTo: 'intro'},
    ]),
    provideHttpClient()
  ]
};
