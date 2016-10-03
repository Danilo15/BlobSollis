using ExportTableToExcelMVC.Models;
using System.Web.Mvc;

namespace BlogSollisWeb.Controllers
{
    public class BaseController : Controller
    {
        #region RenderRazorViewToString

        protected string RenderRazorViewToString(Controller controller, string viewName, object model)
        {
            RenderRazorViewToString RenderRazorViewToString1 = new RenderRazorViewToString();

            return RenderRazorViewToString1.Render(controller, viewName, model);
        }

        #endregion RenderRazorViewToString

        #region ExportExcel(string pFileName, string pGrid)

        protected ActionResult ExportExcel(string pFileName, string pGrid)
        {
            DownloadFileActionResult result = new DownloadFileActionResult();
            result.Grid = pGrid;
            result.FileName = pFileName;

            return result;
        }

        #endregion ExportExcel(string pFileName, string pGrid)
    }
}