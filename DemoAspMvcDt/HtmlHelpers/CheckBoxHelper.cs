using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers
{
    public static  class CheckBoxHelper
    {
        public static CheckBoxBuilder<TModel> MyCheckBox<TModel>(this HtmlHelper<TModel> htmlHelper) where TModel : class
        {
            return new CheckBoxBuilder<TModel>(htmlHelper);
        }
    }
}
