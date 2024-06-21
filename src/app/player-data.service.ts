import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerDataService {
  private playerNameKey = '';
  private emailKey = '';

  setPlayerData(playerName: string, email: string) {
    localStorage.setItem(this.playerNameKey, playerName);
    localStorage.setItem(this.emailKey, email);
  }

  getPlayerName(): string {
    return localStorage.getItem(this.playerNameKey) || '';
  }

  getEmail(): string {
    return localStorage.getItem(this.emailKey) || '';
  }

  clearPlayerData() {
    localStorage.removeItem(this.playerNameKey);
    localStorage.removeItem(this.emailKey);
  }

  hasPlayerData(): boolean {
    return this.getPlayerName() !== '' && this.getEmail() !== '';
  }
}
