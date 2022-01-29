import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  getCounter() {
    return timer(0, 1000);
  }
}
