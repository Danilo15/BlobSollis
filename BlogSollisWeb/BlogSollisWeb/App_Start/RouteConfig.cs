using System.Web.Mvc;
using System.Web.Routing;

namespace BlogSollisWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}/{idPai}/{idComplementar}",
                new
                {
                    controller = "Home",
                    action = "Index",
                    id = UrlParameter.Optional,
                    idPai = UrlParameter.Optional,
                    idComplementar = UrlParameter.Optional
                },
                new[] { "BlogSollisWeb.Controllers" }
            );
        }
    }
}