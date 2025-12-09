import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  swapVerticalOutline,
  chevronForwardOutline,
  carOutline,
  restaurantOutline,
  homeOutline,
  flashOutline
} from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import {
  ConsumptionService,
  ConsumptionCategory,
  ConsumptionActivity
} from '../services/consumption.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner
  ]
})
export class Tab2Page implements OnInit {
  selectedPeriod: 'Year' | 'Month' | 'Week' = 'Year';
  totalConsumption: number = 3.8;
  categories: ConsumptionCategory[] = [];
  recentActivities: ConsumptionActivity[] = [];
  loading: boolean = true;
  animationReady: boolean = false;

  constructor(
    private consumptionService: ConsumptionService,
    private router: Router
  ) {
    addIcons({
      'swap-vertical-outline': swapVerticalOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'car-outline': carOutline,
      'restaurant-outline': restaurantOutline,
      'home-outline': homeOutline,
      'flash-outline': flashOutline
    });
  }

  ngOnInit() {
    this.loadConsumptionData();
  }

  loadConsumptionData() {
    this.loading = true;
    this.animationReady = false;

    this.consumptionService.getConsumptionData(this.selectedPeriod).subscribe({
      next: (data) => {
        this.totalConsumption = data.totalConsumption;
        this.categories = data.categories;
        this.recentActivities = data.recentActivities;
        this.loading = false;

        // Trigger animations after a short delay
        setTimeout(() => {
          this.animationReady = true;
        }, 100);
      },
      error: (err) => {
        console.error('Error loading consumption data:', err);
        this.loading = false;
      }
    });
  }

  togglePeriod() {
    const periods: ('Year' | 'Month' | 'Week')[] = ['Year', 'Month', 'Week'];
    const currentIndex = periods.indexOf(this.selectedPeriod);
    this.selectedPeriod = periods[(currentIndex + 1) % periods.length];
    this.loadConsumptionData();
  }

  onBubbleClick(category: ConsumptionCategory) {
    // Add a scale animation on click
    const bubbleElement = document.querySelector(`.bubble-${category.id}`);
    if (bubbleElement) {
      bubbleElement.classList.add('bubble-clicked');
      setTimeout(() => {
        bubbleElement.classList.remove('bubble-clicked');
      }, 300);
    }

    // Navigate to detail page
    this.router.navigate(['/consumption-detail', category.id]);
  }

  onActivityClick(activity: ConsumptionActivity) {
    // Navigate to detail page for the activity's category
    this.router.navigate(['/consumption-detail', activity.category]);
  }
}
