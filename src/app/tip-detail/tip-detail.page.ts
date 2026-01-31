import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline } from 'ionicons/icons';
import { TipsService, TipDetail } from '../services/tips.service';

@Component({
  selector: 'app-tip-detail',
  templateUrl: 'tip-detail.page.html',
  styleUrls: ['tip-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonIcon
  ],
})
export class TipDetailPage implements OnInit {
  tipId: string = '';
  tip: TipDetail | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private tipsService: TipsService
  ) {
    addIcons({
      'location-outline': locationOutline
    });
  }

  ngOnInit() {
    this.tipId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTipDetail();
  }

  loadTipDetail() {
    this.loading = true;
    this.tipsService.getTipById(this.tipId).subscribe({
      next: (tip) => {
        this.tip = tip;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tip:', err);
        this.loading = false;
      }
    });
  }

  getCategoryLabel(): string {
    return this.tip?.category?.toUpperCase() || '';
  }
}
