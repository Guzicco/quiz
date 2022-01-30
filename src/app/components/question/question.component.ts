import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { I18nService, langPack, question } from 'src/app/i18n.service';

function mix(value: string[]) {
  let mixedPool: string[] = [];
  while (value.length) {
    let index = Math.floor(8 * value.length);
    mixedPool = [...mixedPool, ...value.splice(index, 1)];
  }
  return mixedPool;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  languagePack!: langPack;
  questionData!: question;
  mixedAnswers!: string[];
  @Input() questionNumber!: number;
  @Input() isActive!: boolean;

  constructor(
    private quizFormGroup: FormGroupDirective,
    private langService: I18nService
  ) {}

  ngOnInit(): void {
    this.form = this.quizFormGroup.control;
    this.langService.currentData$.subscribe((data) => {
      this.languagePack = data.langPack;
      this.questionData = data.questions[this.questionNumber];
    });
    this.mixedAnswers = [
      this.questionData.correct_answer,
      ...this.questionData.incorrect_answers,
    ];
  }
  ngOnDestroy(): void {
    this.langService.currentData$.subscribe().unsubscribe();
    this.langService.currentLang$.subscribe().unsubscribe();
  }
}
