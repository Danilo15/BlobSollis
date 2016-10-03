using BlogSollisNegocio.Utilidades;
using System;

namespace BlogSollisNegocio.Model
{
    public class LoginViewModel
    {
        public void Logar(string email, string senha)
        {
            Usuario Usuario1 = new Usuario();
            string retorno = string.Empty;

            Usuario1 = Usuario1.BuscarUsuario(email, senha);

            if (Usuario1.IdUsuario > 0)
            {
                SessionManager.UsuarioLogado = true;
            }
            else
            {
                throw new Exception("Usuario ou senha incorretos");
            }
        }
    }
}