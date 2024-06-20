import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlayerDataService {
  playerName = '';
  email = '';


  setPlayerData(playerName: string, email: string) {
    this.playerName = playerName;
    this.email = email;
  }

  getPlayerName(): string  {
    return this.playerName;
  }

  getEmail(): string  {
    return this.email;
  }
}