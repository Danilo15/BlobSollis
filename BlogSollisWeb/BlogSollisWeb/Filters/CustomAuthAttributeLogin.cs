using BlogSollisNegocio.Utilidades;
using System.Web;
using System.Web.Mvc;

namespace BlogSollisWeb.Filters
{
    public class CustomAuthAttributeLogin : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool autorizado = Autorizar(httpContext);

            return autorizado;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            string view = "~/Areas/Adm/Views/Login/Index.cshtml";
            string mensagem = string.Empty;
            TempDataDictionary tempData = new TempDataDictionary();

            if (filterContext.RequestContext.HttpContext.Request.Url.PathAndQuery != "/Adm/Login")
            {
                mensagem = "Acesso não autorizado";
                tempData["Error"] = mensagem;
                tempData["ReturnUrl"] = filterContext.RequestContext.HttpContext.Request.Url.PathAndQuery;
            }

            filterContext.Result = new ViewResult
            {
                ViewName = view,
                TempData = tempData
            };
        }

        private bool Autorizar(HttpContextBase httpContext)
        {
            return SessionManager.UsuarioLogado;
        }
    }
}