using Financeiro.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Dominio.Contratos
{
    public interface IUserRepositorio
    {
        User FindUser(int id);
        int? GetUserId(string email);
        User GetUser(string email, string senha);
        User GetUser(string email);
        User GetName(string nome);
        User Validar(User user);
        Task PostUser(User user);
    }
}
