DtEditCmd = (function () {

    function setEditCmd(dtModel, _jQueryTable, rawTableName ) {
        let popupTitle = dtModel.EditPopupTitle;
       
        //The problem is that .click() only works for elements that already existed when the page loaded. 
        _jQueryTable.find('.dt-edit-command').off();
        _jQueryTable.on('click','.dt-edit-command',function (e) {

            let rowIndex = $(e.target).data('row-index');
            let dt_api = new DtApi(rawTableName);
            let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();
            let html = buildHtmlForEdition(rowOldData, _jQueryTable);
            Swal.fire({
                title: `<strong>${popupTitle}</strong>`,
                icon: 'info',
                html: '<form class="dt-edit-form" style="text-align:left;">' + html.join('') + '</form>',
                //focusConfirm: false,
                className: "dt-popup-edit-swal-actions",
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Save',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"> Cancel</i>',
                preConfirm: () => {

                    let form = $('.dt-edit-form');
                    $.validator.unobtrusive.parse(form);
                    if (form.valid() == false) {
                        return false;
                    }
                    let result = {};
                    form.submit(function (event) {
                        event.preventDefault();
                        const data = new FormData(event.target);

                        result = Object.fromEntries(data.entries());
                    });

                    form.submit();

                    return result;
                }
            }) .then((result) => {
                    if (result.isConfirmed) {
                        // alert(JSON.stringify(result.value));
                        updateRow(rawTableName,rowIndex, result.value);
                    }
                });
        });
    }
    function buildHtmlForEdition(rowOldData, _jQueryTable ) {
        let dtTable = _jQueryTable.DataTable();
        let all_columns = dtTable.settings().init().columns;

        let inputs = [];
        for (let i in all_columns) {
            let col_name = all_columns[i].name;
            let col = dtTable.column(col_name + ':name');

            if (col.dataSrc() != undefined) {
                if (col.visible()) { //Proceed visible columns
                    if (all_columns[i].type === 'bool') {//For checkboxes

                        let isCheck = rowOldData[col_name] === true ? 'checked="checked"' : '';

                        inputs.push(` <div class="form-check mb-3">
    <input type="hidden" name="${col_name}" value="false">
    <input type="checkbox" class="form-check-input" name="${col_name}" id="${col_name}"  ${isCheck} value='true'>
    <label class="form-check-label" for="${col_name}" style="font-weight: bold;">${$(col.header()).html()}</label>
</div>`);
                    } else {

                        inputs.push(` <div class="form-group">
    <label for="${col_name}" style="font-weight: bold;">${$(col.header()).html()}</label>
    <input type="${all_columns[i].type}" class="form-control" name="${col_name}" value="${rowOldData[col_name]}" data-val="true" data-val-required="Le champ Name est requis.">
    <span class="field-validation-valid text-danger" data-valmsg-for="${col_name}" data-valmsg-replace="true"></span>
  </div>`);
                    }
                }
                else { ////Proceed hidden columns using hidden inputs
                    inputs.push(`<input type="hidden" name="${col_name}" value="${rowOldData[col_name]}">`)
                }
            }
        }
        return inputs;
    }
    function updateRow(rawTableName,rowIndex, values) {
        let dt_api = new DtApi(rawTableName);
        let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();
        dt_api.modifierLigne(values);

    }
    return {
        setEditCmd
    }
})();