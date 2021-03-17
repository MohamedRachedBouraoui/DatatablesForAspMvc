using DemoAspMvcDt.HtmlHelpers.Datatables.Helpers;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.ComponentModel;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.DataSource
{
    /// <summary>
    /// Represents the grid datasource
    /// </summary>
    public class DataTableDataSourceBuilder : IJToken
    {
        private string tableName;

        public DataTableDataSourceBuilder(string tableName)
        {
            this.tableName = tableName;
        }

        public IEnumerable<object> Items { get; private set; }
        public bool IsUsedInForm { get; private set; }
        public bool SubmitWithMultiHiddenInputs { get; private set; }
        public string PrefixForMultiHiddenInputs { get; private set; }
        public string StringPropNameForSubmittedValues { get; private set; }
        public string FormId { get; private set; }
        public AjaxBuilder AjaxBuilder { get; private set; }
        public bool IsSubmitOnlyNewAndModifiedRows { get; private set; }


        /// <summary>
        /// Initialize a new instance of <see cref="DataSource.AjaxBuilder"/>
        /// </summary>
        /// <returns></returns>
        public AjaxBuilder HandleDataByAjax(string url)
        {
            //Items = null;
            this.AjaxBuilder = new AjaxBuilder(url, tableName);
            return this.AjaxBuilder;
        }

        public DataTableDataSourceBuilder Data(IEnumerable<object> items)
        {
            //AjaxBuilder = null;
            Items = items;
            return this;
        }

        public DataTableDataSourceBuilder SubmitDataAsJson(string stringPropNameForSubmittedValues, string formId)
        {
            this.IsUsedInForm = true;
            this.SubmitWithMultiHiddenInputs = false;
            this.StringPropNameForSubmittedValues = stringPropNameForSubmittedValues;
            this.FormId = formId;
            return this;
        }

        public DataTableDataSourceBuilder SubmitDataWithMultipleHiddenInputs(string prefixForMultiHiddenInputs ="", string formId ="")
        {
            this.IsUsedInForm = true;
            this.SubmitWithMultiHiddenInputs = true;
            this.PrefixForMultiHiddenInputs = prefixForMultiHiddenInputs ;
            this.FormId = formId ;
            return this;
        }

        public DataTableDataSourceBuilder SubmitOnlyNewAndModifiedRows()
        {
            this.IsSubmitOnlyNewAndModifiedRows = true;

            return this;
        }

        /// <summary>
        /// Gets the <see cref="JToken"/> of current instance
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public JToken ToJToken()
        {
            return this.AjaxBuilder.ToJToken();
        }
    }
}
