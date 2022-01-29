import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from './countdown.service';
import { I18nService, langType, languages, quizData } from './i18n.service';

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  ENG = 'END',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [I18nService],
})
export class AppComponent implements OnInit, OnDestroy {
  appState: AppState = AppState.QUIZ;
  APPSTATE = AppState;
  LANGS = languages;
  currentLang!: langType;
  langSubscrition!: Subscription;
  countDownSubscription!: Subscription;
  timer: number = 300;

  constructor(
    private langService: I18nService,
    private countDown: CountdownService
  ) {}

  handleLangChange(lang: langType) {
    this.langService.changeLang(lang);
  }

  ngOnInit(): void {
    this.langSubscrition = this.langService.currentLang$.subscribe(
      (lang) => (this.currentLang = lang)
    );
    this.countDownSubscription = this.countDown
      .getCounter()
      .subscribe(() => this.timer--);
  }
  ngOnDestroy(): void {
    this.langSubscrition.unsubscribe();
    this.countDownSubscription.unsubscribe();
  }
  @HostListener('window:mousemove') refreshTimer() {
    this.timer = 300;
  }
}
