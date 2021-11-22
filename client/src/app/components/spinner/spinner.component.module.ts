import { NgModule } from '@angular/core';
import { IconComponentModule } from '../icon/icon.component.module';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [IconComponentModule],
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
})
export class SpinnerComponentModule {}
