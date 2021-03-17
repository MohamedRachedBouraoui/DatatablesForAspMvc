using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Buttons
{
    public class DataTableButtonBuilder : IJToken
    {
        private const string extend = "extend";

        public JObject _jObject { get; private set; }
        public DataTableButtonBuilder()
        {
            _jObject = new JObject();
        }

        public DataTableButtonBuilder Excel()
        {
            _jObject.Add(extend, new JValue("excel"));
            return this;
        }

        public DataTableButtonBuilder Pdf()
        {
            _jObject.Add(extend, new JValue("pdf"));
            return this;
        }

        public DataTableButtonBuilder Text(string text)
        {
            _jObject.Add("text", new JValue(text));
            return this;
        }

        public DataTableButtonBuilder ClassName(string className)
        {
            _jObject.Add("className", new JValue(className));
            return this;
        }

        /// <summary>
        /// Option to instruct the Excel export to create empty cells. By default if a cell contains null or empty data, it will not be created in the exported spreadsheet.
        /// </summary>
        /// <returns></returns>
        public DataTableButtonBuilder AllowNullData()
        {
            _jObject.Add("createEmptyCells", new JValue(true));
            return this;
        }

        public DataTableButtonBuilder UseXls()
        {
            _jObject.Add("extension", new JValue("xls"));
            return this;
        }

        public JToken ToJToken()
        {
            return _jObject;
        }
    }
}
