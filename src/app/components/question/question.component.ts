import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { langPack, question } from '../../app.component';

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

  constructor(private quizFormGroup: FormGroupDirective) {}
  mixedAnswers: string[] = [
    ...this.questionData.incorrect_answers,
    ...this.questionData.correct_answer,
  ];

  ngOnInit(): void {
    this.form = this.quizFormGroup.control;
    this.mixedAnswers = mixOrder(
      this.questionData.correct_answer,
      this.questionData.incorrect_answers
    );
    console.log(this.form.value);
  }
}
