

using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.ServerSide
{
    public class DataTablesRequestModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var valueProvider = bindingContext.ValueProvider;


            //   var valueResultProvider = valueProvider.GetValue("draw");
            if (valueProvider == null)
            {
                return null;
            }

            //TryParse<int>(valueResultProvider, out draw);
            TryParse<int>(valueProvider.GetValue("draw"),out int draw);
            TryParse<int>(valueProvider.GetValue("start"), out int start);
            TryParse<int>(valueProvider.GetValue("length"), out int length);

            DataTablesRequest result = new DataTablesRequest(draw, start, length, TryGetSearch(valueProvider),
                TryGetOrders(valueProvider), TryGetColumns(valueProvider));
            return result;
        }

        /// <summary>
        /// Gets the search part of query
        /// </summary>
        /// <returns></returns>
        private Search TryGetSearch(IValueProvider valueProvider)
        {
            if (TryParse<string>(valueProvider.GetValue("search[value]"), out string searchValue) &&
                !string.IsNullOrEmpty(searchValue))
            {
                TryParse<bool>(valueProvider.GetValue("search[regex]"), out bool regex);
                return new Search(searchValue, regex);
            }
            return null;
        }

        /// <summary>
        /// Gets the list of columns in request
        /// </summary>
        /// <param name="valueProvider"></param>
        /// <returns></returns>
        private IEnumerable<DataTableColumn> TryGetColumns(IValueProvider valueProvider)
        {
            //columns[0][data]:name
            //columns[0][name]:
            //columns[0][searchable]:true
            //columns[0][orderable]:true
            //columns[0][search][value]:
            //columns[0][search][regex]:false
            int index = 0;
            List<DataTableColumn> columns = new List<DataTableColumn>();

            // Count number of column
            do
            {
                if (valueProvider.GetValue($"columns[{index}][data]") == null)
                {
                    break;
                  
                }
                else
                {
                    TryParse<string>(valueProvider.GetValue($"columns[{index}][data]"), out string data);
                    TryParse<string>(valueProvider.GetValue($"columns[{index}][name]"), out string name);
                    TryParse<bool>(valueProvider.GetValue($"columns[{index}][searchable]"), out bool searchable);
                    TryParse<bool>(valueProvider.GetValue($"columns[{index}][orderable]"), out bool orderable);
                    TryParse<string>(valueProvider.GetValue($"columns[{index}][search][value]"), out string searchValue);
                    TryParse<bool>(valueProvider.GetValue($"columns[{index}][search][regex]"), out bool searchRegEx);

                    columns.Add(new DataTableColumn(data, name, searchable, orderable, searchValue, searchRegEx));
                    index++;
                }
            } while (true);

            return columns;
        }

        /// <summary>
        /// Gets the list of order columns in request
        /// </summary>
        /// <param name="valueProvider"></param>
        /// <returns></returns>
        private IEnumerable<Order> TryGetOrders(IValueProvider valueProvider)
        {
            //order[0][column]:0
            //order[0][dir]:asc
            int index = 0;
            List<Order> orders = new List<Order>();

            do
            {
                if (valueProvider.GetValue($"order[{index}][column]")!= null)
                {
                    TryParse<int>(valueProvider.GetValue($"order[{index}][column]"), out int column);
                    TryParse<string>(valueProvider.GetValue($"order[{index}][dir]"), out string dir);

                    orders.Add(new Order(column, dir));
                    index++;
                }
                else
                {
                    break;
                }
            } while (true);

            return orders;
        }

        /// <summary>
        /// Try to gets the first value in the request
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="value"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        private bool TryParse<T>(ValueProviderResult value, out T result)
        {
            result = default;
            if (value == null || value.AttemptedValue == null) return false;

            try
            {
                result = (T)Convert.ChangeType(value.AttemptedValue, typeof(T));
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
