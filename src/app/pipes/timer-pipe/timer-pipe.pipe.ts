import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerPipe',
})
export class TimerPipePipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) return '00:00';
    const minutes = Math.floor(value / 60);
    const secunds = value % 60;
    const timer = `00${minutes}`.slice(-2) + `:` + `00${secunds}`.slice(-2);

    return timer;
  }
}
