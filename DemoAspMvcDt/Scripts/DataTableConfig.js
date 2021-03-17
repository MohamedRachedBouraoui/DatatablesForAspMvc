DataTableConfig = (
    function () {

        function milliersEspace(input) {
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        }

        function dtDefaults() {
            return {
                "destroy": true,
                "dom": "<'top'i>rt<'row'<'col-xl-2'l><'col-xl-10'p>><'clear'>",
                //"language": { "url": DATATABLE_FRANCAIS }, //TODO
                //"serverSide": false,
                "orderMulti": false,
                //"select": parametres.select,
                //"ajax": parametres.fonctionAjax,
                ////"columns": parametres.colonnes,
                //"columnDefs": parametres.definitionColonnes,
               // "autoWidth": parametres.tailleAuto,
               // "order": parametres.ordreColonnes,
                "lengthMenu": [[15, 25, 50, -1], [15, 25, 50, "Tous"]],
                //"draw": table.width("100%"),
                "infoCallback": function (settings, start, end, max, total, pre) {
                    start = (total === 0) ? 0 : start;
                    return "Affichage " + milliersEspace(start) + " à " + milliersEspace(end) + " sur " + milliersEspace(total);
                }
            }
        }
        return {
            milliersEspace: milliersEspace,
            dtDefaults: dtDefaults
        }
    })();