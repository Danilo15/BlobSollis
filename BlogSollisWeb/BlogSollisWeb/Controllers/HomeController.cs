using System.Web.Mvc;
using System.Data.SqlClient;
using System;
using BlogSollisNegocio.Model;

namespace BlogSollisWeb.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            HomeViewModel viewModel = new HomeViewModel();
            return View(viewModel);
        }

    }
}