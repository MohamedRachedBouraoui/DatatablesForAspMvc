using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.DataSource
{
    /// <summary>
    /// Represents a builder for ajax options
    /// </summary>
    public class AjaxBuilder : IJToken
    {
        private readonly string tableName;

        public JObject jObject { get; set; }
        public bool IsDtAjaxLoadingDefferd { get; internal set; }

        /// <summary>
        /// Initialize a new instance of <see cref="AjaxBuilder"/>
        /// </summary>
        public AjaxBuilder(string url, string tableName)
        {
            jObject = new JObject()
            {                
                { "url", new JValue(url) },
                { "method", new JValue("POST")},
                { "success", new JRaw($"function(data){{DtDatesHelper.dtConvertDates(data,$('#{tableName}').attr('default_date_time_format')); callback(data);}}") }
        };
            this.tableName = tableName;
        }

        /// <summary>
        /// Sets the ajax method
        /// </summary>
        /// <param name="method"></param>
        /// <returns></returns>
        public AjaxBuilder UseGetMethod()
        {
            jObject.Remove("method");
            jObject.Add("method", new JValue("GET"));
            return this;
        }

        /// <summary>
        /// Sets the ajax method
        /// </summary>
        /// <param name="method"></param>
        /// <returns></returns>
        public AjaxBuilder UsePostMethod()
        {
            jObject.Remove("method");
            jObject.Add("method", new JValue("POST"));
            return this;
        }

        /// <summary>
        /// Data property or manipulation method for table data.
        /// </summary>
        /// <param name="dataSrc"></param>
        /// <returns></returns>
        public AjaxBuilder DataSrc(string dataSrc)
        {
            if (dataSrc != null)
            {
                jObject.Add("dataSrc", new JValue(dataSrc));
            }
            return this;
        }


        public AjaxBuilder ToSetAdditionalDataUse(string dataSrcFunc)
        {
            //jObject.Add("data", new JRaw($"{dataSrcFunc}()"));
            jObject.Add("data", new JRaw($"{dataSrcFunc}(data)"));
            return this;
        }

        public AjaxBuilder OnRequestSending(string beforeSendFunc)
        {
            jObject.Add("beforeSend", new JRaw($"function(xhr, opts){{ {beforeSendFunc}(xhr, opts);}}"));
            return this;
        }

        public AjaxBuilder OnRequestSuccess(string onSuccessFumctionFunc)
        {
            jObject.Remove("success");
            jObject.Add("success", new JRaw($"function(data){{  DtDatesHelper.dtConvertDates(data,$('#{tableName}').attr('default_date_time_format')); callback(data);{onSuccessFumctionFunc}(data);}}"));
            return this;
        }

        public AjaxBuilder OnRequestFail(string onErrorFunction)
        {
            jObject.Add("error", new JRaw($"function(event){{ {onErrorFunction}(event);}}"));
            return this;
        }

        public AjaxBuilder DeferLoading()
        {
            IsDtAjaxLoadingDefferd = true;
            return this;
        }

        public JToken ToJToken()
        {
            return jObject;
        }
    }
}