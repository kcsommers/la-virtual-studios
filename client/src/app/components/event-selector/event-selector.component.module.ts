import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  GetDateDisplayPipeModule,
  GetRemainingSlotsPipeModule,
} from '@la/core';
import { ButtonComponentModule } from '..';
import { EventSelectorComponent } from './event-selector.component';

@NgModule({
  imports: [
    CommonModule,
    GetDateDisplayPipeModule,
    GetRemainingSlotsPipeModule,
    ButtonComponentModule,
  ],
  declarations: [EventSelectorComponent],
  exports: [EventSelectorComponent],
})
export class EventSelectorComponentModule {}
