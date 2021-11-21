import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventSelectorComponent } from './event-selector.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EventSelectorComponent],
  exports: [EventSelectorComponent],
})
export class EventSelectorComponentModule {}
