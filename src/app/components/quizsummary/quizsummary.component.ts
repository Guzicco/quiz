import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  I18nService,
  langPack,
  question,
} from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'app-quizsummary',
  templateUrl: './quizsummary.component.html',
  styleUrls: ['./quizsummary.component.scss'],
})
export class QuizsummaryComponent implements OnInit, OnDestroy {
  scoreDescription!: string;
  langSubscription!: Subscription;
  quizData!: question[];
  langData!: langPack;
  @Input() score!: number;

  constructor(private langService: I18nService) {}

  ngOnInit(): void {
    this.langSubscription = this.langService.currentData$.subscribe((data) => {
      this.quizData = data.questions;
      this.langData = data.langPack;
    });
  }

  ngOnDestroy(): void {
    this.langSubscription.unsubscribe();
  }
}
