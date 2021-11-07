import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GetIconPipe } from './get-icon.pipe';
import { IconComponent } from './icon.component';
import { IconService } from './icon.service';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [IconComponent, GetIconPipe],
  exports: [IconComponent],
  providers: [IconService],
})
export class IconComponentModule {}
