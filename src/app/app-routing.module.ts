import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProdutoCadastroComponent} from "./modules/produto/cadastro/produto-cadastro.component";

const routes: Routes = [
  {
    path: "produto/cadastro",
    component: ProdutoCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
