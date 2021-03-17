using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Buttons
{
    public class DataTableButtonsFactory : IJToken
    {
        public List<DataTableButtonBuilder> Buttons { get; private set; }
        public JObject _jObject { get; private set; }
        public DataTableButtonsFactory()
        {
            Buttons = new List<DataTableButtonBuilder>();
            _jObject = new JObject();
        }

        public DataTableButtonBuilder Excel()
        {
            var btBuilder = new DataTableButtonBuilder();
            btBuilder.Excel();
            Buttons.Add(btBuilder);
            return btBuilder;
        }

        public DataTableButtonBuilder Pdf()
        {
            var btBuilder = new DataTableButtonBuilder();
            btBuilder.Pdf();
            Buttons.Add(btBuilder);
            return btBuilder;
        }
        public JToken ToJToken()
        {
            JArray jArray = new JArray();
            foreach (var button in Buttons)
            {
                jArray.Add(button._jObject);
            }

            return jArray;
        }
    }
}
