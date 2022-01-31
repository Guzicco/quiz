import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  AppState,
  AppstateService,
} from 'src/app/services/appstate/appstate.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { I18nService, quizData } from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  formQuiz!: FormGroup;
  quizData!: quizData;
  appState!: AppState;
  APPSTATE = AppState;
  langSubscription!: Subscription;
  stateSubscription!: Subscription;
  randomOrderSets: Set<number>[] = new Array(10);
  currentQuestionNumber: number = 0;

  constructor(
    private fb: FormBuilder,
    private langService: I18nService,
    private stateService: AppstateService,
    private countdownService: CountdownService
  ) {}

  ngOnInit() {
    this.stateSubscription = this.stateService.currentAppState$.subscribe(
      (state) => (this.appState = state)
    );
    this.langSubscription = this.langService.currentData$.subscribe(
      (data) => (this.quizData = data)
    );
    this.formQuiz = this.fb.group({
      pickedAnswers: this.fb.array([]),
    });
    this.populateOrderSet();
    this.setForm('question');
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
    this.stateSubscription.unsubscribe();
  }

  get answerForms() {
    return this.formQuiz.get('pickedAnswers') as FormArray;
  }
  setForm(controlName: string) {
    for (let len = 0; len < this.quizData.questions.length; len++) {
      this.answerForms.push(
        new FormGroup(
          { [controlName + len]: new FormControl() },
          Validators.required
        )
      );
    }
  }
  populateOrderSet() {
    for (let i = 0; i < this.quizData.questions.length; i++) {
      let newSet = new Set<number>();
      while (newSet.size < 4) {
        newSet.add(Math.floor(Math.random() * 4));
      }
      this.randomOrderSets.push(newSet);
      this.randomOrderSets.shift();
    }
  }

  calcScore() {
    const score = 0;
    return score;
  }

  onSubmitQuiz() {
    this.countdownService.stopTimer();
    this.stateService.changeAppState(AppState.SUMMARY);
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
  handleSummaryClick() {}
}
