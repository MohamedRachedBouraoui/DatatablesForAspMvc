using DemoAspMvcDt.HtmlHelpers.Datatables.Buttons;
using DemoAspMvcDt.HtmlHelpers.Datatables.Column;
using DemoAspMvcDt.HtmlHelpers.Datatables.DataSource;
using DemoAspMvcDt.HtmlHelpers.Datatables.Events;
using System;
using System.Web;
using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Table
{
    /// <summary>
    /// Represents a dataTable builder
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class DataTableBuilder<T> : IHtmlString where T : class
    {
        public TableOptionsFactory<T> TableOptionsFactory { get; private set; }
        public DTableOptions<T> DTableOptions { get; }

        public DataTableDataSourceBuilder DataTableDataSourceBuilder { get; private set; }
        public DataTableEventsFactory DataTableEventsFactory { get; private set; }
        public DataTableColumnsFactory<T> DtaTableColumnsFactory { get; private set; }
        public string TableName { get; }
        public DataTableButtonsFactory DataTableButtonsFactory { get; private set; }
        

        public DataTableBuilder(string name)
        {
            this.DTableOptions = new DTableOptions<T>();
            this.TableName = name;
        }

        #region output
        public string ToHtmlString()
        {
            return DataTableHtmlBuilder<T>.ToHtmlString(this);
        }

        public override string ToString()
        {
            return ToHtmlString();
        }
        #endregion

        public DataTableBuilder<T> TableOptions(Action<TableOptionsFactory<T>> optionsConfig)
        {
            TableOptionsFactory = new TableOptionsFactory<T>();
            optionsConfig(TableOptionsFactory);
            return this;
        }

        public DataTableBuilder<T> SetupColumns(Action<DataTableColumnsFactory<T>> config)
        {
            DtaTableColumnsFactory = new DataTableColumnsFactory<T>();
            config(DtaTableColumnsFactory);
            return this;
        }

        public DataTableBuilder<T> Events(Action<DataTableEventsFactory> config)
        {
            DataTableEventsFactory = new DataTableEventsFactory(TableName);
            config(DataTableEventsFactory);
            return this;
        }

        public DataTableBuilder<T> DataSource(Action<DataTableDataSourceBuilder> config)
        {
            this.DataTableDataSourceBuilder = new DataTableDataSourceBuilder();
            config(this.DataTableDataSourceBuilder);

            return this;
        }
        public DataTableBuilder<T> Buttons(Action<DataTableButtonsFactory> config)
        {
            this.DataTableButtonsFactory = new DataTableButtonsFactory();
            config(this.DataTableButtonsFactory);

            return this;
        }
    }
}
