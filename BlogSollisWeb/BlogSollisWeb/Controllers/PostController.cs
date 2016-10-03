using BlogSollisNegocio.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlogSollisWeb.Controllers
{
    public class PostController : Controller
    {
        // GET: Post
        public ActionResult Index(int id)
        {
            HomeAdmDetalhesViewModel viewModel = new HomeAdmDetalhesViewModel();

            viewModel.Editar(viewModel, id);

            return View(viewModel);
        }
    }
}