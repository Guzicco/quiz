import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormGroupName,
} from '@angular/forms';
import { langPack, question } from '../../app.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  form!: FormGroup;
  @Input() questionData: question = {
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  };
  @Input() questionNumber: number = 0;
  @Input() isActive: boolean = false;
  @Input() languagePack: langPack = { finish: '', question: '' };

  mixedAnswers: string[] = [
    ...this.questionData.incorrect_answers,
    ...this.questionData.correct_answer,
  ];

  constructor(private quizFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.quizFormGroup.control;
    // this.form.addControl(`Question-${this.questionNumber}`, new FormControl());

    this.mixedAnswers = mixOrder(
      this.questionData.correct_answer,
      this.questionData.incorrect_answers
    );
    // console.log(this.form);
  }
}

const mixOrder: (
  correct_answer: string,
  incorrect_answers: string[]
) => string[] = (correct_answer, incorrect_answers) => {
  let pool: string[] = [...incorrect_answers, correct_answer];
  let mixedPool: string[] = [];
  while (pool.length) {
    let index = Math.floor(Math.random() * pool.length);
    mixedPool = [...mixedPool, ...pool.splice(index, 1)];
  }
  return mixedPool;
};
