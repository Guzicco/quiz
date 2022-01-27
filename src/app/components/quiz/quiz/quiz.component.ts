import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { question, quizData } from 'src/app/app.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  @Input()
  quizData: quizData = { langPack: {}, questions: [] };
  currentQuestionNumber: number = 0;
  currentQuestion: question = {
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  };

  handleClick: (toDo: string) => void = (toDo) => {
    if (toDo === '+') {
      this.currentQuestionNumber = this.currentQuestionNumber + 1;
    }
    if (toDo === '-') {
      this.currentQuestionNumber = this.currentQuestionNumber - 1;
    }
    console.log(this.currentQuestionNumber);
  };

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
