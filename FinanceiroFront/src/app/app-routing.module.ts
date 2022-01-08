import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadorComponent } from './autenticador/autenticador.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [

  {path: '', component: HomeComponent,  canActivate:[AuthGuard]},
  {
    path:'',
    component: AutenticadorComponent,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'cadastro', component: CadastroComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
