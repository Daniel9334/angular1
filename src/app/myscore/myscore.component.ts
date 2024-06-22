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

  
loadMyScores() {
  const playerName = this.playerData.getPlayerName();
  console.log('Player Name:', playerName);
  this.scoreService.load().subscribe(
    (data: any) => {
      console.log('All Scores:', data);  
      if (data && Array.isArray(data)) {
        this.myScores = data.filter((score: any) => {
          console.log('Checking score:', score);  
          return score.name === playerName;
        });
        console.log('Filtered Scores:', this.myScores);  
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


