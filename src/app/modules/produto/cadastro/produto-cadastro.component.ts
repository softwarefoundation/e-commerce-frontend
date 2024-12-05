import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../../../shared/services/produto.service";
import {Produto} from "../../../shared/models/produto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileHelper} from "../../../shared/utils/file-helper";

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent implements OnInit {

  formCadastroProduto!: FormGroup;
  produto: Produto = {};
  imagemProdutoBase64: string = '';

  constructor(private produtoService: ProdutoService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formCadastroProduto = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      foto: [''],
    });


  }


  cadastrarProduto() {
    if (this.formCadastroProduto.valid) {

      this.produto = this.formCadastroProduto.getRawValue();
      this.produto.imagem = this.imagemProdutoBase64;

      this.produtoService.cadastrarProduto(this.produto).subscribe(
        {
          next: value => {
            console.log(value)
          },
          error: err => {
            console.error('ERRO: ', err)
          }
        }
      )
    } else {
      console.log('FORM INVALIDO...')
    }
  }

  uploadImagem(event: any) {
    if (event.target.files.length > 0) {
      let arquivo = event.target.files[0];

      FileHelper.convertParaBase64(arquivo).then(value => {
        this.imagemProdutoBase64 = value;
      });

    } else {
      console.log('Arquivo não encontrado');
    }
  }
}
