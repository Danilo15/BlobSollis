using BlogSollisDados;

namespace BlogSollisNegocio
{
    public class Usuario : IUsuario
    {
        #region Propriedades

        private int _IdUsuario;

        public int IdUsuario
        {
            get
            {
                return _IdUsuario;
            }

            set
            {
                _IdUsuario = value;
            }
        }

        private string _Email = string.Empty;

        public string Email
        {
            get
            {
                return _Email;
            }

            set
            {
                _Email = value;
            }
        }

        private string _Senha = string.Empty;

        public string Senha
        {
            get
            {
                return _Senha;
            }

            set
            {
                _Senha = value;
            }
        }

        private string _Nome = string.Empty;

        public string Nome
        {
            get
            {
                return _Nome;
            }

            set
            {
                _Nome = value;
            }
        }

        #endregion Propriedades

        public Usuario BuscarUsuario(string pEmail, string pSenha)
        {
            UsuarioDados UsuarioDados1 = new UsuarioDados();

            Usuario retorno = (Usuario)UsuarioDados1.BuscarUsuario<Usuario>(pEmail, pSenha);

            return retorno;
        }
    }
}