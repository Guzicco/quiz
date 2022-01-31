import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from './services/countdown/countdown.service';
import { I18nService, langType, languages } from './services/i18n/i18n.service';
import {
  AppState,
  AppstateService,
} from './services/appstate/appstate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [],
})
export class AppComponent implements OnInit, OnDestroy {
  appState: AppState;
  APPSTATE = AppState;
  LANGS = languages;
  currentLang!: langType;
  timer!: number;
  stateSubscription!: Subscription;
  langSubscrition!: Subscription;
  countDownSubscription!: Subscription;

  constructor(
    private langService: I18nService,
    private countDown: CountdownService,
    private stateService: AppstateService
  ) {
    this.appState = AppState.HOME;
    this.timer = 0;
  }

  ngOnInit(): void {
    this.stateSubscription = this.stateService.currentAppState$.subscribe(
      (state) => (this.appState = state)
    );
    this.langSubscrition = this.langService.currentLang$.subscribe(
      (lang) => (this.currentLang = lang)
    );
  }
  ngOnDestroy(): void {
    this.langSubscrition.unsubscribe();
    this.countDownSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  handleLangChange(lang: langType) {
    this.langService.changeLang(lang);
  }
  onHomeButtonClick() {
    if (this.appState !== this.APPSTATE.HOME) {
      if (confirm('Finish Quiz?')) {
        this.appState = this.APPSTATE.HOME;
        this.timer = 0;
        this.countDown.stopTimer();
        this.countDownSubscription.unsubscribe();
      }
    }
  }
  onStartClick() {
    this.stateService.changeAppState(AppState.QUIZ);
    this.countDown.startTimer();
    this.countDownSubscription = this.countDown.currentTimer$.subscribe(
      (timer) => (this.timer = timer)
    );
  }

  @HostListener('window:mousemove') refreshTimer() {
    if (this.appState !== AppState.QUIZ) {
      this.timer = 0;
      this.countDown.stopTimer();
    } else {
      this.countDown.refreshTimer();
    }
  }
}
