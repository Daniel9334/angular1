import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHistory',
  standalone: true,
})
export class FilterHistoryPipe implements PipeTransform {
  transform(history: any[], action: string): any[] {
    if (!action) return history;
    return history.filter(event => event.action === action);
  }
}
