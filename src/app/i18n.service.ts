import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import ENGLangPack from '../assets/quizDataENG.json';
import PLLangPack from '../assets/quizDataPL.json';

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

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private currentLang!: langType;
  private quizData!: quizData;

  private _currentLangSource = new BehaviorSubject<langType>('ENG');
  private _currentDataSource = new BehaviorSubject<quizData>(ENGLangPack);
  currentLang$ = this._currentLangSource.asObservable();
  currentData$ = this._currentDataSource.asObservable();
  constructor() {}

  changeLang(lang: langType) {
    this.setLangPack(lang);
    this._currentLangSource.next(lang);
    this._currentDataSource.next(this.quizData);
  }

  setLangPack = (lang: langType) => {
    this.currentLang = lang;
    switch (lang) {
      case 'ENG':
        this.quizData = ENGLangPack;
        break;
      case 'PL':
        this.quizData = PLLangPack;
        break;
    }
  };
}
