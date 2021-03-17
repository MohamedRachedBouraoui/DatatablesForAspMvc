using System;
using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.ServerSide
{
    public class DataTablesRequestModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(Type modelType)
        {
            if (modelType == typeof(DataTablesRequest))
            {
                return new DataTablesRequestModelBinder();
            }
            return null;
        }
    }
}
