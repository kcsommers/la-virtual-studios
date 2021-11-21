import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonComponentModule } from '@la/components';
import { AuthPageComponent } from './auth-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      },
      {
        path: '',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ButtonComponentModule,
  ],
  declarations: [AuthPageComponent, LoginPageComponent, SignupPageComponent],
})
export class AuthPageComponentModule {}
