import {Component, OnInit} from '@angular/core';
import {ProdutoService} from "../../../shared/services/produto.service";
import {Produto} from "../../../shared/models/produto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileHelper} from "../../../shared/utils/file-helper";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.scss'
})
export class ProdutoCadastroComponent implements OnInit {

  formCadastroProduto!: FormGroup;
  imagemProdutoBase64: string = '';
  imagemCardUpload: string = FileHelper.IMAGEM_PADRAO_CARD_UPLOAD;

  constructor(private produtoService: ProdutoService, private fb: FormBuilder, private toastrService: ToastrService) {
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

      const produto: Produto = this.formCadastroProduto.getRawValue();
      produto.imagem = this.imagemProdutoBase64;

      this.produtoService.cadastrarProduto(produto).subscribe(
        {
          next: value => {
            this.limparFormularioAposSalvarProduto();
          },
          error: err => {
            this.toastrService.error('Não foi possível salvar o produto');
          }
        }
      )
    } else {
      this.toastrService.warning('Verifique as infomações do formulário', '', {
        progressBar: true,
      });
    }
  }


  private limparFormularioAposSalvarProduto() {
    this.formCadastroProduto.reset();
    this.imagemCardUpload = FileHelper.IMAGEM_PADRAO_CARD_UPLOAD;
    this.imagemProdutoBase64 = '';
    this.toastrService.success('Produto salvo com sucesso!', '', {
      progressBar: true,
    });
  }

  uploadImagem(event: any) {
    if (event.target.files.length > 0) {
      let arquivo = event.target.files[0];

      FileHelper.convertParaBase64(arquivo).then(value => {
        this.imagemProdutoBase64 = value;
        this.imagemCardUpload = value;
      });

    } else {
      console.log('Arquivo não encontrado');
    }
  }
}
