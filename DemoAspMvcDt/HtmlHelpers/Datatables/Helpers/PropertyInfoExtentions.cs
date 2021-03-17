using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Helpers
{
    public static class PropertyInfoExtentions
    {
        /// <summary>
        /// Retrieve the json property name of <see cref="PropertyInfo"/>
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns></returns>
        public static string GetPropertyName(this PropertyInfo propertyInfo)
        {
            if (propertyInfo == null) throw new ArgumentNullException(nameof(propertyInfo));

            var jsonProperty = propertyInfo.GetCustomAttribute<JsonPropertyAttribute>();
            if (jsonProperty != null && !string.IsNullOrEmpty(jsonProperty.PropertyName))
            {
                return jsonProperty.PropertyName;
            }
            return propertyInfo.Name;
        }

        public static string GetDisplayValue(this PropertyInfo propertyInfo)
        {
            var attr = propertyInfo.GetCustomAttributes(typeof(DisplayAttribute), true).FirstOrDefault() as DisplayAttribute;
            return attr != null ? attr.Name : propertyInfo.Name;
        }
    }
}
