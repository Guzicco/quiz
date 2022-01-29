import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timerPipe',
})
export class TimerPipePipe implements PipeTransform {
  transform(value: number): string {
    let minutes = Math.floor(value / 60);
    let secunds = value % 60;
    let timer = `00${minutes}`.slice(-2) + `:` + `00${secunds}`.slice(-2);

    return timer;
  }
}
