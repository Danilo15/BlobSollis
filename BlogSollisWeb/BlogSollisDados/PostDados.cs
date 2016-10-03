using System.Collections.Generic;
using System.Data.SqlClient;

namespace BlogSollisDados
{
    public class PostDados
    {
        public void Adicionar(IPost pPost)
        {
            string conexao = BancoDeDados.ObterConexao();
            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand("INSERT INTO Post (Titulo, Descricao, Rascunho) VALUES (@titulo, @descricao, @rascunho)");

                command.Parameters.AddWithValue("@titulo", pPost.Titulo);
                command.Parameters.AddWithValue("@descricao", pPost.Descricao);
                command.Parameters.AddWithValue("@rascunho", pPost.Rascunho.GetValueOrDefault());

                command.Connection = connection;

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void Atualizar(IPost pPost)
        {
            string conexao = BancoDeDados.ObterConexao();
            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand("UPDATE Post SET Titulo = @titulo, Descricao = @descricao, Rascunho = @rascunho WHERE IdPost = @idPost");

                command.Parameters.AddWithValue("@idPost", pPost.IdPost);
                command.Parameters.AddWithValue("@titulo", pPost.Titulo);
                command.Parameters.AddWithValue("@descricao", pPost.Descricao);
                command.Parameters.AddWithValue("@rascunho", pPost.Rascunho.GetValueOrDefault());

                command.Connection = connection;

                connection.Open();
                command.ExecuteNonQuery();
            }
        }

        public void ObterPorId(IPost pPost, int pIdPost)
        {
            string conexao = BancoDeDados.ObterConexao();

            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand();

                command.CommandText = string.Format("SELECT * FROM Post WHERE IdPost = {0}", pIdPost);

                command.Connection = connection;

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        pPost.IdPost = reader.GetInt32(0);
                        pPost.Titulo = reader.GetString(1);
                        pPost.Descricao = reader.GetString(2);
                        pPost.Rascunho = reader.GetBoolean(3);
                    }
                }
            }
        }

        public void RemoverPorId(int pIdPost)
        {
            string conexao = BancoDeDados.ObterConexao();

            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand();

                command.CommandText = string.Format("DELETE Post WHERE IdPost = {0}", pIdPost);

                command.Connection = connection;

                connection.Open();

                command.ExecuteScalar();
            }
        }

        /// <summary>
        ///
        /// </summary>
        /// <typeparam name="IPostBase">Qualquer classe que implemente IPost</typeparam>
        /// <typeparam name="IPost"></typeparam>
        /// <param name="pPostCol"></param>
        /// <param name="pRetornarTodosRegistros"></param>
        /// <returns></returns>
        public bool ObterColecao<IPostBase>(List<IPost> pPostCol, bool pRetornarTodosRegistros, bool pRascunho) where IPostBase : IPost, new()
        {
            string conexao = BancoDeDados.ObterConexao();
            bool retorno = false;
            using (SqlConnection connection = new SqlConnection(conexao))
            {
                SqlCommand command = new SqlCommand();

                if (pRascunho)
                {
                    command.CommandText = "SELECT * FROM Post";
                }
                else
                {
                    command.CommandText = "SELECT * FROM Post WHERE Rascunho = 0";
                }

                command.Connection = connection;

                connection.Open();

                SqlDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    int contador = 0;

                    while (reader.Read())
                    {
                        IPostBase Post1 = new IPostBase();
                        Post1.IdPost = reader.GetInt32(0);
                        Post1.Titulo = reader.GetString(1);
                        Post1.Descricao = reader.GetString(2);
                        Post1.Rascunho = reader.GetBoolean(3);

                        pPostCol.Add(Post1);
                    }

                    if (contador > 0)
                        retorno = true;
                }
            }

            return retorno;
        }
    }
}