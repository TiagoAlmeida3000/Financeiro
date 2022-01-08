using Financeiro.Dominio.Entidades;
using Financeiro.Repositorio.Config;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Repositorio.Contexto
{
    public class FinanceiroContexto : DbContext
    {
        public FinanceiroContexto(DbContextOptions options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public DbSet<User> User { get; set; }
        public DbSet<Lancamento> Lancamento { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new LancamentoConfig());

            base.OnModelCreating(modelBuilder);
        }
    }
}
