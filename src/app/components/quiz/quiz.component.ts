import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { question, quizData } from 'src/app/app.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  @Input()
  quizData: quizData = {
    langPack: { question: '', finish: '' },
    questions: [],
  };
  currentQuestionNumber: number = 0;
  currentQuestion: question = {
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  };

  formQuiz!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formQuiz = this.fb.group({
      pickedAnswers: [this.fb.array([]), Validators.required],
    });
    this.answerForms.value.push(1);
  }

  get answerForms() {
    return this.formQuiz.get('pickedAnswers') as FormArray;
  }

  onSubmitQuiz() {
    // console.log(this.formQuiz.value);
  }

  handleNavigationClick: (toDo: string) => void = (toDo) => {
    if (toDo === '+') {
      this.currentQuestionNumber = this.currentQuestionNumber + 1;
    }
    if (toDo === '-') {
      this.currentQuestionNumber = this.currentQuestionNumber - 1;
    }
  };
  handleQuestionNumberClick: (event: MouseEvent, index: number) => void = (
    event,
    index
  ) => {
    event.preventDefault();
    this.currentQuestionNumber = index;
  };
}
