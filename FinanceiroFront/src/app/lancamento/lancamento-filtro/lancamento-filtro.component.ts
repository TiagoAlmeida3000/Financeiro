import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-filtro',
  templateUrl: './lancamento-filtro.component.html',
  styleUrls: ['./lancamento-filtro.component.css']
})
export class LancamentoFiltroComponent implements OnInit {

  meses: Array<string>= ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezenbro"]

  constructor() { }

  ngOnInit(): void {
  }

}
