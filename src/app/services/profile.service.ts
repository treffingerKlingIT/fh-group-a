import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface UserProfile {
  name: string;
  avatar: string;
  level: string;
}

export interface UserStats {
  totalFootprint: number;
  savedTrees: number;
}

export interface LevelData {
  level: string;
  housing: number;
  food: number;
  mobility: number;
  electricity: number;
}

export interface SettingsItem {
  id: string;
  label: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private mockProfile: UserProfile = {
    name: 'Felix Prinz',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    level: 'Beginner'
  };

  private mockStats: UserStats = {
    totalFootprint: 0.82,
    savedTrees: 37
  };

  private mockLevelData: LevelData = {
    level: 'Beginner',
    housing: 90,
    food: 75,
    mobility: 10,
    electricity: 50
  };

  private settingsItems: SettingsItem[] = [
    { id: 'account', label: 'Account', icon: 'person-circle-outline' },
    { id: 'monthly-usage', label: 'Monthly Usage', icon: 'time-outline' },
    { id: 'delete-account', label: 'Delete Account', icon: 'trash-outline' },
    { id: 'logout', label: 'Logout', icon: 'log-out-outline' }
  ];

  constructor() {}

  getUserProfile(): Observable<UserProfile> {
    return of(this.mockProfile).pipe(delay(300));
  }

  getUserStats(): Observable<UserStats> {
    return of(this.mockStats).pipe(delay(300));
  }

  getLevelData(): Observable<LevelData> {
    return of(this.mockLevelData).pipe(delay(300));
  }

  getSettingsItems(): SettingsItem[] {
    return this.settingsItems;
  }
}
