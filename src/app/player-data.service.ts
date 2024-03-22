import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlayerDataService {
  playerName: string | undefined;
  email: string | undefined;


  setPlayerData(playerName: string, email: string) {
    this.playerName = playerName;
    this.email = email;
  }

  getPlayerName(): string | undefined {
    return this.playerName;
  }

  getEmail(): string | undefined {
    return this.email;
  }
}