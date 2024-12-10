import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProdutoCadastroComponent} from './modules/produto/cadastro/produto-cadastro.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {HttpInterceptorImpl} from "./modules/core/security/http-interceptor-impl";

export function jwtTokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    ProdutoCadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        allowedDomains: environment.allowedDomains,
        disallowedRoutes: environment.disallowedRoutes,
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorImpl,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
