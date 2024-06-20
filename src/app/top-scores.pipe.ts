import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topScores',
  standalone: true
})
export class TopScoresPipe implements PipeTransform {

  transform(highscores: any[], order: string = 'desc', limit: number = 10): any[] {
    if (!highscores || highscores.length === 0) return [];

    let sortedScores = highscores.sort((a, b) => {
      if (order === 'asc') {
        return a.score - b.score;
      } else {
        return b.score - a.score;
      }
    });

    return sortedScores.slice(0, limit);
  }

}


