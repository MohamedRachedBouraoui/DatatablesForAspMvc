using System;
using System.Text;
using System.Web;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Table
{
    /// <summary>
    /// Represents a dataTable builder
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class DefaultDataTableBuilder<T> : IHtmlString where T : class
    {
        private string name;

        public DefaultDataTableBuilder(string name)
        {
            this.name = name;
        }
        public string ToHtmlString()
        {
            StringBuilder sb = new StringBuilder();

            if (string.IsNullOrEmpty(this.name)) throw new ArgumentException("Name property required on grid.");

            // Datables.Net
            sb.Append($@"<script>$(function(){{var g=$('#{this.name}');var dt=g.DataTable();}});</script>");

            string resultat = sb.ToString();
            return resultat;
        }


        public override string ToString()
        {
            return ToHtmlString();
        }
    }
}
