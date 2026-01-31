import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  filterOutline,
  locationOutline
} from 'ionicons/icons';
import { TipsService, Tip, TipCategory } from '../services/tips.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonIcon
  ],
})
export class Tab3Page implements OnInit, AfterViewInit {
  @ViewChildren('categoryTab') categoryTabs!: QueryList<ElementRef>;

  tips: Tip[] = [];
  filteredTips: Tip[] = [];
  loading = false;
  selectedCategory: TipCategory = 'all';

  // Indicator position
  indicatorLeft = 0;
  indicatorWidth = 20;

  categories: { id: TipCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'housing', label: 'Housing' },
    { id: 'mobility', label: 'Mobility' },
    { id: 'electricity', label: 'Electricity' },
    { id: 'food', label: 'Food' }
  ];

  constructor(
    private tipsService: TipsService,
    private router: Router
  ) {
    addIcons({
      'filter-outline': filterOutline,
      'location-outline': locationOutline
    });
  }

  ngOnInit() {
    this.loadTips();
  }

  ngAfterViewInit() {
    // Set initial indicator position after view loads
    setTimeout(() => this.updateIndicator(), 100);
  }

  loadTips() {
    this.loading = true;
    this.tipsService.getTips().subscribe({
      next: (tips) => {
        this.tips = tips;
        this.filterTips();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading tips:', err);
        this.loading = false;
      }
    });
  }

  selectCategory(category: TipCategory, event?: Event) {
    this.selectedCategory = category;
    this.filterTips();

    if (event) {
      const target = event.target as HTMLElement;
      this.updateIndicatorFromElement(target);
    }
  }

  updateIndicator() {
    const index = this.categories.findIndex(c => c.id === this.selectedCategory);
    if (this.categoryTabs && this.categoryTabs.length > index) {
      const tabElement = this.categoryTabs.toArray()[index]?.nativeElement;
      if (tabElement) {
        this.updateIndicatorFromElement(tabElement);
      }
    }
  }

  updateIndicatorFromElement(element: HTMLElement) {
    const parent = element.parentElement;
    if (parent) {
      this.indicatorLeft = element.offsetLeft;
      this.indicatorWidth = element.offsetWidth;
    }
  }

  filterTips() {
    if (this.selectedCategory === 'all') {
      this.filteredTips = this.tips;
    } else {
      this.filteredTips = this.tips.filter(tip => tip.category === this.selectedCategory);
    }
  }

  onTipClick(tip: Tip) {
    this.router.navigate(['/tip-detail', tip.id]);
  }

  getTypeLabel(type: string): string {
    return type.toUpperCase();
  }
}
