import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerComponentModule } from '../spinner/spinner.component.module';
import { IconComponentModule } from '../icon/icon.component.module';
import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, IconComponentModule, SpinnerComponentModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonComponentModule {}
