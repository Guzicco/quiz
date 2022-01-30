import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerPipePipe } from './utils/timer-pipe.pipe';
import { MixOrderPipe } from './utils/mixOrder/mix-order.pipe';

@NgModule({
  declarations: [AppComponent, QuestionComponent, QuizComponent, TimerPipePipe, MixOrderPipe],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
