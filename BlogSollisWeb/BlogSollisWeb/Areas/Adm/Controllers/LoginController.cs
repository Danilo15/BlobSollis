using BlogSollisNegocio.Model;
using BlogSollisNegocio.Utilidades;
using System;
using System.Web.Mvc;

namespace BlogSollisWeb.Areas.Adm.Controllers
{
    public class LoginController : Controller
    {
        // GET: Adm/Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Logoff()
        {
            SessionManager.UsuarioLogado = false;

            return View("~/Areas/Adm/Views/Login/Index.cshtml");
        }

        public ActionResult Logar(string email, string senha)
        {
            RetornoConsulta RetornoConsulta1 = new RetornoConsulta();
            string erroMensagem = string.Empty;

            try
            {
                LoginViewModel viewModel = new LoginViewModel();
                viewModel.Logar(email, senha);
            }
            catch (Exception ex)
            {
                erroMensagem = ex.Message;
            }

            TempData["Error"] = erroMensagem;

            if (SessionManager.UsuarioLogado)
                return Redirect("/Adm/Home");
            else
                return View("~/Areas/Adm/Views/Login/Index.cshtml");

        }
    }
}