using System.Web.Optimization;

namespace BlogSollisWeb
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //BundleTable.EnableOptimizations = true;

            //bundles.Add(new ScriptBundle("~/app/common").Include(
            //            "~/Scripts/vendors/jquery-2.1.3.min.js",
            //            "~/Scripts/vendors/browserDetection.js",
            //            "~/node_modules/underscore/underscore.js",
            //            "~/node_modules/backbone/backbone.js"
            //            ));
        }
    }
}