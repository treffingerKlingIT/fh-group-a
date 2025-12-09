import { Component, ViewChild } from '@angular/core';
import { IonModal, IonButton, IonIcon, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { chevronBackOutline, addOutline, chevronDownOutline } from 'ionicons/icons';

@Component({
  selector: 'app-housing-modal',
  templateUrl: './housing-modal.component.html',
  styleUrls: ['./housing-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonModal, IonButton, IonIcon, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput]
})
export class HousingModalComponent {
  @ViewChild(IonModal) modal!: IonModal;

  // Form data
  homeType = 'Apartment';
  householdSize = '1-2 persons';
  gasType = 'Natural Gas';
  gasUse = '';
  waterUse = '';
  waterHeatingMethod = 'Electric';

  // Dropdown options
  homeTypes = ['Apartment', 'House', 'Condo', 'Townhouse'];
  householdSizes = ['1-2 persons', '3-4 persons', '5+ persons'];
  gasTypes = ['Natural Gas', 'Propane', 'Oil', 'None'];
  waterHeatingMethods = ['Electric', 'Gas', 'Solar', 'Heat Pump'];

  constructor() {
    addIcons({
      'chevron-back-outline': chevronBackOutline,
      'add-outline': addOutline,
      'chevron-down-outline': chevronDownOutline
    });
  }

  dismiss() {
    this.modal.dismiss();
  }

  addEntry() {
    const housingData = {
      homeType: this.homeType,
      householdSize: this.householdSize,
      gasType: this.gasType,
      gasUse: this.gasUse,
      waterUse: this.waterUse,
      waterHeatingMethod: this.waterHeatingMethod
    };

    console.log('Housing data:', housingData);
    // TODO: Save the data to a service or backend
    this.modal.dismiss(housingData);
  }
}
