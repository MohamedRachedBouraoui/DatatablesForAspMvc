using Newtonsoft.Json.Linq;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Helpers
{
    /// <summary>
    /// Provides functionalities for Json 
    /// </summary>
    interface IJToken
    {
        /// <summary>
        /// Gets the <see cref="JToken"/> of current instance
        /// </summary>
        /// <returns></returns>
        JToken ToJToken();
    }
}
