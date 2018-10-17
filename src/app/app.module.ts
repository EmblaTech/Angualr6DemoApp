import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http-interceptor';
import { DataContextService, AppJsonService, LoaderService, HttpService, MessageService } from './services/index.services';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { LoginService } from './services/login/login.service';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    routing,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    DataContextService,
    LoaderService,
    AppJsonService,
    HttpService,
    LoginService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
