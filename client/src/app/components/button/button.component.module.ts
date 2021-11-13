import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '..';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonComponentModule {}
