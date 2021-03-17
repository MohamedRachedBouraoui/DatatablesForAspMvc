DtEventsHelper = (function () {

    function setupEvents(dtModel, dtTable) {

        // For events like "OnAddingRow","OnDeletingRow"
        dtModel.NativeEvents

        if (dtModel.HasCheckBoxColumn) {
            // If a button in a Cell is clicked the we need to "preventDefault" the "user-select" event to prevent accidently selecting/deselecting the row
            dtTable.on('user-select', function (e, dt, type, cell, originalEvent) { if ($(originalEvent.currentTarget).hasClass('dt-command')) { e.preventDefault(); } });

        }

        if (dtModel.HasClickEvents) {

            let fn = [dtModel.ClickEvents];

            _jQueryTable.on('click', 'button', function () {

                let row = dtTable.row($(this).parents('tr'));
                let i = dtTable.column($(this).parents('td')).index();
                if (fn.length > i) {
                    fn[i]({
                        data: $(this).data(),
                        row: row.data(),
                        rowId: row.id(),
                        rowIndex: row.index(),
                        dataTable: dtTable
                    });
                    PrefixForMultiHiddenInputsrefixForMultiHiddenInputsfixForMultiHiddenInputsfixForMultiHiddenInputsfixForMultiHiddenInputs
                }
                ModePrefixForMultiHiddenInputsPrefixForMultiHiddenInputsfixForMultiHiddenInputsfixForMultiHiddenInputs
            });
        }
    }
    return {
        setupEvents
    }
})();