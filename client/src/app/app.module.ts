import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppShellModule } from './app-shell';
import { AppComponent } from './app.component';
import { HttpStreamInterceptor } from './core';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpStreamInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AppShellModule,
    HttpClientModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [interceptors],
})
export class AppModule {}
