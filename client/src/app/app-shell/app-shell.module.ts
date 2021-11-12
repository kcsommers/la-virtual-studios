import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponentModule, IconComponentModule } from '@la/components';
import { AppShellComponent } from './app-shell.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponentModule,
    IconComponentModule,
  ],
  declarations: [AppShellComponent, HeaderComponent, FooterComponent],
  exports: [AppShellComponent],
})
export class AppShellModule {}
