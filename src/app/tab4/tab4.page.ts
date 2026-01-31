import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  timeOutline,
  trashOutline,
  logOutOutline,
  createOutline,
  chevronForwardOutline,
  footstepsOutline,
  leafOutline,
  ribbonOutline
} from 'ionicons/icons';
import {
  ProfileService,
  UserProfile,
  UserStats,
  LevelData,
  SettingsItem
} from '../services/profile.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonIcon,
    CommonModule
  ]
})
export class Tab4Page implements OnInit {
  profile: UserProfile | null = null;
  stats: UserStats | null = null;
  levelData: LevelData | null = null;
  settingsItems: SettingsItem[] = [];
  loading = true;

  // Radar chart points calculation
  radarPoints: string = '';

  constructor(private profileService: ProfileService) {
    addIcons({
      'person-circle-outline': personCircleOutline,
      'time-outline': timeOutline,
      'trash-outline': trashOutline,
      'log-out-outline': logOutOutline,
      'create-outline': createOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'footsteps-outline': footstepsOutline,
      'leaf-outline': leafOutline,
      'ribbon-outline': ribbonOutline
    });
  }

  ngOnInit() {
    this.settingsItems = this.profileService.getSettingsItems();
    this.loadProfileData();
  }

  loadProfileData() {
    this.loading = true;

    forkJoin({
      profile: this.profileService.getUserProfile(),
      stats: this.profileService.getUserStats(),
      levelData: this.profileService.getLevelData()
    }).subscribe({
      next: (data) => {
        this.profile = data.profile;
        this.stats = data.stats;
        this.levelData = data.levelData;
        this.calculateRadarPoints();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loading = false;
      }
    });
  }

  calculateRadarPoints() {
    if (!this.levelData) return;

    // Radar chart center and radius
    const centerX = 170;
    const centerY = 165;
    const maxRadius = 110;

    // Calculate points for each axis (top, right, bottom, left)
    const housing = (this.levelData.housing / 100) * maxRadius;
    const mobility = (this.levelData.mobility / 100) * maxRadius;
    const electricity = (this.levelData.electricity / 100) * maxRadius;
    const food = (this.levelData.food / 100) * maxRadius;

    // Points: top (housing), right (mobility), bottom (electricity), left (food)
    const points = [
      { x: centerX, y: centerY - housing },           // Top - Housing
      { x: centerX + mobility, y: centerY },          // Right - Mobility
      { x: centerX, y: centerY + electricity },       // Bottom - Electricity
      { x: centerX - food, y: centerY }               // Left - Food
    ];

    this.radarPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  }

  onSettingsItemClick(item: SettingsItem) {
    // Non-interactive for now
    console.log('Settings item clicked:', item.id);
  }
}
