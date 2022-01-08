using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Dominio.Modelos
{
    public class LancamentoModel
    {
        public int Id { get; set; }
        public float Valor { get; set; }
        public float SaldoFinal { get; set; }
        public string Descricao { get; set; }
        public string FormaDePgto { get; set; }
        public string Tipo { get; set; }
        public DateTime Data { get; set; }
        public string Categoria { get; set; }
    }
}
