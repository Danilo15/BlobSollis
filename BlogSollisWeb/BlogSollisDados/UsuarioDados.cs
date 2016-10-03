using System.Data.SqlClient;

namespace BlogSollisDados
{
    public class UsuarioDados
    {
        /// <summary>
        ///
        /// </summary>
		/// <typeparam name="IUsuarioBase">Qualquer classe que implemente IUsuario</typeparam>
        /// <param name="pEmail"></param>
        /// <param name="pSenha"></param>
        /// <returns></returns>
        public IUsuario BuscarUsuario<IUsuarioBase>(string pEmail, string pSenha) where IUsuarioBase : IUsuario, new()
        {
            string conexao = BancoDeDados.ObterConexao();
            IUsuarioBase retorno = new IUsuarioBase();

            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand("SELECT * FROM Usuario WHERE email = @email AND senha = @senha");

                command.Parameters.AddWithValue("@email", pEmail);
                command.Parameters.AddWithValue("@senha", pSenha);

                command.Connection = connection;

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        retorno.IdUsuario = reader.GetInt32(0);
                        retorno.Email = reader.GetString(1);
                        retorno.Senha = reader.GetString(2);
                        retorno.Nome = reader.GetString(3);
                    }
                }
            }

            return retorno;
        }
    }
}