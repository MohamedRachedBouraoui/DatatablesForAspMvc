using DemoAspMvcDt.HtmlHelpers.Datatables.Table;
using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers.Datatables
{
    public class ComponentBuilder// where TModel : class
    {
        /// <summary>
        /// Gets or sets the <see cref="IHtmlHelper{TModel}"/>
        /// </summary>
        public HtmlHelper htmlHelper { get; set; }

        public ComponentBuilder(HtmlHelper htmlHelper)
        {
            this.htmlHelper = htmlHelper;
        }
        /// <summary>
        /// Gets a <see cref="TableBuilder{T}"/>
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public DataTableBuilder<T> Build<T>(string name) where T : class
        {
            return new DataTableBuilder<T>(name);
        }

        public DefaultDataTableBuilder<T> BuildDefault<T>(string name) where T : class
        {
            return new DefaultDataTableBuilder<T>(name);
        }
    }
}
