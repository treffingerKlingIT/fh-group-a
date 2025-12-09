import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ConsumptionCategory {
  id: string;
  name: string;
  value: number;
  color: string;
  icon: string;
  size: number;
  position: { x: number; y: number };
}

export interface ConsumptionActivity {
  id: string;
  name: string;
  value: number;
  icon: string;
  date: Date;
  description?: string;
  category: string;
}

export interface ConsumptionDetail {
  category: string;
  totalValue: number;
  breakdown: {
    label: string;
    value: number;
    percentage: number;
  }[];
  activities: ConsumptionActivity[];
  tips: string[];
}

export interface ConsumptionData {
  period: 'Year' | 'Month' | 'Week';
  totalConsumption: number;
  categories: ConsumptionCategory[];
  recentActivities: ConsumptionActivity[];
}

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {
  private mockData: ConsumptionData = {
    period: 'Year',
    totalConsumption: 3.8,
    categories: [
      {
        id: 'food',
        name: 'Food',
        value: 0.82,
        color: '#a8ccc4',
        icon: 'restaurant-outline',
        size: 84,
        position: { x: 8.33, y: 179 }
      },
      {
        id: 'mobility',
        name: 'Mobility',
        value: 0.6,
        color: '#b8b8b8',
        icon: 'car-outline',
        size: 77,
        position: { x: 8.33, y: 290 }
      },
      {
        id: 'electricity',
        name: 'Electricity',
        value: 0.82,
        color: '#c8d9c4',
        icon: 'flash-outline',
        size: 77,
        position: { x: 75, y: 194 }
      },
      {
        id: 'housing',
        name: 'Housing',
        value: 0.94,
        color: '#7a907a',
        icon: 'home-outline',
        size: 125,
        position: { x: 58.33, y: 250 }
      }
    ],
    recentActivities: [
      {
        id: '1',
        name: 'Food',
        value: 0.82,
        icon: 'restaurant-outline',
        date: new Date(),
        category: 'food',
        description: 'Grocery shopping and dining'
      },
      {
        id: '2',
        name: 'Mobility',
        value: 0.9,
        icon: 'car-outline',
        date: new Date(),
        category: 'mobility',
        description: 'Car trips and public transport'
      },
      {
        id: '3',
        name: 'Housing',
        value: 0.62,
        icon: 'home-outline',
        date: new Date(),
        category: 'housing',
        description: 'Home heating and maintenance'
      },
      {
        id: '4',
        name: 'Electricity',
        value: 0.32,
        icon: 'flash-outline',
        date: new Date(),
        category: 'electricity',
        description: 'Home electricity usage'
      }
    ]
  };

  constructor() {}

  /**
   * Get consumption data for a specific period
   * In production, this would call your backend API
   */
  getConsumptionData(period: 'Year' | 'Month' | 'Week'): Observable<ConsumptionData> {
    // Simulate API call with delay
    const data = { ...this.mockData, period };

    // Adjust values based on period
    if (period === 'Month') {
      data.totalConsumption = 0.32;
      data.categories = data.categories.map(cat => ({
        ...cat,
        value: +(cat.value / 12).toFixed(2)
      }));
    } else if (period === 'Week') {
      data.totalConsumption = 0.08;
      data.categories = data.categories.map(cat => ({
        ...cat,
        value: +(cat.value / 52).toFixed(2)
      }));
    }

    return of(data).pipe(delay(300));
  }

  /**
   * Get detailed breakdown for a specific category
   */
  getCategoryDetail(categoryId: string): Observable<ConsumptionDetail> {
    const category = this.mockData.categories.find(c => c.id === categoryId);

    const details: { [key: string]: ConsumptionDetail } = {
      food: {
        category: 'Food',
        totalValue: 17.4,
        breakdown: [
          { label: 'Meat & Dairy', value: 0.45, percentage: 54.9 },
          { label: 'Fruits & Vegetables', value: 0.15, percentage: 18.3 },
          { label: 'Processed Foods', value: 0.12, percentage: 14.6 },
          { label: 'Dining Out', value: 0.10, percentage: 12.2 }
        ],
        activities: [
          {
            id: 'f1',
            name: 'Cooking Session',
            value: 0.25,
            icon: 'restaurant-outline',
            date: new Date(2025, 5, 3), // June 3, 2025
            category: 'food',
            description: 'Home cooking session'
          },
          {
            id: 'f2',
            name: 'Dinner',
            value: 0.18,
            icon: 'fast-food-outline',
            date: new Date(2025, 5, 2), // June 2, 2025
            category: 'food',
            description: 'Evening meal'
          },
          {
            id: 'f3',
            name: 'Milkshake',
            value: 0.12,
            icon: 'cafe-outline',
            date: new Date(2025, 5, 2), // June 2, 2025
            category: 'food',
            description: 'Afternoon snack'
          },
          {
            id: 'f4',
            name: 'Cooking Session',
            value: 0.22,
            icon: 'restaurant-outline',
            date: new Date(2025, 4, 28), // May 28, 2025
            category: 'food',
            description: 'Home cooking'
          }
        ],
        tips: [
          'Reduce meat consumption to lower carbon footprint',
          'Buy local and seasonal produce',
          'Minimize food waste by meal planning',
          'Choose plant-based alternatives'
        ]
      },
      mobility: {
        category: 'Mobility',
        totalValue: 12.8,
        breakdown: [
          { label: 'Car Travel', value: 0.35, percentage: 58.3 },
          { label: 'Public Transport', value: 0.15, percentage: 25.0 },
          { label: 'Air Travel', value: 0.08, percentage: 13.3 },
          { label: 'Other', value: 0.02, percentage: 3.4 }
        ],
        activities: [
          {
            id: 'm1',
            name: 'Daily Commute',
            value: 0.15,
            icon: 'car-outline',
            date: new Date(2025, 5, 3),
            category: 'mobility',
            description: 'Car trips to work'
          },
          {
            id: 'm2',
            name: 'Weekend Trip',
            value: 0.08,
            icon: 'car-outline',
            date: new Date(2025, 5, 1),
            category: 'mobility',
            description: 'Weekend travel'
          },
          {
            id: 'm3',
            name: 'Morning Drive',
            value: 0.12,
            icon: 'car-outline',
            date: new Date(2025, 4, 30),
            category: 'mobility',
            description: 'Drive to work'
          }
        ],
        tips: [
          'Use public transportation when possible',
          'Carpool with colleagues',
          'Consider electric or hybrid vehicles',
          'Walk or bike for short distances'
        ]
      },
      electricity: {
        category: 'Electricity',
        totalValue: 15.2,
        breakdown: [
          { label: 'Heating/Cooling', value: 0.38, percentage: 46.3 },
          { label: 'Appliances', value: 0.22, percentage: 26.8 },
          { label: 'Lighting', value: 0.12, percentage: 14.6 },
          { label: 'Electronics', value: 0.10, percentage: 12.3 }
        ],
        activities: [
          {
            id: 'e1',
            name: 'Daily Usage',
            value: 0.68,
            icon: 'flash-outline',
            date: new Date(2025, 5, 3),
            category: 'electricity',
            description: 'Household electricity'
          },
          {
            id: 'e2',
            name: 'Peak Usage',
            value: 0.82,
            icon: 'flash-outline',
            date: new Date(2025, 5, 2),
            category: 'electricity',
            description: 'High consumption day'
          }
        ],
        tips: [
          'Switch to LED bulbs throughout your home',
          'Unplug devices when not in use',
          'Use smart thermostats to optimize heating/cooling',
          'Consider solar panels for renewable energy'
        ]
      },
      housing: {
        category: 'Housing',
        totalValue: 18.6,
        breakdown: [
          { label: 'Heating', value: 0.52, percentage: 55.3 },
          { label: 'Water Heating', value: 0.22, percentage: 23.4 },
          { label: 'Construction/Maintenance', value: 0.15, percentage: 16.0 },
          { label: 'Other', value: 0.05, percentage: 5.3 }
        ],
        activities: [
          {
            id: 'h1',
            name: 'Home Heating',
            value: 0.52,
            icon: 'home-outline',
            date: new Date(2025, 5, 3),
            category: 'housing',
            description: 'Gas heating'
          },
          {
            id: 'h2',
            name: 'Water Usage',
            value: 0.32,
            icon: 'home-outline',
            date: new Date(2025, 5, 1),
            category: 'housing',
            description: 'Hot water consumption'
          }
        ],
        tips: [
          'Improve home insulation to reduce heating needs',
          'Install a heat pump for efficient heating',
          'Regular maintenance of heating systems',
          'Use programmable thermostats'
        ]
      }
    };

    return of(details[categoryId] || details['food']).pipe(delay(300));
  }

  /**
   * Get recent activities
   */
  getRecentActivities(limit: number = 10): Observable<ConsumptionActivity[]> {
    return of(this.mockData.recentActivities.slice(0, limit)).pipe(delay(200));
  }
}
