using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System.Reflection;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Column
{
    public class DataTableCheckBoxCommandBuilder : DataTableColumnBaseBuilder, IJToken
    {
        public string TableHeader { get; private set; }
        public PropertyInfo ColumnPropertyInfo { get; private set; }
        public string CheckBoxColumnId { get; }

        private JObject _jObject;

        public DataTableCheckBoxCommandBuilder(string propName)
        {
            CheckBoxColumnId = propName;
            IsCheckBoxColumn = true;
            _jObject = new JObject
            {
                { "data", new JValue(propName) },
                { "name", new JValue(propName) },
                { "type", new JValue("bool") },
                {"className", new JValue("dt-command dt-command-checkbox") },
                { "orderable", new JValue(false) },                
                { "render", new JRaw($"function(d,t,r,m){{return DtCheckBoxColumnHelper.render(d,t,r,m,'{propName}');}}") },
                { "title", new JValue($"<div for='{propName}'>{propName}</div><div><input type='checkbox' id='{propName}' class='dt_checkbox_all_{propName} dt_checkbox_all_' data-col-title='{propName}'></div>") }
            };
        }

        /// <summary>
        /// Class to assign to each cell in the column.
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public DataTableCheckBoxCommandBuilder ClassName(string className)
        {
            string classes = _jObject.GetValue("className").ToString();
            _jObject.Add("className", new JValue($"{classes} {className}"));
            return this;
        }

        /// <summary>
        /// Enable or disable the display of this column.
        /// </summary>
        /// <param name="visible"></param>
        /// <returns></returns>
        public DataTableCheckBoxCommandBuilder Hide()
        {
            _jObject.Add("visible", new JValue(false));
            return this;
        }

        /// <summary>
        /// Column width assignment.
        /// </summary>
        /// <param name="width"></param>
        /// <returns></returns>
        public DataTableCheckBoxCommandBuilder Width(string width)
        {
            _jObject.Remove("width");
            _jObject.Add("width", new JValue(width));
            return this;
        }
        public override JToken ToJToken()
        {
            return _jObject;
        }
    }
}
