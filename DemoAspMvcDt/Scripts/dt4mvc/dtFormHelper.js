DtFormHelper = (function () {

    function convertFormDataIntoHiddenInputsForSubmit(dtModel, closestDiv, dtTable, _jQueryTable) {

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

    function getFormData(form) {
        let result = {};
        form.off().submit(function (event) {
            event.preventDefault();

            const data = new FormData(event.target);
            result = Object.fromEntries(data.entries());
            
        });

        form.submit();

        return result;
    }

    function displayValidationErrors(form, errors) {
        
        if (!errors) return;
        for (var i = 0; i < errors.length; i++) {
            let error = errors[i];
            form.find(`[data-valmsg-for="${error.Key}"]`).first().html(error.Message);
        }
    }

    return {
        convertFormDataIntoHiddenInputsForSubmit,
        getFormData,
        displayValidationErrors
    }
})();