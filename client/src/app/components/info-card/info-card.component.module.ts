import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponentModule } from '../button/button.component.module';
import { InfoCardComponent } from './info-card.component';

@NgModule({
  imports: [CommonModule, ButtonComponentModule],
  declarations: [InfoCardComponent],
  exports: [InfoCardComponent],
})
export class InfoCardComponentModule {}
