import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produto} from "../models/produto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = "http://localhost:8080/produto";

  constructor(private httpClient: HttpClient) {
  }


  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.httpClient.post<Produto>(this.baseUrl, produto);
  }


}
