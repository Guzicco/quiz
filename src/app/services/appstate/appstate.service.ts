import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  SUMMARY = 'SUMMARY',
}

@Injectable({
  providedIn: 'root',
})
export class AppstateService {
  private appState: AppState = AppState.HOME;

  private _currentAppStateSource = new BehaviorSubject<AppState>(AppState.HOME);
  currentAppState$ = this._currentAppStateSource.asObservable();

  changeAppState(state: AppState) {
    this._currentAppStateSource.next(state);
  }
}
