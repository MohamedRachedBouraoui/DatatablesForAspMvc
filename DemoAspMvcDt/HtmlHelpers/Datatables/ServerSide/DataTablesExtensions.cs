using System.Collections.Generic;
using System.Linq;

namespace DemoAspMvcDt.HtmlHelpers.Datatables.ServerSide
{
    /// <summary>
    /// Provides extensions for <see cref="IEnumerable{T}"/>
    /// </summary>
    public static class DataTablesExtensions
    {
        /// <summary>
        /// Gets a <see cref="DataTablesResponse{T}"/> from collection/request
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        public static DataTablesResponse<T> ToDataTablesResponse<T>(this IEnumerable<T> collection, DataTablesRequest request)
        {
            DataTablesResponse<T> response = new DataTablesResponse<T>
            {
                draw = request.Draw,
                recordsTotal = collection.Count(),
                recordsFiltered = collection.Count(),
                data = collection
            };
            return response;
        }

        /// <summary>
        /// Gets a <see cref="DataTablesResponse{T}"/> from collection/request
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="request"></param>
        /// <param name="recordsTotal">Number of records before filtered</param>
        /// <returns></returns>
        public static DataTablesResponse<T> ToDataTablesResponse<T>(this IEnumerable<T> collection, DataTablesRequest request, int recordsTotal)
        {
            DataTablesResponse<T> response = new DataTablesResponse<T>
            {
                draw = request.Draw,
                recordsTotal = recordsTotal,
                recordsFiltered = recordsTotal,
                data = collection
            };
            return response;
        }

        /// <summary>
        /// Gets a <see cref="DataTablesResponse{T}"/> from collection/request
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="request"></param>
        /// <param name="recordsTotal">Number of records before filtered</param>
        /// <param name="recordsFiltered">Number of records after filtered</param>
        /// <returns></returns>
        public static DataTablesResponse<T> ToDataTablesResponse<T>(this IEnumerable<T> collection, DataTablesRequest request, int recordsTotal, int recordsFiltered)
        {
            DataTablesResponse<T> response = new DataTablesResponse<T>
            {
                draw = request.Draw,
                recordsTotal = recordsTotal,
                recordsFiltered = recordsFiltered,
                data = collection
            };
            return response;
        }
    }
}
