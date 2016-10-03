using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace ExportTableToExcelMVC.Models
{
    public class DownloadFileActionResult : ActionResult
    {
        private string _fileName = string.Empty;

        public string FileName
        {
            get
            {
                return _fileName;
            }
            set
            {
                _fileName = value;
            }
        }

        private string _grid = string.Empty;

        public string Grid
        {
            get
            {
                return _grid;
            }
            set
            {
                _grid = value;
            }
        }

        public override void ExecuteResult(ControllerContext context)
        {
            HttpContextBase curContext = context.HttpContext;

            curContext.Response.Clear();
            curContext.Response.AddHeader("content-disposition", string.Format("attachment;filename={0}.xls", _fileName));
            curContext.Response.Charset = "UTF-8";
            curContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            curContext.Response.ContentType = "application/vnd.ms-excel";

            byte[] byteArray = Encoding.UTF8.GetBytes(_grid);
            MemoryStream s = new MemoryStream(byteArray);
            StreamReader sr = new StreamReader(s, Encoding.UTF8);
            curContext.Response.Write(sr.ReadToEnd());

            curContext.Response.End();
        }
    }
}