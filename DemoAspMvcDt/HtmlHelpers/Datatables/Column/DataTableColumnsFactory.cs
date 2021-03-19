using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Reflection;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Column
{
    /// <summary>
    /// Represents a factory of <see cref="DataTableColumnBuilder"/>
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class DataTableColumnsFactory<TModel> : IJToken where TModel : class
    {
        /// <summary>
        /// Initialize a new instance of <see cref="DataTableColumnsFactory{TModel}"/>
        /// </summary>
        public DataTableColumnsFactory()
        {
            this.Columns = new List<DataTableColumnBaseBuilder>();
            IndexesDic = new Dictionary<string, int>();
            _currentColumnIndex = 0;
        }

        /// <summary>
        /// Gets the list of columns
        /// </summary>
        internal List<DataTableColumnBaseBuilder> Columns { get; }
        //internal List<DataTableColumnBuilder> Columns { get; }
        //internal List<DataTableCommandBuilder> Commands { get; }
        public Dictionary<string, int> IndexesDic { get; private set; }

        private int _currentColumnIndex;

        ///// <summary>
        ///// Add a column to the factory
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <returns></returns>
        //public DataTableColumnBuilder Add<T>()
        //{
        //    DataTableColumnBuilder column = new DataTableColumnBuilder();
        //    this.Columns.Add(column);
        //    return column;
        //}


        /// <summary>
        /// Add a column to the factory
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public DataTableColumnBuilder ColumnFor<T>(Expression<Func<TModel, T>> expression)
        {
            var propertyInfo = PropertyHelpers.GetPropertyInfo(expression);

            if (IndexesDic.ContainsKey(propertyInfo.Name))
            {
                throw new Exception($"Column {propertyInfo.Name} is already Set.");
            }
            IndexesDic[propertyInfo.Name] = _currentColumnIndex++;
            DataTableColumnBuilder column = new DataTableColumnBuilder(propertyInfo)
            {
                Expression = expression, // TODO: try use  InputExtensions.HiddenFor()
            };

            //ViewContext viewContext = htmlHelper.ViewContext;
            // viewContext.ViewData.Model = 
            //System.Web.Mvc.HtmlHelper<TModel> htmlHelper2 = new HtmlHelper<TModel>(htmlHelper.ViewContext, htmlHelper.ViewDataContainer);// htmlHelper;
            //var result=InputExtensions.HiddenFor(htmlHelper2, expression).ToHtmlString();
            column.Type(GetType(propertyInfo));
            this.Columns.Add(column);
            return column;
        }

        private static string GetType(PropertyInfo propertyInfo)
        {
            var propType = propertyInfo.PropertyType.Name;

            switch (propType)
            {
                case nameof(DateTime):
                    return "date";

                case nameof(Boolean):
                    return "bool";

                case nameof(Decimal):
                case nameof(Int32):
                case nameof(Int16):
                case nameof(Int64):
                case nameof(Double):
                    return "number";
                default:
                    return "text";
            }
        }

        public DataTableColumnBuilder ColumnFor(string propName)
        {

            if (IndexesDic.ContainsKey(propName))
            {
                throw new Exception($"Column {propName} is already Set.");
            }
            IndexesDic[propName] = _currentColumnIndex++;
            DataTableColumnBuilder column = new DataTableColumnBuilder(propName);
            this.Columns.Add(column);
            return column;
        }
        public DataTableCommandBuilder SetColumnAsCheckBox(string id)
        {
            // I will allow multi checkboxes

            //if (IndexesDic.ContainsKey("CheckBoxColumn"))
            //{
            //    throw new Exception($"CheckBoxColumn is already Set.");
            //}

            //IndexesDic["CheckBoxColumn"] = _currentColumnIndex++;


            _currentColumnIndex++;

            DataTableCommandBuilder cmd = new DataTableCommandBuilder();

            cmd.SetCheckBoxColumn(id);
            this.Columns.Add(cmd);
            return cmd;
        }

        /// <summary>
        /// Add a column as a command to the factory
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public DataTableCommandBuilder SetColumnAsCommand(Func<string> render)
        {
            DataTableCommandBuilder cmd = new DataTableCommandBuilder();
            cmd.Command(render);
            this.Columns.Add(cmd);
            return cmd;
        }

        public DataTableCommandEditBuilder AddEditRowcCmd(string popupTitle)
        {
            DataTableCommandEditBuilder cmd = new DataTableCommandEditBuilder(popupTitle);
            this.Columns.Add(cmd);
            return cmd;
        }

        /// <summary>
        /// Gets the <see cref="JToken"/> of current instance
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public JToken ToJToken()
        {
            JArray jArray = new JArray();
            foreach (var c in Columns)
            {
                jArray.Add(c.ToJToken());
            }

            //foreach (var cmd in Commands)
            //{
            //    jArray.Add(cmd.ToJToken());
            //}
            return jArray;
        }

        public JToken BuildOrdersJToken()
        {
            //"order": [[ 0, "desc" ], [ 2, "desc" ]]
            JArray jArray = new JArray();

            for (int i = 0; i < Columns.Count; i++)
            {
                if (!string.IsNullOrEmpty(Columns[i].OrderDirection))
                {
                    jArray.Add(new JArray(new JValue(i), new JValue(Columns[i].OrderDirection)));
                }
            }
            return jArray;
        }
    }
}
