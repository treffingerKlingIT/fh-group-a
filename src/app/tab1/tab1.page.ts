import { Component, ViewChild } from '@angular/core';
import { IonContent, IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonToolbar, IonList, IonListHeader, IonItem, IonChip, IonText } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { LogNewModalComponent, CategoryType } from '../log-new-modal/log-new-modal.component';
import { HousingModalComponent } from '../housing-modal/housing-modal.component';
import { addIcons } from 'ionicons';
import {
  settingsOutline,
  shareOutline,
  businessOutline,
  restaurantOutline,
  flashOutline,
  carOutline,
  addOutline,
  leafOutline
} from 'ionicons/icons';

type ViewMode = 'day' | 'week' | 'month';

interface DayData {
  name: string;
  warehouse: number;
  food: number;
  energy: number;
  transport: number;
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  hasActivity: boolean;
  isToday?: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonContent, IonButton, IonIcon, IonSegment, IonSegmentButton, IonLabel, IonHeader, IonToolbar, IonList, IonListHeader, IonItem, IonChip, IonText, CommonModule, LogNewModalComponent, HousingModalComponent],
})
export class Tab1Page {
  @ViewChild('housingModal') housingModal!: HousingModalComponent;

  activeView: ViewMode = 'day';
  showHeaderShadow = false;

  weekData: DayData[] = [
    { name: 'Mon', warehouse: 94, food: 54, energy: 42, transport: 44 },
    { name: 'Tue', warehouse: 70, food: 38, energy: 32, transport: 76 },
    { name: 'Wed', warehouse: 110, food: 15, energy: 15, transport: 35 },
    { name: 'Thu', warehouse: 48, food: 27, energy: 22, transport: 21 },
    { name: 'Fri', warehouse: 26, food: 16, energy: 58, transport: 33 },
    { name: 'Sat', warehouse: 82, food: 22, energy: 18, transport: 29 },
    { name: 'Sun', warehouse: 94, food: 15, energy: 31, transport: 31 }
  ];

  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  calendarDays: CalendarDay[] = [
    // Current month days (1-31) - Days 1-5 have activity
    { day: 1, isCurrentMonth: true, hasActivity: true, isToday: false },
    { day: 2, isCurrentMonth: true, hasActivity: true, isToday: false },
    { day: 3, isCurrentMonth: true, hasActivity: true, isToday: false },
    { day: 4, isCurrentMonth: true, hasActivity: true, isToday: false },
    { day: 5, isCurrentMonth: true, hasActivity: true, isToday: false },
    { day: 6, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 7, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 8, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 9, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 10, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 11, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 12, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 13, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 14, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 15, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 16, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 17, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 18, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 19, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 20, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 21, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 22, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 23, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 24, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 25, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 26, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 27, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 28, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 29, isCurrentMonth: true, hasActivity: false, isToday: false },
    { day: 30, isCurrentMonth: true, hasActivity: false, isToday: false },
    // Next month days
    { day: 1, isCurrentMonth: false, hasActivity: false, isToday: false },
    { day: 2, isCurrentMonth: false, hasActivity: false, isToday: false },
    { day: 3, isCurrentMonth: false, hasActivity: false, isToday: false },
    { day: 4, isCurrentMonth: false, hasActivity: false, isToday: false },
    { day: 5, isCurrentMonth: false, hasActivity: false, isToday: false },
  ];

  constructor() {
    // Register icons
    addIcons({
      'settings-outline': settingsOutline,
      'share-outline': shareOutline,
      'business-outline': businessOutline,
      'restaurant-outline': restaurantOutline,
      'flash-outline': flashOutline,
      'car-outline': carOutline,
      'add-outline': addOutline,
      'leaf-outline': leafOutline,
    });
  }

  setView(view: ViewMode) {
    this.activeView = view;
  }

  onSegmentChange(event: any) {
    this.activeView = event.detail.value as ViewMode;
  }

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.showHeaderShadow = scrollTop > 0;

    // Update header shadow
    const header = document.querySelector('ion-header');
    if (header) {
      if (this.showHeaderShadow) {
        header.classList.add('header-shadow');
      } else {
        header.classList.remove('header-shadow');
      }
    }
  }

  getBarHeight(value: number, maxHeight: number = 275): number {
    const maxValue = 250; // Maximum value in the data
    return (value / maxValue) * maxHeight;
  }

  getBarPosition(day: DayData, category: 'warehouse' | 'food' | 'energy' | 'transport'): number {
    const categories = ['transport', 'energy', 'food', 'warehouse'];
    const index = categories.indexOf(category);

    // Calculate total height of all segments
    const totalHeight = categories.reduce((sum, cat) => {
      return sum + this.getBarHeight(day[cat as keyof DayData] as number);
    }, 0);

    // Empty space at the top
    const emptySpace = 275 - totalHeight;

    // Position from top = empty space + sum of previous segments
    let position = emptySpace;
    for (let i = 0; i < index; i++) {
      position += this.getBarHeight(day[categories[i] as keyof DayData] as number);
    }

    return position;
  }

  logNew() {
    console.log('Log new entry clicked');
    // TODO: Implement log new functionality
  }

  onCategorySelected(category: CategoryType) {
    console.log('Category selected:', category);
    // Open the appropriate category modal
    if (category === 'housing') {
      this.housingModal.modal.present();
    }
    // TODO: Handle other categories (food, electricity, mobility)
  }
}