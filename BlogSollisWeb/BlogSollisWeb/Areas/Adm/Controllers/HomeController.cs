using BlogSollisNegocio.Model;
using BlogSollisWeb.Controllers;
using BlogSollisWeb.Filters;
using System;
using System.Web.Mvc;

namespace BlogSollisWeb.Areas.Adm.Controllers
{
    [AjaxCustomAuthAttributeLogin]
    public class HomeController : BaseController
    {
        private string _detalhesHtml = "~/Areas/Adm/Views/Home/_Detalhes.cshtml";
        private string _gridHtml = "~/Areas/Adm/Views/Home/_Grid.cshtml";

        // GET: Adm/Home
        public ActionResult Index()
        {
            HomeAdmViewModel viewModel = new HomeAdmViewModel();

            viewModel.Index(viewModel);

            return View(viewModel);
        }

        #region Buscar(HomeAdmViewModel pViewModel)

        [HttpPost]
        public ActionResult Buscar(HomeAdmViewModel pViewModel)
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();

            try
            {
                pViewModel.Index(pViewModel);

                RetornoConsulta1.ESucesso = true;
                RetornoConsulta1.Mensagem = string.Empty;
                RetornoConsulta1.GridHtml = base.RenderRazorViewToString(this, _gridHtml, pViewModel);
            }
            catch (Exception ex)
            {
                RetornoConsulta1.ESucesso = false;
                RetornoConsulta1.Mensagem = ex.Message;
            }

            return Json(RetornoConsulta1);
        }

        #endregion Buscar(HomeAdmViewModel pViewModel)

        #region Editar(int id)

        public ActionResult Editar(int id)
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();
            HomeAdmDetalhesViewModel viewModel = new HomeAdmDetalhesViewModel();

            viewModel.Editar(viewModel, id);

            try
            {
                RetornoConsulta1.DetalhesHtml = base.RenderRazorViewToString(this, _detalhesHtml, viewModel);
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

        #endregion Editar(int id)

        #region Remover(int id)

        public ActionResult Remover(int id)
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();
            HomeAdmDetalhesViewModel viewModel = new HomeAdmDetalhesViewModel();

            viewModel.Remover(viewModel, id);

            try
            {
                RetornoConsulta1.DetalhesHtml = base.RenderRazorViewToString(this, _detalhesHtml, viewModel);
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

        #endregion Remover(int id)

        public ActionResult Criar()
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();
            HomeAdmDetalhesViewModel viewModel = new HomeAdmDetalhesViewModel();

            try
            {
                RetornoConsulta1.DetalhesHtml = base.RenderRazorViewToString(this, _detalhesHtml, viewModel);
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
    }
}