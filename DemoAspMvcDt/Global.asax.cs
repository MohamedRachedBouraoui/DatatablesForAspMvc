using DemoAspMvcDt.Helpers;
using DemoAspMvcDt.HtmlHelpers.Datatables.ServerSide;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace DemoAspMvcDt
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            //JsonSerializerSettings serializerSettings = new JsonSerializerSettings();
            //serializerSettings.Converters.Add(new IsoDateTimeConverter());
            //GlobalConfiguration.Configuration.Formatters[0] = new JsonNetFormatter(serializerSettings);

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            ModelBinderProviders.BinderProviders.Insert(0, new DataTablesRequestModelBinderProvider());
            ModelBinderProviders.BinderProviders.Insert(0, new A14ModelBinderProvider());
        }
    }
}
