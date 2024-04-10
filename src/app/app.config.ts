import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {path: 'intro', component:IntroComponent },
      {path: 'game', component:GameComponent },
      {path: '**', redirectTo: 'intro'},
    ]),
    provideHttpClient()
  ]
};
