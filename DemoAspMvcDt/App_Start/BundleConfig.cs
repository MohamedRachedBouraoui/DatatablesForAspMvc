using System.Web;
using System.Web.Optimization;

namespace DemoAspMvcDt
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/dt4mvc").Include(

                     //"~/Scripts/dt4mvc/vendors/jquery.dataTables.min.js",
                     "~/Scripts/dt4mvc/vendors/moment.js",

                     "~/Scripts/dt4mvc/vendors/datatables.min.js",
                     "~/Scripts/dt4mvc/vendors/percentageBars.js",
                     "~/Scripts/dt4mvc/vendors/jquery.highlight.js",
                     "~/Scripts/dt4mvc/vendors/dataTables.searchHighlight.min.js",

                     "~/Scripts/dt4mvc/dtLogger.js",
                     "~/Scripts/dt4mvc/dtDatesHelper.js",
                     "~/Scripts/dt4mvc/DataTableApi.js",
                     "~/Scripts/dt4mvc/dtUidHelper.js",
                     "~/Scripts/dt4mvc/dtAjaxHelper.js",
                     "~/Scripts/dt4mvc/dtTableHtmlHelper.js",
                     "~/Scripts/dt4mvc/dtFormHelper.js",
                     "~/Scripts/dt4mvc/dtEditCmd.js",
                     "~/Scripts/dt4mvc/dtEventsHelper.js",
                     "~/Scripts/dt4mvc/dtModalHelper.js",
                     "~/Scripts/dt4mvc/dtCheckBoxColumnHelper.js"
                     ));

            bundles.Add(new StyleBundle("~/Content/dt4mvc").Include(

                     "~/Content/dt4mvc/vendors/datatables.min.css",
                     "~/Content/dt4mvc/vendors/dataTables.searchHighlight.css",
                     "~/Content/dt4mvc/dt_style.css"));



            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
