using DemoAspMvcDt.HtmlHelpers.Datatables.Column;
using DemoAspMvcDt.HtmlHelpers.Datatables.RazorExtension;
using DemoAspMvcDt.HtmlHelpers.Datatables.Table;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Web;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.RazorExtension
{
    public class DtModel
    {
        #region props
        public string TableName { get; private set; }
        public string IdOfHiddenInputHoldingTableData { get; private set; }
        public string NameAttributeForHiddenInputHoldingTableData { get; private set; }
        public string TableClassName { get; private set; }
        public string IsDtAjaxLoadingDefferd { get; private set; }
        public string CustomConfigValues { get; private set; }
        public bool HasDefaultSettings { get; private set; }
        public string DefaultConfigValues { get; private set; }
        public bool DoCreateDtApiInstance { get; private set; }
        public string DtApiInstanceName { get; private set; }
        public bool HasCheckBoxColumn { get; private set; }
        public bool IsUsedInForm { get; private set; }
        public string FormId { get; private set; }
        public bool SubmitWithMultiHiddenInputs { get; private set; }
        public string PrefixForMultiHiddenInputs { get; private set; }
        public string NativeEvents { get; private set; }
        public bool HasClickEvents { get; private set; }
        public string ClickEvents { get; private set; }
        public bool IsSubmitOnlyNewAndModifiedRows { get; private set; }

        public string TableDefaultDatesFormat { get; private set; }
        public bool HasEditRowCommand { get; private set; }
        public string EditPopupTitle { get; private set; }
        public bool FetchEditViewFromServerSide { get; private set; }
        public string FetchEditViewFromUrl { get; private set; }
        public string ValidateEditViewByUrl { get; private set; }

        #endregion

        public override string ToString()
        {
            string html = ViewRenderer.ConvertirVueString("~/HtmlHelpers/Datatables/RazorExtension/views/DtJs.cshtml", this);
            html = html.Replace("<script>", "").Replace("</script>", "");
            string jsMified = new Minifier().MinifyJavaScript(html);

            //return html;
            // return $"<div id='div__dt__{TableName}'><script>{html}</script></div>";
            //var result= $"<div id='div__dt__{TableName}'><script>{jsMified}</script></div>";
            //return $"<script>{jsMified}</script>";


            //create a script file on the server and Return an script tag 
            string jsPath = $"Scripts/{TableName}.js";
            FileInfo jsFileInfo = new FileInfo(HttpContext.Current.Server.MapPath($"~/{jsPath}"));


            using (StreamWriter sw = new StreamWriter(jsFileInfo.FullName))
            {
                sw.WriteLine(html); // Write the file.
                //sw.WriteLine(jsMified); // Write the file.
            }
            //TODO: think of reusing same file if not modified
            var result = $"<div id='div__dt__{TableName}'><script src='{jsPath}?v={DateTime.Now.Ticks}'></script></div>";//Use ?v toget latest version
            return result;
        }
        internal static DtModel InitInstance<T>(DataTableBuilder<T> dtBuilder) where T : class
        {

            var dtModel = new DtModel
            {
                TableName = dtBuilder.TableName,

                TableClassName = $"{(dtBuilder.TableOptionsFactory.HasClassName ? $" {dtBuilder.TableOptionsFactory.ClassName}" : string.Empty)}",

                IdOfHiddenInputHoldingTableData = $"dt_{dtBuilder.TableName}_data",

                IsDtAjaxLoadingDefferd = "false",

                TableDefaultDatesFormat = dtBuilder.TableOptionsFactory.TableDefaultDatesFormat
            };

            if (dtBuilder.TableOptionsFactory.DoCreateApiInstance)
            {
                dtModel.DoCreateDtApiInstance = true;
                dtModel.DtApiInstanceName = dtBuilder.TableOptionsFactory.DtApiInstanceName;
            }

            InitDataTableConfig<T>(dtBuilder, dtModel);
            InitFormConfig(dtBuilder, dtModel);
            InitNativeDtEventsConfig(dtBuilder, dtModel);
            InitOnClickEventsConfig(dtBuilder, dtModel);

            return dtModel;
        }

        #region Init
        private static void InitOnClickEventsConfig<T>(DataTableBuilder<T> dtBuilder, DtModel dtModel) where T : class
        {
            if (dtBuilder.DtaTableColumnsFactory.Columns.Any(c => !string.IsNullOrEmpty(c.Click)))
            {
                dtModel.HasClickEvents = true;
                dtModel.ClickEvents = string.Join(",", dtBuilder.DtaTableColumnsFactory.Columns.Select(e => e.Click));
            }
        }
        private static void InitNativeDtEventsConfig<T>(DataTableBuilder<T> dtBuilder, DtModel dtModel) where T : class
        {
            if (dtBuilder.DataTableEventsFactory != null)
            {
                dtModel.NativeEvents = dtBuilder.DataTableEventsFactory.ToString();
            }

            if (dtBuilder.DtaTableColumnsFactory.Columns.Any(c => c.IsCheckBoxColumn))
            {
                dtModel.HasCheckBoxColumn = true;
            }
            if (dtBuilder.DtaTableColumnsFactory.Columns.Any(c => c.IsEditRowCommand))
            {
                DataTableCommandEditBuilder dtCommandEditBuilder = ((DataTableCommandEditBuilder)dtBuilder.DtaTableColumnsFactory.Columns.First(c => c.IsEditRowCommand));

                dtModel.HasEditRowCommand = true;
                dtModel.EditPopupTitle = dtCommandEditBuilder.EditPopupTitle;
                dtModel.FetchEditViewFromServerSide = dtCommandEditBuilder.IsServerSide;
                dtModel.FetchEditViewFromUrl = dtCommandEditBuilder.FetchViewFromUrl;
                dtModel.ValidateEditViewByUrl = dtCommandEditBuilder.ValidateByUrl;
            }
        }
        private static void InitFormConfig<T>(DataTableBuilder<T> dtBuilder, DtModel dtModel) where T : class
        {
            if (!dtBuilder.DataTableDataSourceBuilder.IsUsedInForm)
            {
                return;
            }

            dtModel.IsUsedInForm = true;
            dtModel.FormId = dtBuilder.DataTableDataSourceBuilder.FormId;

            if (dtBuilder.DataTableDataSourceBuilder.SubmitWithMultiHiddenInputs)
            {
                dtModel.SubmitWithMultiHiddenInputs = true;
                dtModel.PrefixForMultiHiddenInputs = dtBuilder.DataTableDataSourceBuilder.PrefixForMultiHiddenInputs;
            }
            else // A single hiden input that will hold all values as json
            {
                dtModel.NameAttributeForHiddenInputHoldingTableData = $"name='{dtBuilder.DataTableDataSourceBuilder.StringPropNameForSubmittedValues}'";
            }

            if (dtBuilder.DataTableDataSourceBuilder.IsSubmitOnlyNewAndModifiedRows)
            {
                dtModel.IsSubmitOnlyNewAndModifiedRows = true;
            }
        }

        private static void InitDataTableConfig<T>(DataTableBuilder<T> dtBuilder, DtModel dtModel) where T : class
        {
            JObject jObject = new JObject();


            //Table Options
            if (dtBuilder.TableOptionsFactory != null)
            {
                jObject = (JObject)dtBuilder.TableOptionsFactory.ToJToken();
            }

            // Columns
            if (dtBuilder.DtaTableColumnsFactory != null)
            {
                jObject.Add("columns", dtBuilder.DtaTableColumnsFactory.ToJToken());
                var columnsWithOrder = dtBuilder.DtaTableColumnsFactory.Columns.Where(c => !string.IsNullOrEmpty(c.OrderDirection)).ToList();
                if (columnsWithOrder != null && columnsWithOrder.Any())
                {
                    jObject.Add("order", dtBuilder.DtaTableColumnsFactory.BuildOrdersJToken());
                }
            }

            //Select
            //if (dtBuilder.DtaTableColumnsFactory.Columns.Any(c => c.IsCheckBoxColumn))
            //{
            //    jObject.Add("select", new JObject
            //        {
            //            { "style", new JValue("multi") }
            //        });

            //}

            //Buttons
            if (dtBuilder.DataTableButtonsFactory != null && dtBuilder.DataTableButtonsFactory.Buttons.Any())
            {
                jObject.Add("buttons", dtBuilder.DataTableButtonsFactory.ToJToken());

            }

            //Ajax
            if (dtBuilder.DataTableDataSourceBuilder != null && dtBuilder.DataTableDataSourceBuilder.AjaxBuilder != null)
            {
                jObject.Add("ajax", new JRaw($@"function (data, callback, settings) {{ DtAjaxHelper.setAjaxForDt(data, callback, settings,{dtBuilder.DataTableDataSourceBuilder.ToJToken()},module_{dtModel.TableName});}}"));
            }

            //Pour intialiser la datasource par les items du Model (note: problème avec le html)
            if (dtBuilder.DataTableDataSourceBuilder != null
                && dtBuilder.DataTableDataSourceBuilder.Items != null
                && dtBuilder.DataTableDataSourceBuilder.Items.Any())
            {
                var items = JsonConvert.SerializeObject(dtBuilder.DataTableDataSourceBuilder.Items, new JsonSerializerSettings
                {
                    DateFormatString = dtModel.TableDefaultDatesFormat.ToLower()
                });

                jObject.Add("data", new JRaw(items));
            }

            dtModel.CustomConfigValues = jObject.ToString(Newtonsoft.Json.Formatting.None);

            if (dtBuilder.DataTableDataSourceBuilder != null
                && dtBuilder.DataTableDataSourceBuilder.AjaxBuilder != null
                && dtBuilder.DataTableDataSourceBuilder.AjaxBuilder.IsDtAjaxLoadingDefferd)
            {
                dtModel.IsDtAjaxLoadingDefferd = "true";
            }

            if (dtBuilder.TableOptionsFactory.HasDefaultSettings)
            {
                dtModel.HasDefaultSettings = true;
                dtModel.DefaultConfigValues = dtBuilder.TableOptionsFactory.DefaultSettings;
            }
        }
        #endregion
    }
}
