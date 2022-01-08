using Financeiro.Dominio.Contratos;
using Financeiro.Dominio.Entidades;
using Financeiro.Repositorio.Contexto;
using Microsoft.Win32.SafeHandles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Repositorio.Repositorio
{
    public class UserRepositorio : IUserRepositorio, IDisposable
    {
        protected readonly FinanceiroContexto FinanceiroContexto;
        public UserRepositorio(FinanceiroContexto financeiroContexto)
        {
            FinanceiroContexto = financeiroContexto;
        }

        public User FindUser(int id)
        {
            return FinanceiroContexto.User.Find(id);
        }

        public User GetName(string nome)
        {
            return FinanceiroContexto.User.FirstOrDefault(u => u.Nome == nome);
        }

        public User GetUser(string email, string senha)
        {
            return FinanceiroContexto.User.FirstOrDefault(u => u.Email == email && u.Senha == senha);

        }

        public User GetUser(string email)
        {
            return FinanceiroContexto.User.FirstOrDefault(u => u.Email == email);
        }

        public int? GetUserId(string email)
        {
            return FinanceiroContexto.User.FirstOrDefault(u => u.Email == email)?.Id;
        }

        public async Task PostUser(User user)
        {
            FinanceiroContexto.Add(user);
            await FinanceiroContexto.SaveChangesAsync();
        }

        public User Validar(User user)
        {
            return FinanceiroContexto.User.Where(u => u.Email == user.Email).FirstOrDefault();
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
