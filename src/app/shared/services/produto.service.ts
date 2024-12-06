import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../models/produto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }


  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.baseUrl, produto);
  }


}
