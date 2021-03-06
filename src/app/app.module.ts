import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerPipePipe } from './pipes/timer-pipe/timer-pipe.pipe';
import { QuizsummaryComponent } from './components/quizsummary/quizsummary.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuizComponent,
    TimerPipePipe,
    QuizsummaryComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
