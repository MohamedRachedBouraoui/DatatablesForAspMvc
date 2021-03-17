using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace DemoAspMvcDt.Controllers
{
    public class JsonNetResult : JsonResult
    {
        public object data { get; set; }//the object to be serialized in JSON format

        public JsonNetResult()
        {
        }

        public override void ExecuteResult(ControllerContext context)
        {
            HttpResponseBase response = context.HttpContext.Response;
            response.ContentType = "application/json";
            if (ContentEncoding != null)
                response.ContentEncoding = ContentEncoding;
            if (data != null)
            {
                JsonTextWriter writer = new JsonTextWriter(response.Output) { Formatting = Formatting.Indented };
                JsonSerializer serializer = JsonSerializer.Create(new JsonSerializerSettings());
                serializer.Serialize(writer, data);
                writer.Flush();
            }
        }
    }
}
