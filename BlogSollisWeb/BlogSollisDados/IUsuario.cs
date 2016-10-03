using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogSollisDados
{
    public interface IUsuario
    {
        int IdUsuario
        {
            get;
            set;
        }

        string Email
        {
            get;
            set;
        }

        string Senha
        {
            get;
            set;
        }

        string Nome
        {
            get;
            set;
        }
    }
}
