import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  counter: number = 300;
  interval!: any;
  private _currentTimerSource!: BehaviorSubject<number>;
  currentTimer$!: Observable<number>;

  startTimer() {
    this._currentTimerSource = new BehaviorSubject<number>(this.counter);
    this.currentTimer$ = this._currentTimerSource.asObservable();
    this.interval = setInterval(() => {
      this._currentTimerSource.next(--this.counter);
      if (this.counter === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  refreshTimer() {
    this.counter = 300;
  }

  stopTimer() {
    this.counter = 300;
    clearInterval(this.interval);
  }

  constructor() {}
}
