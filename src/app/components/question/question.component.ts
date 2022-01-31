import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  I18nService,
  langPack,
  question,
} from 'src/app/services/i18n/i18n.service';
import { mix } from '../../utils/mix';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  languagePack!: langPack;
  questionData!: question;
  answers!: string[];
  questionSubscription!: Subscription;

  @Input() answersOrder!: Set<number>;
  @Input() questionNumber!: number;
  @Input() isActive!: boolean;

  constructor(
    private quizFormGroup: FormGroupDirective,
    private langService: I18nService
  ) {}

  ngOnInit(): void {
    this.form = this.quizFormGroup.control;
    this.questionSubscription = this.langService.currentData$.subscribe(
      (data) => {
        this.languagePack = data.langPack;
        this.questionData = data.questions[this.questionNumber];
      }
    );
    this.answers = [
      this.questionData.correct_answer,
      ...this.questionData.incorrect_answers,
    ];
    this.answers = mix(this.answers, Array.from(this.answersOrder));
  }

  ngOnDestroy(): void {
    this.questionSubscription.unsubscribe();
  }
}
