using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DemoAspMvcDt.Models
{
    public class CountryVm
    {
        public int Id { get; set; }
        public List<Person> People { get; set; }
        private string listItems;
        public string list_items 
        {
            get
            {
                return listItems;
            }
            set
            {
                listItems = value;
                People =  JsonConvert.DeserializeObject<List<Person>>(value);
            }
        }

        [Required]
        public string Name { get; set; }
        public bool AfficherDate { get; set; }
    }
}
