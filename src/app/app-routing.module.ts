import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProdutoCadastroComponent} from "./modules/produto/cadastro/produto-cadastro.component";
import {LoginComponent} from "./modules/core/security/login/login.component";

const routes: Routes = [
  {
    path: "produto/cadastro",
    component: ProdutoCadastroComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
