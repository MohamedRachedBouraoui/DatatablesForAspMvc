using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Linq.Expressions;
using System.Reflection;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Column
{
    /// <summary>
    /// Represents a grid column builder
    /// </summary>
    public class DataTableCommandBuilder : DataTableColumnBaseBuilder, IJToken
    {
        public string TableHeader { get; private set; }
        public PropertyInfo ColumnPropertyInfo { get; private set; }

        private JObject _jObject;

        public string Click { get; private set; }
        public bool IsHiden { get; private set; }

        public Expression Expression { get; internal set; }
        public string EditPopupTitle { get; private set; }

        public DataTableCommandBuilder()
        {
            TableHeader = string.Empty;
            _jObject = new JObject
            {
                { "data", new JRaw("null") }
            };
        }


        /// <summary>
        /// Action call when button clicked inside column
        /// </summary>
        /// <param name="function"></param>
        /// <returns></returns>
        public DataTableCommandBuilder OnClick(string function)
        {
            Click = function;
            return this;
        }

        /// <summary>
        /// Class to assign to each cell in the column.
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public DataTableCommandBuilder ClassName(string className)
        {

            _jObject.Remove("className");
            _jObject.Add("className", new JValue($"dt-command {className}"));
            return this;
        }

        internal void Command(Func<string> function)
        {
            _jObject.Add("className", new JValue("dt-command"));
            _jObject.Add("orderable", new JValue(false));
            _jObject.Add("searchable", new JValue(false));
            _jObject.Add("render", new JRaw($"function(d,t,r,m){{return {function()}(d,t,r,m);}}"));
        }

        /// <summary>
        /// Set default, static, content for a column.
        /// </summary>
        /// <param name="defaultContent"></param>
        /// <returns></returns>
        public DataTableCommandBuilder DefaultContent(string defaultContent)
        {
            _jObject.Add("defaultContent", new JValue(defaultContent));
            return this;
        }

        /// <summary>
        /// Enable or disable ordering on this column. 
        /// </summary>
        /// <param name="orderable"></param>
        /// <returns></returns>
        public DataTableCommandBuilder DisableOrdering()
        {
            _jObject.Add("orderable", new JValue(false));
            return this;
        }

        /// <summary>
        /// Set the column title.
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        public DataTableCommandBuilder Title(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                _jObject.Remove("title");
                _jObject.Add("title", new JValue(title));
                TableHeader = title;
            }
            return this;
        }

        /// <summary>
        /// Enable or disable the display of this column.
        /// </summary>
        /// <param name="visible"></param>
        /// <returns></returns>
        public DataTableCommandBuilder Hide()
        {
            IsHiden = true;
            _jObject.Add("visible", new JValue(false));
            return this;
        }

        /// <summary>
        /// Column width assignment.
        /// </summary>
        /// <param name="width"></param>
        /// <returns></returns>
        public DataTableCommandBuilder Width(string width)
        {
            if (!string.IsNullOrEmpty(width))
            {
                _jObject.Add("width", new JValue(width));
            }
            return this;
        }

        public void SetCheckBoxColumn(string id)
        {
            IsCheckBoxColumn = true;

            _jObject.Remove("data");
            _jObject.Add("data", new JValue($"{id}"));
            _jObject.Add("orderable", new JValue(false));
            //_jObject.Add("render", new JRaw($"function ( data, type, row, meta ){{ return '';}}"));


            _jObject.Add("checkboxes", new JObject
            {
                { "selectRow",new JValue(true)}
            });            
        }

        public override JToken ToJToken()
        {
            return _jObject;
        }
    }
}
