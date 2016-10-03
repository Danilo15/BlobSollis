using System.Web;

namespace BlogSollisNegocio.Utilidades
{
    public class SessionManager
    {
        public static bool UsuarioLogado
        {
            get
            {
                bool retorno = false;
                if (HttpContext.Current.Session["UsuarioLogado"] != null)
                {
                    retorno = (bool)HttpContext.Current.Session["UsuarioLogado"];
                };

                return retorno;
            }
            set
            {
                HttpContext.Current.Session["UsuarioLogado"] = value;
            }
        }
    }
}