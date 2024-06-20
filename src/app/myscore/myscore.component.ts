import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { PlayerDataService } from '../player-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myscore',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './myscore.component.html',
  styleUrl: './myscore.component.scss'
})
export class MyscoreComponent implements OnInit{
  myScores: any[] = [];

  constructor(
    private scoreService: ScoreService,
    private playerData: PlayerDataService
  ) { this.loadMyScores();}

  ngOnInit(): void {
    this.loadMyScores();
  }


  
//   loadMyScores() {
//     const playerName = this.playerData.getPlayerName();
//     console.log('player name: ', playerName);
//     this.scoreService.load().subscribe(
//       (data: any) => {
//         console.log('All Scores:', data);  
//         this.myScores = data.filter((score: any) => score.playerName === playerName);
//         console.log('filtr Scores:', this.myScores);  
//       },
//       (error) => {
//         console.error('Error loading scores:', error);
//       }
//     );
//   }
// }


loadMyScores() {
  const playerName = this.playerData.getPlayerName();
  console.log('Player Name:', playerName);
  this.scoreService.load().subscribe(
    (data: any) => {
      console.log('All Scores:', data);  // Dodane logowanie
      // Upewnijmy się, że struktura danych jest poprawna
      if (data && Array.isArray(data)) {
        this.myScores = data.filter((score: any) => {
          console.log('Checking score:', score);  // Logowanie każdego wpisu
          return score.playerName === playerName;
        });
        console.log('Filtered Scores:', this.myScores);  // Dodane logowanie
      } else {
        console.error('Data format is incorrect:', data);
      }
    },
    (error) => {
      console.error('Error loading scores:', error);
    }
  );
}
}

