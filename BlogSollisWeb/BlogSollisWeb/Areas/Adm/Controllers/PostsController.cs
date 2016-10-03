using BlogSollisNegocio.Model;
using System;
using System.Web.Mvc;

namespace BlogSollisWeb.Areas.Adm.Controllers
{
    public class PostsController : Controller
    {
        #region Salvar(HomeAdmDetalhesViewModel pViewModel)

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Salvar(HomeAdmDetalhesViewModel pViewModel, bool rascunho)
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();

            try
            {
                pViewModel.PostSelecionado.Rascunho = rascunho;
                pViewModel.Salvar(pViewModel);

                RetornoConsulta1.ESucesso = true;
                RetornoConsulta1.Mensagem = string.Empty;
            }
            catch (Exception ex)
            {
                RetornoConsulta1.ESucesso = false;
                RetornoConsulta1.Mensagem = ex.Message;
            }

            return Json(RetornoConsulta1);
        }

        #endregion Salvar(HomeAdmDetalhesViewModel pViewModel)
    }
}