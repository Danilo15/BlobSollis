using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogSollisDados
{
    public class BancoDeDados
    {
        public static string ObterConexao()
        {
            string connection = ConfigurationManager.ConnectionStrings["BlogSollis"].ConnectionString;
            return string.Format(connection, AppDomain.CurrentDomain.BaseDirectory);
        }
    }
}
