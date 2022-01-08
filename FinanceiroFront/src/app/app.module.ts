import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticadorComponent } from './autenticador/autenticador.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LancamentoFormComponent } from './lancamento/lancamento-form/lancamento-form.component';
import { LancamentoListaComponent } from './lancamento/lancamento-lista/lancamento-lista.component';
import { LancamentoFiltroComponent } from './lancamento/lancamento-filtro/lancamento-filtro.component';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import localePt from '@angular/common/locales/pt'; 


export function tokenGetter() {
  return localStorage.getItem("jwt");
}

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    AutenticadorComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    LancamentoFormComponent,
    LancamentoListaComponent,
    LancamentoFiltroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard,   
              {
                provide: LocationStrategy, 
                useClass: HashLocationStrategy
              },
              { provide: LOCALE_ID, useValue: 'pt' },
              { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
