import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, IconComponentModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonComponentModule {}
