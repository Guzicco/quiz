import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { I18nService, quizData } from 'src/app/i18n.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  formQuiz!: FormGroup;
  quizData!: quizData;
  currentQuestionNumber: number = 0;

  constructor(private fb: FormBuilder, private langService: I18nService) {}

  ngOnInit() {
    this.langService.currentData$.subscribe((data) => (this.quizData = data));
    this.formQuiz = this.fb.group({
      pickedAnswers: this.fb.array([]),
    });
    const choice = this.fb.group({
      picked: '',
    });
    this.setForm('question');
  }

  ngOnDestroy(): void {
    this.langService.currentData$.subscribe().unsubscribe();
  }

  get answerForms() {
    return this.formQuiz.get('pickedAnswers') as FormArray;
  }
  setForm(controlName: string) {
    for (let len = 0; len < this.quizData.questions.length; len++) {
      this.answerForms.push(
        new FormGroup({ [controlName + len]: new FormControl() })
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
