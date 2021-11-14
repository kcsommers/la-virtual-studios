import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GetRemainingSlotsDisplayPipeModule } from '@la/core';
import { ButtonComponentModule } from '../button/button.component.module';
import { EventCardComponent } from './event-card.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonComponentModule,
    GetRemainingSlotsDisplayPipeModule,
  ],
  declarations: [EventCardComponent],
  exports: [EventCardComponent],
})
export class EventCardComponentModule {}
