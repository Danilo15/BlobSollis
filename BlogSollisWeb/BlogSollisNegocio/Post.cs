using BlogSollisDados;
using System;

namespace BlogSollisNegocio
{
    public class Post : IPost
    {
        #region Propriedades

        private int _IdPost;

        public int IdPost
        {
            get
            {
                return _IdPost;
            }

            set
            {
                _IdPost = value;
            }
        }

        private string _Titulo = string.Empty;

        public string Titulo
        {
            get
            {
                return _Titulo;
            }

            set
            {
                _Titulo = value;
            }
        }

        private string _Descricao = string.Empty;

        public string Descricao
        {
            get
            {
                return _Descricao;
            }

            set
            {
                _Descricao = value;
            }
        }

        private bool? _Rascunho;

        public bool? Rascunho
        {
            get
            {
                return _Rascunho;
            }

            set
            {
                _Rascunho = value;
            }
        }

        #endregion Propriedades

        #region Constructores

        public Post()
        {

        }

        public Post(int pIdPost)
        {
            PostDados PostDados1 = new PostDados();
            PostDados1.ObterPorId(this, pIdPost);
        }

        #endregion Constructores

        public void Adicionar(Post pPost)
        {
            Validar(pPost);

            PostDados PostDados1 = new PostDados();
            PostDados1.Adicionar(pPost);
        }

        public void RemoverPorId(int pIdPost)
        {
            PostDados PostDados1 = new PostDados();
            PostDados1.RemoverPorId(pIdPost);
        }

        public void Atualizar(Post pPost)
        {
            Validar(pPost);

            PostDados PostDados1 = new PostDados();
            PostDados1.Atualizar(pPost);
        }

        private void Validar(Post pPost)
        {
            MensagensPadroes padroes = new MensagensPadroes();

            if (pPost.Titulo.Length == 0)
                throw new Exception(string.Format(padroes.CampoObrigatorio, "Titulo"));

            if (pPost.Descricao.Length == 0)
                throw new Exception(string.Format(padroes.CampoObrigatorio, "Descrição"));
        }
    }
}