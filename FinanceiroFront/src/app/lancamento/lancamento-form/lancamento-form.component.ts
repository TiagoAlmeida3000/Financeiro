import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from '../lancamento';
import { LancamentoService } from '../lancamento.service';


@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {

  @Input() categorias : any

  fPags : Array<string> = ["Boleto","Dinheiro","Cartão de Crédito","Cartão de Débito","Boleto"]

  lancamento : Lancamento = new Lancamento();
  saldo: number = 0
  

  constructor( 
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private lancamentoServise : LancamentoService,
    ) { }

  ngOnInit(): void {
    this.lancamentoServise.obterSaldo().subscribe(saldo =>{
      this.saldo = Object.values(saldo)[Object.values(saldo).length - 1];
      console.log(this.saldo)

    });
  }

  trocarAba(value : string){
    let btn1 = document.getElementById('receita');
    let btn2 = document.getElementById('despesa');
    let btn3 = document.getElementById('instrucao')
    let conteudo1 = document.getElementById('nav-receita');
    let conteudo2 = document.getElementById('nav-despesa');
    let conteudo3 = document.getElementById('nav-instrucao');
    let fundoForm = document.getElementById('fundo')

    if(value == "receita"){
      this.lancamento.tipo = 'receita';
      btn1?.classList.add("active","text-success", "sombra");
      btn1?.classList.remove("text-secondary");
      btn2?.classList.add("text-secondary");
      btn2?.classList.remove("active","text-danger","sombra");
      btn3?.classList.add("text-secondary");
      btn3?.classList.remove("active","text-info","sombra");
      conteudo1?.classList.add("show", "active");      
      conteudo2?.classList.remove("show", "active");  
      conteudo3?.classList.remove("show", "active");
      fundoForm?.classList.add("fundor");
      fundoForm?.classList.remove("fundod","fundoi");                  
    }
    if(value == "despesa"){
      this.lancamento.tipo = 'despesa';
      btn2?.classList.add("active","text-danger", "sombra");
      btn2?.classList.remove("text-secondary");
      btn1?.classList.add("text-secondary");
      btn1?.classList.remove("active","text-success","sombra");
      btn3?.classList.add("text-secondary");
      btn3?.classList.remove("active","text-info","sombra");
      conteudo2?.classList.add("show", "active");      
      conteudo1?.classList.remove("show", "active");
      conteudo3?.classList.remove("show", "active");
      fundoForm?.classList.add("fundod");
      fundoForm?.classList.remove("fundor","fundoi");           
    }
    if(value == "instrucao"){
      this.lancamento.tipo = '';
      btn3?.classList.add("active","text-info", "sombra");
      btn3?.classList.remove("text-secondary");
      btn1?.classList.add("text-secondary");
      btn1?.classList.remove("active","text-success","sombra");
      btn2?.classList.add("text-secondary");
      btn2?.classList.remove("active","text-danger","sombra");
      conteudo3?.classList.add("show", "active");      
      conteudo1?.classList.remove("show", "active");
      conteudo2?.classList.remove("show", "active");
      fundoForm?.classList.add("fundoi");
      fundoForm?.classList.remove("fundor","fundod");            
    }
  }

  submit(form: NgForm){
    this.lancamento.saldoFinal = this.saldo;
    this.lancamentoServise.save(this.lancamento).subscribe(lancamento =>{
      form.reset();
      this.ngOnInit()
      this.router.navigate([""]);
      location.reload()
    },erro => {
      console.log(erro)
    });
  }
}


