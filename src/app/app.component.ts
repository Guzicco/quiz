import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  subscription!: Subscription;

  constructor(private langService: I18nService) {}

  handleLangChange(lang: langType) {
    this.langService.changeLang(lang);
  }

  ngOnInit(): void {
    this.subscription = this.langService.currentLang$.subscribe(
      (lang) => (this.currentLang = lang)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
