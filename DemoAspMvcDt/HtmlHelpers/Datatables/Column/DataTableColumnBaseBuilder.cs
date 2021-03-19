using Newtonsoft.Json.Linq;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Column
{
    public abstract class DataTableColumnBaseBuilder
    {
        public string Click { get; protected set; }
        public bool IsCommand { get; protected set; }
        public bool IsCheckBoxColumn { get; protected set; }
        public bool IsEditRowCommand { get; protected set; }
        
        public string OrderDirection { get; protected set; }

        public abstract JToken ToJToken();
    }
}
