using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System;
using System.Linq.Expressions;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Table
{
    public class TableOptionsFactory<TModel> : IJToken
    {
        private readonly JObject _jObject;

        public bool ShowTableFooter { get; private set; }
        public bool HasDefaultSettings { get; private set; }
        public bool HasClassName { get; private set; }
        public string ClassName { get; private set; }
        public string DefaultSettings { get; private set; }
        public bool DoCreateApiInstance { get; private set; }
        public string DtApiInstanceName { get; private set; }
        public string TableDefaultDatesFormat { get; private set; }

        public TableOptionsFactory()
        {
            _jObject = new JObject();
            TableDefaultDatesFormat = "YYYY-MM-DD";
        }

        /// <summary>
        /// Define the table control elements to appear on the page and in what order.
        /// </summary>
        /// <param name="dom"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> Dom(string dom)
        {
            _jObject.Add("dom", new JValue(dom));
            return this;
        }

        public TableOptionsFactory<TModel> EnableSearchHighlighting()
        {
            _jObject.Add("searchHighlight", new JValue(true));

            return this;
        }

        /// <summary>
        /// Feature control DataTables' smart column width handling.
        /// </summary>
        /// <param name="autoWidth"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisableColumnsAutoWidth()
        {
            _jObject.Add("autoWidth", new JValue(false));
            return this;
        }

        /// <summary>
        /// Feature control deferred rendering for additional speed of initialisation.
        /// </summary>
        /// <param name="deferRender"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableDeferRendering()
        {
            _jObject.Add("deferRender", new JValue(true));
            return this;
        }


        /// <summary>
        /// State saving - restore table state on page reload.
        /// </summary>
        /// <param name="stateSave"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableStateSaving()
        {
            _jObject.Add("stateSave", new JValue(true));
            return this;
        }

        /// <summary>
        /// Feature control search (filtering) abilities.
        /// </summary>
        /// <param name="searching"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisableSearching()
        {
            _jObject.Add("searching", new JValue(false));
            return this;
        }

        /// <summary>
        /// Enable or disable table pagination.
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisablePaging()
        {
            _jObject.Add("paging", new JValue(false));
            return this;
        }

        /// <summary>
        /// Pagination button display options.
        /// </summary>
        /// <param name="pagingType"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> PagingType(PagingType pagingType)
        {
            _jObject.Add($"pagingType", new JValue(pagingType.ToString().ToLower()));
            return this;
        }

        /// <summary>
        /// Feature control ordering (sorting) abilities in DataTables.
        /// </summary>
        /// <param name="ordering"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisableOrdering()
        {
            _jObject.Add("ordering", new JValue(false));
            return this;
        }

        /// <summary>
        /// Feature control table information display field.
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisableInfoDisplaying()
        {
            _jObject.Add("info", new JValue(false));
            return this;
        }

        /// <summary>
        /// Multiple column ordering ability control.
        /// </summary>
        /// <param name="orderMulti"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisableOrderMulti()
        {
            _jObject.Add("orderMulti", new JValue(false));
            return this;
        }

        /// <summary>
        /// Data property name that DataTables will use to set tr element DOM IDs.
        /// </summary>
        /// <param name="rowId"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> RowId<T>(Expression<Func<TModel, T>> expression)
        {
            var propertyInfo = PropertyHelpers.GetPropertyInfo(expression);
            _jObject.Add("rowId", new JValue(propertyInfo.Name));
            return this;
        }
        
        public TableOptionsFactory<TModel> GoupBy<T>(Expression<Func<TModel, T>> expression)
        {
            var propertyInfo = PropertyHelpers.GetPropertyInfo(expression);
            _jObject.Remove("rowGroup");
            _jObject.Add("rowGroup", new JObject
            {                
                { "dataSrc", new JValue(propertyInfo.Name) }
            });
            return this;
        }

        public TableOptionsFactory<TModel> RowId(string propName)
        {
            _jObject.Add("rowId", new JValue(propName));
            return this;
        }

        /// <summary>
        /// Allow the table to reduce in height when a limited number of rows are shown.
        /// </summary>
        /// <param name="scrollCollapse"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableScrollCollapse()
        {
            _jObject.Add("scrollCollapse", new JValue(true));
            return this;
        }

        /// <summary>
        /// Horizontal scrolling.
        /// </summary>
        /// <param name="scrollX"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableScrollX()
        {
            _jObject.Add("scrollX", new JValue(true));
            return this;
        }

        /// <summary>
        /// Vertical scrolling.
        /// </summary>
        /// <param name="scrollY"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableYScrolling(string scrollY)
        {
            _jObject.Add($"scrollY", new JValue(scrollY));
            return this;
        }

        /// <summary>
        /// Feature control the processing indicator.
        /// </summary>
        /// <param name="processing"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisplayProcessingMessage()
        {
            _jObject.Add("processing", new JValue(true));
            return this;
        }

        /// <summary>
        /// Feature control DataTables' server-side processing mode.
        /// </summary>
        /// <param name="serverSide"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> EnableServerSideProcessing()
        {
            _jObject.Add("serverSide", new JValue(true));
            return this;
        }

        /// <summary>
        /// Change the options in the page length select list.
        /// </summary>
        /// <param name="config"></param>
        /// <returns></returns>
        public TableOptionsFactory<TModel> SetupPagingLengthMenu(Action<LengthMenuBuilder> config)
        {
            LengthMenuBuilder lengthMenuBuilder = new LengthMenuBuilder();
            config(lengthMenuBuilder);

            _jObject.Add("lengthMenu", lengthMenuBuilder.ToJToken());
            return this;
        }

        public TableOptionsFactory<TModel> EnableColReordering(int fixedColumnsLeft = 0, int fixedColumnsRight = 0)
        {

            _jObject.Add("colReorder", new JObject
            {
                { "fixedColumnsLeft", new JValue(fixedColumnsLeft) },
                { "fixedColumnsRight", new JValue(fixedColumnsRight) }
            });
            return this;
        }

        public TableOptionsFactory<TModel> EnableFixedColumns()
        {

            _jObject.Add("fixedColumns", new JValue(true));
            return this;
        }
        public TableOptionsFactory<TModel> EnableFixedHeaders()
        {
            var jObject = new JObject
            {
                { "header", new JValue(true) },
                { "footer", new JValue(true) }
            };

            _jObject.Add("fixedHeader", jObject);
            return this;
        }

        /// <summary>
        /// Show table footer.
        /// </summary>
        /// <returns></returns>
        public TableOptionsFactory<TModel> DisplayFooters()
        {
            ShowTableFooter = true;
            return this;
        }

        public TableOptionsFactory<TModel> AddDefaultSettings(string defaults)
        {
            HasDefaultSettings = true;
            DefaultSettings = defaults;
            return this;
        }

        public TableOptionsFactory<TModel> OnInitComplet(string func)
        {
            _jObject.Add("initComplete", new JRaw($"function(){{ {func}(this.api());}}"));
            return this;
        }



        public TableOptionsFactory<TModel> SetClassName(string className)
        {
            HasClassName = true;
            ClassName = className;

            return this;
        }

        public TableOptionsFactory<TModel> CreateApiInstance(string apiName)
        {
            DoCreateApiInstance = true;
            DtApiInstanceName = apiName;

            return this;
        }

        public TableOptionsFactory<TModel> DefaultDatesFormat(string datesFormat)
        {
            TableDefaultDatesFormat = datesFormat;

            return this;
        }

        public JToken ToJToken()
        {
            return _jObject;
        }
    }
}