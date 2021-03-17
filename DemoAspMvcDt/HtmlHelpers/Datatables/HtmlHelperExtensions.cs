using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers.Datatables
{
    /// <summary>
    /// Provides HtmlHelper extensions
    /// </summary>
    public static class HtmlHelperExtensions
    {
        /// <summary>
        /// Extension to controls
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="htmlHelper"></param>
        /// <returns></returns>
        public static ComponentBuilder DataTable(this HtmlHelper htmlHelper)
        {            
            return new ComponentBuilder(htmlHelper);
        }
    }
}