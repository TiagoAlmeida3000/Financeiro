import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Lancamento } from '../lancamento';
import { take } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThrowStmt } from '@angular/compiler';
import { LancamentoService } from '../lancamento.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lancamento-lista',
  templateUrl: './lancamento-lista.component.html',
  styleUrls: ['./lancamento-lista.component.css'],
})
export class LancamentoListaComponent implements OnInit {
  lancamentos$!: any;
  categorias!: any;
  lancamentoSelecionado!: Lancamento;
  URLAPI = environment.API;

  skip: number = 0; // numeros de resultados pulados
  take: number = 5; // numeros de resultados obtidos
  totalnum: number = 0; // total de numeros na barra de paginação
  totalres: number = 0; //total de resultados
  pagAtual: number = 1; //pagina atual da paginação
  pagAnterior: number = 0; // pagina anteriormente selecionada na barra de paginação
  saldo: number = 0;

  // lancamento : Lancamento = new Lancamento()
  // valor : number = 0;
  // descricao : string = "";
  // formaDePgto : string = "";
  // tipo : string = "";

  // modalRef?: BsModalRef;
  // config = {
  //   backdrop: true,
  //   ignoreBackdropClick: true
  // };

  // form!: FormGroup 

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private service: LancamentoService
  ) {}

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  user: any;
  get usuario() {
    let usuario_json = localStorage.getItem('id');
    this.user = usuario_json;
    return this.user;
  }

  ngOnInit(): void {
    this.listarLancamentos();
    this.service.obterSaldo().subscribe((saldo) => {
      this.saldo = Object.values(saldo)[Object.values(saldo).length - 1];
      console.log('Saldo Final: ' + this.saldo);
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  mudar(value: any, i: any) {
    if (value <= 0) {
      value = value + this.take;
    }
    this.skip = value - this.take;
    this.pagAtual = i + 1;
    this.pagAnterior = this.pagAtual;
    console.log(`skip: ${this.skip}, take: ${this.take}`);
    this.listarLancamentos();
  }

  anterior() {
    if (this.skip != 0) {
      this.skip = this.skip - this.take;
      this.pagAtual = this.pagAtual - 1;
      console.log(`skip: ${this.skip}, take: ${this.take}`);
      this.listarLancamentos();
    }
  }

  proximo() {
    if (this.lancamentos$.length !== 0) {
      this.skip = this.skip + this.take;
      this.pagAtual = this.pagAtual + 1;
      console.log(`skip: ${this.skip}, take: ${this.take}`);
      this.listarLancamentos();
    }
  }

  listarLancamentos() {
    this.service.getAll(this.skip, this.take).subscribe((lancamento) => {
      this.categorias =
        Object.values(lancamento)[Object.values(lancamento).length - 1];
      this.lancamentos$ =
        Object.values(lancamento)[Object.values(lancamento).length - 2];
      this.totalnum =
        Object.values(lancamento)[Object.values(lancamento).length - 5];
      this.totalres =
        Object.values(lancamento)[Object.values(lancamento).length - 6];
      // console.log("Retorno do objeto")
      //console.log(this.lancamentos$)
      // console.log("Retorno da API")
      // console.log(lancamento)
      // console.log("Total de numeros na barra de paginação:"+this.totalnum)
      // console.log("Total de resultados: "+this.totalres)
      // console.log("Pagina atual: "+this.pagAtual)
      console.log(this.categorias);
    });
  }

  editar(id: number) {
    this.router.navigate(['/editar', id], { relativeTo: this.route });
  }

  deletar(lancamento: any) {
    this.lancamentoSelecionado = lancamento;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  confirmDelete() {
    return this.http
      .post<Lancamento>(
        this.URLAPI + 'Lancamento/Deletar',
        this.lancamentoSelecionado
      )
      .pipe(take(1))
      .subscribe(
        (success) => {
          this.listarLancamentos();
          this.deleteModalRef.hide();
        },
        (error) => console.log(error)
      );
  }

  declineDelete() {
    this.deleteModalRef.hide();
  }
}
