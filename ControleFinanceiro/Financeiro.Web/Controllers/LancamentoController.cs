using Financeiro.Dominio.Contratos;
using Financeiro.Dominio.Entidades;
using Financeiro.Dominio.Modelos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Financeiro.Web.Controllers
{

    [Route("api/[controller]")]
    public class LancamentoController : Controller
    {
        private readonly ILancamentoRepositorio _lancamentoRepositorio;
        private readonly IUserRepositorio _userRepositorio;

        public LancamentoController(ILancamentoRepositorio lancamentoRepositorio, IUserRepositorio userRepositorio)
        {
            _lancamentoRepositorio = lancamentoRepositorio;
            _userRepositorio = userRepositorio;
        }

        [HttpGet("Lista/{skip:int}/{take:int}")]
        [Authorize]
        public async Task<IActionResult> ListaLancamentos([FromRoute] int skip = 0, [FromRoute] int take = 25)
        {
            int userID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            User user = _userRepositorio.FindUser(userID);

            var categorias = await _lancamentoRepositorio.ListarCategoria(user);
            var result = _lancamentoRepositorio.ContarNumeroDeResultados(user);
            int total = await result;
            var todos =  _lancamentoRepositorio.ListaPaginacao(skip, take, user);
            var totalNum = total / take;

            return Ok(new
            {
                total, // total de resultados da tabela
                totalNum, // total de paginas na barra de paginação
                skip,
                take,
                data = todos.Result,
                categorias
            });
        }

        [HttpGet("Obter/{id}")]
        [Authorize]
        public async Task<IActionResult> GetId(int id)
        {
            Lancamento lancamento = await _lancamentoRepositorio.GetIdLancamento(id);
            LancamentoModel model = new LancamentoModel
            {
                Id = lancamento.Id,
                Valor = lancamento.Valor,
                SaldoFinal = lancamento.SaldoFinal,
                Descricao = lancamento.Descricao,
                FormaDePgto = lancamento.FormaDePgto,
                Data = lancamento.Data,
                Tipo = lancamento.Tipo,
                Categoria = lancamento.Categoria
            };
            return Ok(new { model });
        }

        [HttpGet("Saldo")]
        [Authorize]
        public async Task<IActionResult> GetSaldo()
        {
            int userID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            User user =  _userRepositorio.FindUser(userID);

            var saldo = await _lancamentoRepositorio.ObterSaldo(user);

            return Ok(new { saldo });
        }



        [HttpPost("Novo")]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] Lancamento lancamento)
        {
            try
            {
                if (lancamento != null)
                {
                    if (lancamento.Id > 0)
                    {
                        await _lancamentoRepositorio.UpdateLancamento(lancamento);
                        return Ok();
                    }
                    else
                    {
                        if(lancamento.Tipo == "receita")
                        {
                            float soma = lancamento.SaldoFinal + lancamento.Valor;
                            lancamento.SaldoFinal = soma;
                        }
                        if (lancamento.Tipo == "despesa")
                        {
                            float subtracao = lancamento.SaldoFinal - lancamento.Valor;
                            lancamento.SaldoFinal = subtracao;
                        }
                        await _lancamentoRepositorio.AddLancamento(lancamento);
                        return Ok();
                    }
                }
                else
                {
                    return BadRequest("Lançamento invalido");
                }                
            }catch (Exception erro)
            {
                return BadRequest(erro.ToString());
            }


        }


        [HttpPost("Deletar")]
        [Authorize]
        public async Task<ActionResult> Deletar([FromBody] Lancamento lancamento)
        {
            try
            {
                await _lancamentoRepositorio.DeleteLancamento(lancamento);
                return Ok();
            }catch(Exception erro)
            {
                return BadRequest(erro.ToString());
            }
        }
    }
}
