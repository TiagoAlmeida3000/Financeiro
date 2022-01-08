using Financeiro.Dominio.Entidades;
using Financeiro.Dominio.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Dominio.Contratos
{
    public interface ILancamentoRepositorio
    {
        Task<int> ContarNumeroDeResultados(User user);
        Task AddLancamento(Lancamento lancamento);
        Task UpdateLancamento(Lancamento lancamento);
        Task DeleteLancamento(Lancamento lancamento);
        Task<Lancamento> GetIdLancamento(int id);
        Task<List<LancamentoModel>> List();
        Task<List<LancamentoModel>> ListaPaginacao(int skip, int take, User user);
        Task<float> ObterSaldo(User user);
        Task<List<string>> ListarCategoria(User user);
    }
}
