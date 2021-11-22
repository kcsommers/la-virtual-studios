import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GetDateDisplayPipeModule } from '@la/core';
import { EventSelectorComponent } from './event-selector.component';

@NgModule({
  imports: [CommonModule, GetDateDisplayPipeModule],
  declarations: [EventSelectorComponent],
  exports: [EventSelectorComponent],
})
export class EventSelectorComponentModule {}
