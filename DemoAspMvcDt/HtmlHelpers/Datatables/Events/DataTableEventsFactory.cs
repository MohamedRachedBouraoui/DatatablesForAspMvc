using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.Events
{
    public class DataTableEventsFactory
    {

        Dictionary<string, IList<string>> events;
        Dictionary<string, IList<string>> selectEvents;

        private string _tableName;

        public DataTableEventsFactory(string tableName)
        {
            _tableName = tableName;
            this.events = new Dictionary<string, IList<string>>();
            this.selectEvents = new Dictionary<string, IList<string>>();
        }

        /// <summary>
        /// Adds or updates the event in events list
        /// </summary>
        /// <param name="key"></param>
        /// <param name="parameters"></param>
        /// <param name="fn"></param>
        private void Add(string key, string parameters, string fn)
        {
            if (!this.events.ContainsKey(key))
            {
                this.events.Add(key, new List<string>());
                this.events[key].Add(parameters);
            }
            this.events[key].Add(fn);
        }

        private void AddSelection(string key, string parameters, string fn)
        {
            if (!this.selectEvents.ContainsKey(key))
            {
                this.selectEvents.Add(key, new List<string>());
                this.selectEvents[key].Add(parameters);
            }
            this.selectEvents[key].Add(fn);
        }
        public void WhenARowIsAddedThenInvoke(string func)
        {
            this.Add("new_row_added.dt", "(e)", func);
        }
        public void BeforeAddingARowInvoke(string func)
        {
            this.Add("new_row_adding.dt", "(e)", func);
        }

        public void BeforeRemovingARowInvoke(string func)
        {
            this.Add("row_removing.dt", "(e)", func);
        }
        public void WhenARowIsRemovedThenInvoke(string func)
        {
            this.Add("row_removed.dt", "(e)", func);
        }
        public void BeforeUpdatingARowInvoke(string func)
        {
            this.Add("row_updating.dt", "(e)", func);
        }
        public void WhenARowIsUpdatedThenInvoke(string func)
        {
            this.Add("row_updated.dt", "(e)", func);
        }
        
        public void WhenARowIsSelectedThenInvoke(string func)
        {
            this.AddSelection("select", "(e, dt, type, indexes)", func);
        }

        public void WhenARowIsDeselectedThenInvoke(string func)
        {
            this.AddSelection("deselect", "(e, dt, type, indexes)", func);
        }

        public void WhenTableIsDrawnThenInvoke(string func)
        {
            this.Add("draw.dt", "(e)", func);
        }

        public void BeforeSelectingARowInvoke(string func)
        {
            this.AddSelection("user-select", "(e, dt, type, cell, originalEvent)", func);
        }

        public string  ToString()
        {
            StringBuilder sb = new StringBuilder();
            var ienum = events.GetEnumerator();
            while (ienum.MoveNext())
            {
                IList<string> functions = ienum.Current.Value;

                sb.Append($"$(\"#{_tableName}\").on('{ienum.Current.Key}',function{functions[0]}{{");
                for (int i = 1; i < functions.Count; i++)
                { 
                    sb.Append($"{functions[i]}{functions[0]};");
                }
                sb.AppendLine("});");
            }

            var ienum2 = selectEvents.GetEnumerator();
            while (ienum2.MoveNext())
            {
                IList<string> functions = ienum2.Current.Value;
                
                sb.Append($"$(\"#{_tableName}\").on('{ienum2.Current.Key}',function{functions[0]}{{");
                for (int i = 1; i < functions.Count; i++)
                {
                    sb.Append($"{functions[i]}{functions[0]};");
                }
                sb.AppendLine("});");
            }

            return sb.ToString();
        }
    }
}
