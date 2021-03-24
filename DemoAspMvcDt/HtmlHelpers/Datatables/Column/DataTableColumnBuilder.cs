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
    public class DataTableColumnBuilder : DataTableColumnBaseBuilder//, IJToken
    {
        private const string defaultFormat = "YYYY-MM-DD";

        public string TableHeader { get; private set; }
        public PropertyInfo ColumnPropertyInfo { get; private set; }


        private JObject _jObject;
        private bool ColumnIsDate;

        public bool IsHiden { get; private set; }
        public Expression Expression { get; internal set; }

        public string PropName { get; }

        public DataTableColumnBuilder(PropertyInfo propertyInfo)
        {
            ColumnPropertyInfo = propertyInfo;

            PropName = propertyInfo.GetPropertyName();

            string title = propertyInfo.GetDisplayValue();
            TableHeader = title;


            _jObject = new JObject
            {
                { "data", new JValue(PropName) },
                { "name", new JValue(PropName) },
                { "title", new JValue(title) }
            };

            Type columnType = propertyInfo.PropertyType;
            ColumnIsDate = columnType == typeof(DateTime) || columnType == typeof(DateTime?);
        }

        public DataTableColumnBuilder()
        {
            _jObject = new JObject();
        }

        public DataTableColumnBuilder(string propName)
        {
            PropName = propName;

            string title = PropName;
            TableHeader = title;

            _jObject = new JObject
            {
                { "data", new JValue(PropName) },
                { "name", new JValue(PropName) },
                { "title", new JValue(title) }
            };
        }


        /// <summary>
        /// Cell type to be created for a column.
        /// </summary>
        /// <param name="cellType"></param>
        /// <returns></returns>
        public DataTableColumnBuilder CellType(CellType cellType)
        {
            //this.Column.CellType = cellType;
            //ref:https://datatables.net/reference/option/columns.cellType#Default
            _jObject.Add("cellType", new JValue(cellType.ToString()));



            return this;
        }

        /// <summary>
        /// Action call when button clicked inside column
        /// </summary>
        /// <param name="function"></param>
        /// <returns></returns>
        public DataTableColumnBuilder OnClick(string function)
        {
            Click = function;
            return this;
        }

        /// <summary>
        /// Class to assign to each cell in the column.
        /// </summary>
        /// <param name="className"></param>
        /// <returns></returns>
        public DataTableColumnBuilder ClassName(string className)
        {
            _jObject.Add("className", new JValue(className));
            return this;
        }

        /// <summary>
        /// Add padding to the text content used when calculating the optimal with for a table.
        /// </summary>
        /// <param name="contentPadding"></param>
        /// <returns></returns>
        public DataTableColumnBuilder ContentPadding(string contentPadding)
        {
            _jObject.Add("contentPadding", new JValue(contentPadding));
            return this;
        }

        /// <summary>
        /// Set the data source for the column from the rows data object / array.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Data(string data)
        {

            _jObject.Remove("data");
            _jObject.Add("data", new JValue(data));
            return this;
        }

        /// <summary>
        /// Set the data source for the column from the rows data object / array.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Data(int data)
        {

            _jObject.Add("data", new JValue(data));
            return this;
        }

        /// <summary>
        /// Set default, static, content for a column.
        /// </summary>
        /// <param name="defaultContent"></param>
        /// <returns></returns>
        public DataTableColumnBuilder DefaultContent(string defaultContent)
        {
            _jObject.Add("defaultContent", new JValue(defaultContent));
            return this;
        }

        /// <summary>
        /// Enable or disable ordering on this column. 
        /// </summary>
        /// <param name="orderable"></param>
        /// <returns></returns>
        public DataTableColumnBuilder DisableOrdering()
        {

            _jObject.Add("orderable", new JValue(false));
            return this;
        }

        /// <summary>
        /// Define multiple column ordering as the default order for a column.
        /// </summary>
        /// <param name="column">A single column index to order upon</param>
        /// <returns></returns>
        public DataTableColumnBuilder OrderData(int column)
        {
            _jObject.Add("orderData", new JArray(new int[] { column }));
            return this;
        }

        /// <summary>
        /// Define multiple column ordering as the default order for a column.
        /// </summary>
        /// <param name="columns">Multiple column indexes to define multi-column sorting</param>
        /// <returns></returns>
        public DataTableColumnBuilder OrderData(int[] columns)
        {
            _jObject.Add("orderData", new JArray(columns));
            return this;
        }

        /// <summary>
        /// Live DOM sorting type assignment.
        /// </summary>
        /// <param name="orderDataType"></param>
        /// <returns></returns>
        public DataTableColumnBuilder OrderDataType(string orderDataType)
        {
            _jObject.Add("orderDataType", new JValue(orderDataType));
            return this;
        }


        /// <summary>
        /// Render (process) the data for use in the table.
        /// </summary>
        /// <param name="function"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Render(string function)
        {

            _jObject.Remove("render");
            _jObject.Add("render", new JRaw($"function(d,t,r,m){{return {function}(d,t,r,m);}}"));
            return this;
        }

        /// <summary>
        /// Enable or disable filtering on the data in this column.
        /// </summary>
        /// <param name="searchable"></param>
        /// <returns></returns>
        public DataTableColumnBuilder DisableSearching()
        {
            _jObject.Add("searchable", new JValue(false));
            return this;
        }

        /// <summary>
        /// Set the column title.
        /// </summary>
        /// <param name="title"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Title(string title)
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
        /// Set the column type - used for filtering and sorting string processing.
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Type(string type)
        {
            if (!string.IsNullOrEmpty(type))
            {
                _jObject.Remove("type");
                _jObject.Add("type", new JValue(type.ToLower()));
            }

            ColumnIsDate = type.ToLower() == "date";
            return this;
        }

        /// <summary>
        /// Enable or disable the display of this column.
        /// </summary>
        /// <param name="visible"></param>
        /// <returns></returns>
        public DataTableColumnBuilder Hide()
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
        public DataTableColumnBuilder Width(string width)
        {
            if (!string.IsNullOrEmpty(width)) _jObject.Add("width", new JValue(width));
            return this;
        }

        public DataTableColumnBuilder AsProgressBar()
        {
            _jObject.Remove("render");
            _jObject.Add("render", new JRaw("$.fn.dataTable.render.percentBar('round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'groove')"));
            return this;
        }

        public DataTableColumnBuilder OrderAsc()
        {
            OrderDirection = "asc";
            return this;
        }

        public DataTableColumnBuilder OrderDesc()
        {
            OrderDirection = "desc";
            return this;
        }

        public DataTableColumnBuilder FormatDate(string format = defaultFormat)
        {
            if (ColumnIsDate == false)
            {
                throw new Exception($"{PropName} is not a Date.");
            }

            _jObject.Remove("render");
            _jObject.Add("render", new JRaw($"function(data, type, row, meta){{return moment(data).format('{format}');}}"));
            return this;
        }

        public override JToken ToJToken()
        {
            return _jObject;
        }
    }
}
