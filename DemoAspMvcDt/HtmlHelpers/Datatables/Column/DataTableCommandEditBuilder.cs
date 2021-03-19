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
    public class DataTableCommandEditBuilder : DataTableColumnBaseBuilder, IJToken
    {
        public string TableHeader { get; private set; }
        public string EditPopupTitle { get; private set; }

        private JObject _jObject;

        public string Click { get; private set; }
        public bool IsHiden { get; private set; }

        public Expression Expression { get; internal set; }
        public bool IsServerSide { get; private set; }
        public string FetchViewFromUrl { get; private set; }
        public string ValidateByUrl { get; private set; }

        public DataTableCommandEditBuilder(string editPopupTitle)
        {
            IsEditRowCommand = true;
            EditPopupTitle = editPopupTitle;

            TableHeader = string.Empty;
            _jObject = new JObject
            {
                { "data", new JRaw("null") },
                { "className", new JValue("dt-command") },
                { "orderable", new JValue(false) },
                { "searchable", new JValue(false)},
                {"width", new JValue("1em")},
                {"render", new JRaw("function(data, type, row, meta){return DtEventsHelper.renderEditRowCommand(data, type, row, meta);}")},
            };
        }

        /// <summary>
        /// Class to assign to each cell in the column.
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public DataTableCommandEditBuilder ClassName(string className)
        {

            _jObject.Remove("className");
            _jObject.Add("className", new JValue($"dt-command {className}"));
            return this;
        }

        /// <summary>
        /// Set the column title.
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        public DataTableCommandEditBuilder Title(string title)
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
        public DataTableCommandEditBuilder Hide()
        {
            IsHiden = true;
            _jObject.Add("visible", new JValue(false));
            return this;
        }

        public DataTableCommandEditBuilder FetchViewFrom(string fetchViewFromUrl)
        {
            IsServerSide = true;
            FetchViewFromUrl = fetchViewFromUrl;
            return this;
        }

        public DataTableCommandEditBuilder ValidateBy(string validateByUrl)
        {
            ValidateByUrl = validateByUrl;
            return this;
        }

        public override JToken ToJToken()
        {
            return _jObject;
        }
    }
}
