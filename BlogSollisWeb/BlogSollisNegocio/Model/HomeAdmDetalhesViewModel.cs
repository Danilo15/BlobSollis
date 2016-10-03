using System;

namespace BlogSollisNegocio.Model
{
    public class HomeAdmDetalhesViewModel
    {
        #region PostSelecionado

        private Post _PostSelecionado;

        public Post PostSelecionado
        {
            get
            {
                return _PostSelecionado;
            }
            set
            {
                _PostSelecionado = value;
            }
        }

        #endregion PostSelecionado

        #region Constructor

        public HomeAdmDetalhesViewModel()
        {
            _PostSelecionado = new Post();
        }

        #endregion Constructor

        public void Salvar(HomeAdmDetalhesViewModel pViewModel)
        {
            Post Post1 = new Post();

            if (pViewModel.PostSelecionado.IdPost == 0)
                Post1.Adicionar(pViewModel.PostSelecionado);
            else
                Post1.Atualizar(pViewModel.PostSelecionado);
        }

        public void Editar(HomeAdmDetalhesViewModel pViewModel, int id)
        {
            pViewModel.PostSelecionado = new Post(id);
        }

        public void Remover(HomeAdmDetalhesViewModel viewModel, int id)
        {
            Post Post1 = new Post();

            Post1.RemoverPorId(id);
        }
    }
}