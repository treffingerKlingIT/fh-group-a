import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IonModal, IonButton, IonIcon, GestureController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { businessOutline, restaurantOutline, flashOutline, carOutline, chevronForwardOutline } from 'ionicons/icons';

export type CategoryType = 'housing' | 'food' | 'electricity' | 'mobility';

@Component({
  selector: 'app-log-new-modal',
  templateUrl: './log-new-modal.component.html',
  styleUrls: ['./log-new-modal.component.scss'],
  standalone: true,
  imports: [IonModal, IonButton, IonIcon]
})
export class LogNewModalComponent implements AfterViewInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('modalContent', { read: ElementRef }) modalContent!: ElementRef;
  @Output() categorySelected = new EventEmitter<CategoryType>();

  private startY = 0;
  private currentY = 0;
  private isDragging = false;

  constructor(private gestureCtrl: GestureController) {
    addIcons({
      'business-outline': businessOutline,
      'restaurant-outline': restaurantOutline,
      'flash-outline': flashOutline,
      'car-outline': carOutline,
      'chevron-forward-outline': chevronForwardOutline
    });
  }

  ngAfterViewInit() {
    //this.setupSwipeGesture();
  }

  private setupSwipeGesture() {
    const gesture = this.gestureCtrl.create({
      el: this.modalContent.nativeElement,
      gestureName: 'swipe-down',
      direction: 'y',
      onStart: (detail) => {
        this.startY = detail.currentY;
        this.isDragging = true;
      },
      onMove: (detail) => {
        if (!this.isDragging) return;

        this.currentY = detail.currentY;
        const deltaY = this.currentY - this.startY;

        // Only allow downward swipes
        if (deltaY > 0) {
          this.modalContent.nativeElement.style.transform = `translateY(${deltaY}px)`;
          this.modalContent.nativeElement.style.transition = 'none';
        }
      },
      onEnd: (detail) => {
        if (!this.isDragging) return;

        const deltaY = detail.currentY - this.startY;
        const velocity = detail.velocityY;

        this.modalContent.nativeElement.style.transition = 'transform 0.3s ease-out';

        // Close if dragged down more than 100px or fast swipe down
        if (deltaY > 100 || velocity > 0.5) {
          this.dismiss();
        } else {
          // Snap back to original position
          this.modalContent.nativeElement.style.transform = 'translateY(0)';
        }

        this.isDragging = false;
      }
    });

    gesture.enable();
  }

  onCategorySelect(category: CategoryType) {
    console.log('Selected category:', category);
    // Close this modal and emit the category selection
    this.modal.dismiss().then(() => {
      this.categorySelected.emit(category);
    });
  }

  dismiss(data?: any) {
    this.modal.dismiss(data);
  }
}
