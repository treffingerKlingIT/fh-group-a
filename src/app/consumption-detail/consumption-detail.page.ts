import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  chevronBackOutline,
  chevronForwardOutline,
  swapVerticalOutline,
  trendingUpOutline,
  restaurantOutline,
  carOutline,
  homeOutline as homeIconOutline,
  flashOutline,
  fastFoodOutline,
  cafeOutline
} from 'ionicons/icons';
import { ConsumptionService, ConsumptionDetail, ConsumptionActivity } from '../services/consumption.service';

interface ChartPoint {
  month: string;
  value: number;
}

interface ActivityGroup {
  month: string;
  activities: ConsumptionActivity[];
}

@Component({
  selector: 'app-consumption-detail',
  templateUrl: './consumption-detail.page.html',
  styleUrls: ['./consumption-detail.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonSpinner
  ]
})
export class ConsumptionDetailPage implements OnInit {
  categoryId: string = '';
  detail: ConsumptionDetail | null = null;
  loading: boolean = true;

  // Chart data
  months: string[] = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  chartData: ChartPoint[] = [];
  chartPoints: string = '';

  // Grouped activities
  groupedActivities: ActivityGroup[] = [];

  constructor(
    private route: ActivatedRoute,
    private consumptionService: ConsumptionService
  ) {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'chevron-back-outline': chevronBackOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'swap-vertical-outline': swapVerticalOutline,
      'trending-up-outline': trendingUpOutline,
      'restaurant-outline': restaurantOutline,
      'car-outline': carOutline,
      'home-outline': homeIconOutline,
      'flash-outline': flashOutline,
      'fast-food-outline': fastFoodOutline,
      'cafe-outline': cafeOutline
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategoryDetail();
  }

  loadCategoryDetail() {
    this.loading = true;
    this.consumptionService.getCategoryDetail(this.categoryId).subscribe({
      next: (data) => {
        this.detail = data;
        this.generateChartData();
        this.groupActivitiesByMonth();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading category detail:', err);
        this.loading = false;
      }
    });
  }

  generateChartData() {
    // Generate sample chart data based on total value
    const baseValue = this.detail?.totalValue || 17.4;
    const variation = baseValue * 0.15;

    this.chartData = this.months.map((month, index) => {
      // Create varied data points
      const randomVariation = (Math.random() - 0.5) * variation;
      let value = baseValue + randomVariation;

      // Normalize to 0-100 range for chart display
      const normalizedValue = Math.max(20, Math.min(80, (value / (baseValue * 1.3)) * 100));

      return {
        month,
        value: normalizedValue
      };
    });

    // Generate SVG points string for polyline
    this.chartPoints = this.chartData
      .map((point, i) => `${20 + i * 50},${100 - point.value}`)
      .join(' ');
  }

  groupActivitiesByMonth() {
    if (!this.detail?.activities) {
      this.groupedActivities = [];
      return;
    }

    const groups = new Map<string, ConsumptionActivity[]>();

    this.detail.activities.forEach(activity => {
      const monthYear = this.getMonthYear(activity.date);
      if (!groups.has(monthYear)) {
        groups.set(monthYear, []);
      }
      groups.get(monthYear)?.push(activity);
    });

    this.groupedActivities = Array.from(groups.entries()).map(([month, activities]) => ({
      month,
      activities
    }));
  }

  getMonthYear(date: Date): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const d = new Date(date);
    return months[d.getMonth()];
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  isLastGroup(group: ActivityGroup): boolean {
    return this.groupedActivities.indexOf(group) === this.groupedActivities.length - 1;
  }
}
