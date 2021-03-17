using System;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Routing;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.RazorExtension
{
    /// <summary>
    /// Class that renders MVC views to a string using the
    /// standard MVC View Engine to render the view. 
    /// 
    /// Requires that ASP.NET HttpContext is present to
    /// work, but works outside of the context of MVC
    /// </summary>
    public class ViewRenderer
    {
        public static string ConvertirVueString<TModel>(string cheminVue, TModel model)
        {
            Controller controller = ControllerExtension.CreateController<DtController>();
            controller. ViewData.Model = model;
            using (StringWriter writer = new StringWriter())
            {
                ViewEngineResult vResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, cheminVue);
                ViewContext vContext = new ViewContext(controller.ControllerContext, vResult.View, controller.ViewData, new TempDataDictionary(), writer);
                vResult.View.Render(vContext, writer);
                return writer.ToString();
            }
        }

    }

    /// <summary>
    /// Empty MVC Controller instance used to 
    /// instantiate and provide a new ControllerContext
    /// for the ViewRenderer
    /// </summary>
    public class DtController : Controller
    {
    }
    public static class ControllerExtension
    {
        public static T CreateController<T>(RouteData routeData = null) where T : Controller, new()
        {
            // create a disconnected controller instance
            T controller = new T();

            // get context wrapper from HttpContext if available
            HttpContextBase wrapper;
            if (System.Web.HttpContext.Current != null)
                wrapper = new HttpContextWrapper(System.Web.HttpContext.Current);
            else
                throw new InvalidOperationException("Can't create Controller Context if no active HttpContext instance is available.");

            if (routeData == null)
                routeData = new RouteData();

            // add the controller routing if not existing
            if (!routeData.Values.ContainsKey("controller") && !routeData.Values.ContainsKey("Controller"))
                routeData.Values.Add("controller", controller.GetType().Name.ToLower().Replace("controller", ""));

            controller.ControllerContext = new ControllerContext(wrapper, routeData, controller);
            return controller;
        }
    }
}