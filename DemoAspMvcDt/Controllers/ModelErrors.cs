using System.Collections.Generic;
using System.Linq;


namespace DemoAspMvcDt.Controllers
{
    public class ModelErrors
    {
        //Usage return Json to View :
        //return Json(new { state = false, message = new GetModelErrors(ModelState).MessagesWithKeys() });


        private readonly System.Web.Mvc.ModelStateDictionary _entry;
        public ModelErrors(System.Web.Mvc.ModelStateDictionary entry)
        {
            _entry = entry;
        }

        public int Count()
        {
            return _entry.Values.Select(e=>e.Errors).Count();
        }
        public string Exceptions(string sp = "\n")
        {
            return string.Join(sp, _entry.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.Exception));
        }
        public string Messages(string sp = "\n")
        {
            string msg = string.Empty;
            foreach (var item in _entry)
            {
                if (item.Value.Errors.Count > 0)
                {
                    msg += string.Join(sp, string.Join(",", item.Value.Errors.Select(i => i.ErrorMessage)));
                }
            }
            return msg;
        }

        public  List<KeyMessages> MessagesWithKeys(string sp = "<p> ● ")
        {
            List<KeyMessages> list = new List<KeyMessages>();
            foreach (var item in _entry)
            {
                if (item.Value.Errors.Count>0)
                {
                    list.Add(new KeyMessages
                    {
                        Key = item.Key,
                        Message = string.Join(null, item.Value.Errors.Select(i => sp + i.ErrorMessage))
                    });
                }
            }
            return list;
        }
    }
    public class KeyMessages
    {
        public string Key { get; set; }
        public string Message { get; set; }
    }
}
