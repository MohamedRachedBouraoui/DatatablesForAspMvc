using DemoAspMvcDt.HtmlHelpers.Datatables.RazorExtension;
using DemoAspMvcDt.HtmlHelpers.Datatables.Table;
using System;

namespace DemoAspMvcDt.HtmlHelpers.Datatables
{
    public static class DataTableHtmlBuilder<T> where T : class
    {
        public static string ToHtmlString(DataTableBuilder<T> dtBuilder)
        {
            if (string.IsNullOrEmpty(dtBuilder.TableName))
            {
                throw new ArgumentException("Table MUST have a name.");
            }

            return DtModel.InitInstance(dtBuilder).ToString();
        }
    }
}
