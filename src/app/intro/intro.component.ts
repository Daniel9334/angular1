import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerDataService } from '../player-data.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  title = 'race';
  playerName: string | undefined;
  token: string | undefined;
  gameStarted: boolean = false;
  points: number = 0;
  timePlayed: number = 0;
  selectedColorPalette: string = 'normal'; 
  introForm!: FormGroup;

  constructor(
    private router: Router,
    private playerData: PlayerDataService,
    private http: HttpClient,
    private fb: FormBuilder
  )  { }
  ngOnInit() {
    this.introForm = this.fb.group({
      playerName: [this.playerData.getPlayerName() || '', [Validators.required, Validators.minLength(5)]],
      token: ['', [Validators.required, Validators.minLength(4)]],
      colorPalette: ['normal']
    });

    this.introForm.get('colorPalette')?.valueChanges.subscribe((value) => {
      this.selectedColorPalette = value;
      this.updateColorScheme();
    });

    this.updateColorScheme();
  }
  startGame() {
    if (this.introForm.valid) {
      const { playerName, token, colorPalette } = this.introForm.value;
      this.playerData.setPlayerData(playerName, token); 
      this.validateToken(token);
    }
  }
   private validateToken(token: string) {
    this.http.post('https://scores.chrum.it/check-token', { 'auth-token': token }).subscribe(
      (response: any) => {
        if (response && response.success === true) {
          alert('Udało się zalogować');
          this.router.navigate(['/game', this.selectedColorPalette]); 
        } else {
          alert('Nieprawidłowy token autoryzacyjny');
        }
      },
      (error: any) => {
        console.error('Błąd weryfikacji tokenu:', error);
        alert('Wystąpił błąd podczas weryfikacji tokenu');
      }
    );
  }
  private updateColorScheme() {
    const body = document.body;
    if (this.selectedColorPalette === 'high-contrast') {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }
}


