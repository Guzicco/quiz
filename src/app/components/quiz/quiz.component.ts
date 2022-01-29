import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { question, quizData } from 'src/app/app.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  formQuiz!: FormGroup;
  @Input()
  quizData: quizData = {
    langPack: { question: '', finish: '' },
    questions: [],
  };
  currentQuestionNumber: number = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formQuiz = this.fb.group({
      pickedAnswers: this.fb.array([]),
    });

    const choice = this.fb.group({
      picked: '',
    });

    this.setForm('question');
  }

  get answerForms() {
    return this.formQuiz.get('pickedAnswers') as FormArray;
  }
  setForm(controlName: string) {
    for (let len = 0; len < this.quizData.questions.length; len++) {
      this.answerForms.push(
        new FormGroup({ [controlName + len]: new FormControl('') })
      );
    }
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
