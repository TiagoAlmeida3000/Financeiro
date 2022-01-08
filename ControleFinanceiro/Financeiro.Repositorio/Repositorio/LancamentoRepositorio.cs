using Financeiro.Dominio.Contratos;
using Financeiro.Dominio.Entidades;
using Financeiro.Dominio.Modelos;
using Financeiro.Repositorio.Contexto;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Repositorio.Repositorio
{
    public class LancamentoRepositorio : ILancamentoRepositorio, IDisposable
    {

        protected readonly FinanceiroContexto FinanceiroContexto;
        public LancamentoRepositorio(FinanceiroContexto financeiroContexto)
        {
            FinanceiroContexto = financeiroContexto;
        }

        public async Task<int> ContarNumeroDeResultados(User user)
        {
            return await FinanceiroContexto.Lancamento.Where(x => user.Id == x.UserId).CountAsync();
        }

        public async Task AddLancamento(Lancamento lancamento)
        {
            await FinanceiroContexto.Lancamento.AddAsync(lancamento);
            await FinanceiroContexto.SaveChangesAsync();
        }

        public async Task UpdateLancamento(Lancamento lancamento)
        {
            FinanceiroContexto.Lancamento.Update(lancamento);
            await FinanceiroContexto.SaveChangesAsync();
        }

        public async Task DeleteLancamento(Lancamento lancamento)
        {
            FinanceiroContexto.Lancamento.Remove(lancamento);
            await FinanceiroContexto.SaveChangesAsync();
        }

        public async Task<Lancamento> GetIdLancamento(int id)
        {
            return await FinanceiroContexto.Lancamento.FindAsync(id);
        }

        public async Task<List<LancamentoModel>> List()
        {
            return await FinanceiroContexto.Lancamento.Select(x => new LancamentoModel
            {
                Id = x.Id,
                Valor = x.Valor,
                SaldoFinal = x.SaldoFinal,
                Descricao = x.Descricao,
                FormaDePgto = x.FormaDePgto,
                Tipo = x.Tipo,
                Data = x.Data,
                Categoria = x.Categoria,

            }).AsNoTracking().ToListAsync();
        }

        public async Task<List<LancamentoModel>> ListaPaginacao(int skip, int take, User user)
        {
            return await FinanceiroContexto.Lancamento.Where(x => user.Id == x.UserId).OrderByDescending(x => x.Id).Select(x => new LancamentoModel
            {
                Id = x.Id,
                Valor = x.Valor,
                SaldoFinal = x.SaldoFinal,
                Descricao = x.Descricao,
                FormaDePgto = x.FormaDePgto,
                Tipo = x.Tipo,
                Data = x.Data,
                Categoria = x.Categoria,

            }).AsNoTracking().Skip(skip).Take(take).ToListAsync();
        }

        public async Task<List<string>> ListarCategoria(User user)
        {
            return await FinanceiroContexto.Lancamento.Where(x => user.Id == x.UserId).GroupBy(x => x.Categoria).Select(x =>x.Key).AsNoTracking().ToListAsync();
        }

        public async Task<float> ObterSaldo(User user)
        {
            return await FinanceiroContexto.Lancamento.Where(x => user.Id == x.UserId).OrderByDescending(x => x.Id).Select(x => x.SaldoFinal).FirstOrDefaultAsync();
        }


        #region Disposed https://docs.microsoft.com/pt-br/dotnet/standard/garbage-collection/implementing-dispose
        // Flag: Has Dispose already been called?
        bool disposed = false;
        // Instantiate a SafeHandle instance.
        SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);



        // Public implementation of Dispose pattern callable by consumers.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }


        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                // Free any other managed objects here.
                //
            }

            disposed = true;
        }
        #endregion
    }
}
