DtFormHelper = (function () {

    function setupForm(dtModel, closestDiv, dtTable, _jQueryTable) {

        $(closestDiv).append("<input type='hidden' id='" + dtModel.IdOfHiddenInputHoldingTableData + "' " + dtModel.NameAttributeForHiddenInputHoldingTableData + "/>");
        let form = null;
        if (dtModel.FormId != '') {
             form = $('#' + dtModel.FormId);
        }
        else {
             form = _jQueryTable.closest('form');
        }


        form.on('submit', function (e) {

            let dataToSubmit = dtTable.rows().data().toArray();
            if (dtModel.IsSubmitOnlyNewAndModifiedRows) {
                dataToSubmit = dataToSubmit.filter(function (data) { { return data.isDirty === true; } });

            }


            if (dtModel.SubmitWithMultiHiddenInputs) {
                //Will create as many hidden inputs as data length and inject them into the "hiddenTableData" DIV

                let hiddenInputs = '';
                for (let i = 0; i < dataToSubmit.length; i++) {
                    let _data = dataToSubmit[i];
                    for (const property in _data) {
                        let hiddenInputName = dtModel.PrefixForMultiHiddenInputs + "[" + i + "]." + property;
                        let hiddenInputValue = _data[property];
                        hiddenInputs += "<input name='" + hiddenInputName + "' type='hidden' value='" + hiddenInputValue + "' />";
                    }
                }
                $('#' + dtModel.IdOfHiddenInputHoldingTableData).html(hiddenInputs);
            }
            else {
                // Will inject data into the "hiddenTableData" DIV  as a JSON string

                $('#' + dtModel.IdOfHiddenInputHoldingTableData).val(JSON.stringify(dtTable.rows().data().toArray()));
            }
        });
    }
    return {
        setupForm
    }
})();