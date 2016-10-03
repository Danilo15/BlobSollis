using BlogSollisDados;
using System.Collections.Generic;

namespace BlogSollisNegocio
{
    public class PostsCol : List<IPost>
    {
        public PostsCol()
        {

        }

        public PostsCol(bool pRetornarTodosRegistros, bool pRascunho)
        {
            PostDados PostDados1 = new PostDados();

            bool retorno = PostDados1.ObterColecao<Post>(this, pRetornarTodosRegistros, pRascunho);
        }
    }
}