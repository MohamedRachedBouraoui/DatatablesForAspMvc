using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace DemoAspMvcDt.HtmlHelpers
{
    public class CheckBoxBuilder<TModel> : IHtmlString where TModel : class
    {
        private string _text;
        private bool _isActive;
        private string _isActiveText;
        private bool _isChecked;
        private string _isCheckedText;

        public HtmlHelper<TModel> htmlHelper { get; set; }

        public CheckBoxBuilder(HtmlHelper<TModel> htmlHelper1)
        {
            this.htmlHelper = htmlHelper1;
            _isActive = true;
        }

        public string ToHtmlString()
        {
            
          return   $@"<div class='col-md-8 col-md-offset-2'>
                  <input type ='checkbox' id='_vehicle1' name = '_vehicle1' {_isActiveText} value = '{_text}' {_isCheckedText} >                   
                           <label for= 'vehicle1'> {_text} </label><br>                    
               </div>";
        }

        public CheckBoxBuilder<TModel> Text(string text)
        {
            _text = text;
            return this;
        }

        public CheckBoxBuilder<TModel> Deactivate()
        {
            _isActive = false;
            _isActiveText = " disabled";
            return this;
        }
        public CheckBoxBuilder<TModel> Checked()
        {
            _isChecked = true;
            _isCheckedText = " checked";
            return this;
        }
    }
}
