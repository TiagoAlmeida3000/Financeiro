import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lancamento } from './lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  userId : any;
  user : any
  id : any

  constructor(private http: HttpClient) { }


get usuario() {
    let usuario_json = localStorage.getItem("id");
    this.user = usuario_json;
    return this.user;
  }

  getUserId(id : any){
    this.userId = id
    this.id = localStorage.setItem('id', this.userId);
  }



  getAll(skip: number, take:number){
    return this.http.get(`${environment.API}Lancamento/Lista/${skip}/${take}`)
  }

  getById(id:number){
    return this.http.get(`${environment.API}Lancamento/Obter/${id}`);
  }

  save(lancamento: Lancamento){

    const dateNow = new Date();
    const lancamentoBody = {
      Id : lancamento.id,
      Valor: lancamento.valor,
      Saldofinal: lancamento.saldoFinal,
      FormaDePgto: lancamento.formaDePgto,
      Data: new Date(new Date(dateNow).getTime() - 1000 * 60 * 60 * 8),
      Descricao: lancamento.descricao,
      Categoria: lancamento.categoria,
      Tipo: lancamento.tipo,
      UserId : this.usuario
    }
    console.log(lancamentoBody)
      return this.http.post<Lancamento>(`${environment.API}Lancamento/Novo`, lancamentoBody);
      
    }

  delete(lancamento : Lancamento){
    return this.http.post<Lancamento>(`${environment.API}Lancamento/Deletar`, lancamento)
  }

  obterSaldo(){
    return this.http.get(`${environment.API}Lancamento/Saldo`)
  }
}
