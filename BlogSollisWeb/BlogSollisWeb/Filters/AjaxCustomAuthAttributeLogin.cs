using BlogSollisNegocio.Utilidades;
using System.Web.Mvc;

namespace BlogSollisWeb.Filters
{
    public class AjaxCustomAuthAttributeLogin : CustomAuthAttributeLogin
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                UrlHelper urlHelper = new UrlHelper(filterContext.RequestContext);

                string mensagem = string.Empty;
                if (!SessionManager.UsuarioLogado)
                {
                    mensagem = "Sessão expirada, faça o login novamente";
                    filterContext.Result = new JsonResult
                    {
                        Data = new
                        {
                            ESucesso = false,
                            Mensagem = mensagem,
                            LoginUrl = "/Adm/Login"
                        },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                else
                {
                    mensagem = "Sem permissão para acessar este endereço, contate o Administrador";
                    filterContext.Result = new JsonResult
                    {
                        Data = new
                        {
                            ESucesso = false,
                            Mensagem = mensagem
                        },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
            }
            else
            {
                base.HandleUnauthorizedRequest(filterContext);
            }
        }
    }
}