using Financeiro.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Repositorio.Config
{
    public class LancamentoConfig : IEntityTypeConfiguration<Lancamento>
    {
        public void Configure(EntityTypeBuilder<Lancamento> builder)
        {
            builder.HasKey(l => l.Id);

            builder
                .Property(l => l.Valor)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(l => l.SaldoFinal)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(l => l.Descricao)
                .IsRequired()
                .HasMaxLength(400);

            builder
                .Property(l => l.FormaDePgto)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .Property(l => l.Data)
                .IsRequired();

            builder
                .Property(l => l.Categoria)
                .IsRequired()
                .HasMaxLength(50);
            builder
                .Property(l => l.Tipo)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasOne(u => u.User);
        }
    }
}
