using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogSollisDados
{
    public interface IPost
    {
        int IdPost
        {
            get;
            set;
        }

        string Titulo
        {
            get;
            set;
        }

        string Descricao
        {
            get;
            set;
        }

        bool? Rascunho
        {
            get;
            set;
        }
    }
}
