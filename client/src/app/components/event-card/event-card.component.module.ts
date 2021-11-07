import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule } from '../button/button.component.module';
import { EventCardComponent } from './event-card.component';

@NgModule({
  imports: [CommonModule, ButtonComponentModule],
  declarations: [EventCardComponent],
  exports: [EventCardComponent],
})
export class EventCardComponentModule {}
