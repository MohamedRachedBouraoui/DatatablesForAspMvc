using Bogus;
using DemoAspMvcDt.HtmlHelpers.Datatables.ServerSide;
using DemoAspMvcDt.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Person = DemoAspMvcDt.Models.Person;

namespace DemoAspMvcDt.Controllers
{
    public class HomeController : Controller
    {

        [HttpPost]
        public ActionResult AddPerson(Person person)
        {
            if (ModelState.IsValid == false)
            {
                return RedirectToAction(nameof(Index));
            }
            return RedirectToAction(nameof(Index));
        }


        public ActionResult GetPersonEditView(Person person)
        {
            return PartialView("_PersonEditView", person);
        }

        public ActionResult ValidateEditPersonEdit(Person person)
        {
            //var html = ConvertirVueString("_PersonEditView", person);
            JsonSerializerSettings sets = new JsonSerializerSettings
            {
                PreserveReferencesHandling = PreserveReferencesHandling.Objects
            };

            var errors = new ModelErrors(ModelState).MessagesWithKeys();
           // var errors = JsonConvert.SerializeObject(ModelState.Values.Select(m => m.Errors).Where(e => e.Count > 0), sets);

            return ModelState.IsValid ?
                Json(new { success = true }, JsonRequestBehavior.AllowGet)
                : Json(new { success = false, errors }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Index()
        {
            ViewBag.AfficherDate = false;
            List<Person> people = BuildPeopleList();
            return View(new CountryVm { Id = 1, Name = "CountryVm_name", People = people });
        }

        //public ActionResult Hello(List<Person> vm)
        public ActionResult Hello(CountryVm vm)
        {

            return RedirectToAction(nameof(Index));
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        //public JsonResult GetPeople(DataTablesRequest request, bool afficherDate, string status)
        public JsonResult GetPeople(string status, bool afficherDate = false)
        {
            List<Person> people = BuildPeopleList();

            int recordsTotal = people.Count;
            int recordsFilterd = recordsTotal;

            if (afficherDate)
            {
                // people = people.Skip(request.Start).Take(request.Length==-1?people.Count: request.Length).ToList();
                people = people.Where(p => p.Age % 2 == 0).ToList();
            }

            //var result = people.ToDataTablesResponse(request, recordsTotal, recordsFilterd);
            //return Json(result,JsonRequestBehavior.AllowGet);
            return Json(new
            {
                data = people
            }, JsonRequestBehavior.AllowGet);
        }

        private static List<Person> BuildPeopleList()
        {
            List<bool> civil = new List<bool> { true, false };
            var people = new List<Person>();
            int userIds = 1;
            for (int i = 0; i < 5; i++)
            {
                var fakePerson = new Faker<Person>()
                 .RuleFor(u => u.Identifiant, f => userIds++)
                 .RuleFor(u => u.Name, (f, u) => f.Name.FirstName())
                 .RuleFor(u => u.DOB, (f, u) => f.Date.Past())
                 .RuleFor(u => u.Age, f => f.Random.Number(0, 100))
                 .RuleFor(o => o.IsMaried, f => f.PickRandom(civil))
                 .RuleFor(o => o.CheckBox1, f => f.PickRandom(civil))
                 .RuleFor(o => o.CheckBox2, f => f.PickRandom(civil))
                 .RuleFor(u => u.Progress, f => f.Random.Number(0, 100).ToString());
                people.Add(fakePerson.Generate());
            }
            return people;
        }


        private string ConvertirVueString<TModel>(string cheminVue, TModel model)
        {
            ViewData.Model = model;
            using (StringWriter writer = new StringWriter())
            {
                ViewEngineResult vResult = ViewEngines.Engines.FindPartialView(ControllerContext, cheminVue);
                ViewContext vContext = new ViewContext(this.ControllerContext, vResult.View, ViewData, new TempDataDictionary(), writer);
                vResult.View.Render(vContext, writer);
                return writer.ToString();
            }
        }
    }
}