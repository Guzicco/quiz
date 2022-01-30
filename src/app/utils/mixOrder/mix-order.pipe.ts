import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mixOrder',
})
export class MixOrderPipe implements PipeTransform {
  transform(value: string[], ...args: unknown[]): string[] {
    function mix(value: string[]) {
      let mixedPool: string[] = [];
      let random = Math.random();
      while (value.length) {
        let index = Math.floor(random * value.length);
        mixedPool = [...mixedPool, ...value.splice(index, 1)];
      }
      return mixedPool;
    }
    return mix(value);
  }
}
