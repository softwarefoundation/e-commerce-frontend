import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../../../shared/services/produto.service";
import {Produto} from "../../../shared/models/produto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent implements OnInit {

  formCadastroProduto!: FormGroup;

  produto: Produto = {};

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCadastroProduto = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });


  }


  cadastrarProduto() {
    // if (this.formCadastroProduto.valid) {
      this.produtoService.cadastrarProduto(this.formCadastroProduto.getRawValue()).subscribe(
        {
          next: value => {
            console.log(value)
          },
          error: err => {
            console.error('ERRO: ', err)
          }
        }
      )
    // } else {
    //   console.log('FORM INVALIDO...')
    // }
  }

}
