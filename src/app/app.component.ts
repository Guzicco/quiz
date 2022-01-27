import { Component, OnChanges, SimpleChanges } from '@angular/core';
import quizDataALL from '../assets/quizData.json';

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  ENG = 'END',
}
export type question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type langPack = {
  finish: string;
  question: string;
};
export type quizData = {
  langPack: langPack;
  questions: question[];
};
export const languages = ['PL', 'ENG'] as const;
export type langType = typeof languages[number];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Quiz';
  appState: AppState = AppState.QUIZ;
  APPSTATE = AppState;
  selectedLang: langType = 'ENG';
  LANGS = languages;
  quizData: quizData = quizDataALL.ENG;

  handleLangChange = (lang: langType) => {
    this.selectedLang = lang;
    switch (lang) {
      case 'ENG':
        this.quizData = quizDataALL.ENG;
        break;
      case 'PL':
        this.quizData = quizDataALL.PL;
        break;
    }
  };
}
