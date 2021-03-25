DtEditCmd = (function () {
   
    const TD_ROW_INDEX_DATA = 'row-index';

    function setEditCmd(dtModel, _jQueryTable) {

        _jQueryTable.off('click', '.dt-edit-command');

        _jQueryTable.on('click', '.dt-edit-command', function (e) {
            let editBtn = $(e.target);

            if (dtModel.FetchEditViewFromServerSide === true) {
                DtLogger.log('FetchEditViewFromServerSide...');
                handleEditRowCmdFromServer(dtModel, editBtn,  _jQueryTable);
            } else {
                handleEditRowCmd(dtModel, editBtn,  _jQueryTable);
            }
        });

        _jQueryTable.off('click', '.dt-cancel-edit-command ');
        _jQueryTable.on('click', '.dt-cancel-edit-command ', function (e) {
            let editBtn = $(e.target);
            handleCancelEditRowCmd(editBtn, _jQueryTable);
            return false;
        });
    }

    // Server-Side
    function handleEditRowCmdFromServer(dtModel, editBtn,  _jQueryTable) {
        //getGuid

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let dt_api = DtApi.getInstance(_jQueryTable);
        let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();

        let currentRowUid = editBtn.data(DtUid.TD_UID_DATA);
        if (currentRowUid == undefined) {
            rowOldData[DtUid.TD_UID_PROP] = DtUid.getInstance(_jQueryTable).setRowUid(rowOldData);
        }

        DtAjaxHelper.fetchView(dtModel.FetchEditViewFromUrl, rowOldData, function (html) {
            displayHtmlInModalAndHandleFormSubmit(html, dtModel, _jQueryTable, rowIndex, rowOldData[DtUid.TD_UID_PROP], DtModalHelper.DT_MODAL_SIZE_XL);

        });
    }


    // Client side
    function handleEditRowCmd(dtModel, editBtn,  _jQueryTable) {

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let dt_api = DtApi.getInstance(_jQueryTable);
        let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();

        let currentRowUud = editBtn.data(DtUid.TD_UID_DATA);
        if (currentRowUud == undefined) {
            rowOldData[DtUid.TD_UID_PROP] = DtUid.getInstance(_jQueryTable).setRowUid(rowOldData);
        }
        let html = buildHtmlForEdition(rowOldData, _jQueryTable);

        displayHtmlInModalAndHandleFormSubmit(html, dtModel, _jQueryTable, rowIndex);
    }

    function buildHtmlForEdition(rowOldData, _jQueryTable) {

        let dtTable = _jQueryTable.DataTable();
        let all_columns = dtTable.settings().init().columns;

        let inputs = [`<input type="hidden" name="${DtUid.TD_UID_PROP}" value="${rowOldData.td_uid}">`];

        for (let i in all_columns) {
            let col_name = all_columns[i].name;
            let col = dtTable.column(col_name + ':name');

            if (col.dataSrc() == undefined) {
                continue;
            }

            ////Proceed hidden columns using hidden inputs
            if (col.visible() === false) {
                inputs.push(`<input type="hidden" name="${col_name}" value="${rowOldData[col_name]}">`)
                continue;
            }

            //Proceed visible columns
            if (all_columns[i].type === 'bool') {//For checkboxes

                let isCheck = (rowOldData[col_name]).toString() == 'true' ? 'checked="checked"' : '';
                
                let colHeader = $($(col.header()).html()).find('[data-col-title]').data('col-title');
                colHeader = colHeader || $(col.header()).html();

                inputs.push(` <div class="form-check mb-3">
    <input type="hidden" name="${col_name}" value="false">
    <input type="checkbox" class="form-check-input" name="${col_name}" id="${col_name}"  ${isCheck} value='true'>
    <label class="form-check-label" for="${col_name}" style="font-weight: bold;">${colHeader}</label>
</div>`);
            } else {

                inputs.push(` <div class="form-group">
    <label for="${col_name}" style="font-weight: bold;">${$(col.header()).html()}</label>
    <input type="${all_columns[i].type}" class="form-control" name="${col_name}" value="${rowOldData[col_name]}" data-val="true" data-val-required="Le champ Name est requis.">
    <span class="field-validation-valid text-danger" data-valmsg-for="${col_name}" data-valmsg-replace="true"></span>
  </div>`);
            }
        }

        return inputs.join('');
    }

    //Shared between server & client sides
    function displayHtmlInModalAndHandleFormSubmit(html, dtModel, _jQueryTable, rowIndex, rowOldDataUid, modalSize) {


        html = `<form class="dt-edit-form">${html}</form>`;

        DtModalHelper.show(dtModel.EditPopupTitle, html, function (e) {

            let form = $('.dt-edit-form');
            $.validator.unobtrusive.parse(form);
            if (form.valid() == false) {//client side validation
                e.preventDefault();
                return;
            }
            //if (dtModel.ValidateEditViewByUrl != '') { // Then we must validate in the server side also

            //    let formData = DtFormHelper.getFormData(form);
            //    DtAjaxHelper.fetchData(dtModel.ValidateEditViewByUrl, formData, function (response) {
            //        if (response.success == true) {
            //            //rowOldDataUid is passed Only if we fetch the view from server because it's not a property of the ViewModel
            //            formData[TD_UID_PROP] = formData[TD_UID_PROP] || rowOldDataUid;
            //            updateRow(rawTableName, rowIndex, formData);
            //        } else {// modelstate is Invalid

            //            DtFormHelper.displayValidationErrors(form, response.errors);
            //            return;
            //        }
            //    });

            //}
            else {

                // At this level, our form is validated in the client side and/or the server side
                let formData = DtFormHelper.getFormData(form);
                
                updateRow(_jQueryTable, rowIndex, formData);
                DtModalHelper.hide();
            }

        }, modalSize);
    }

    function handleCancelEditRowCmd(editBtn, _jQueryTable) {

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let currentRowUud = editBtn.data(DtUid.TD_UID_DATA);
        let oldRowData = DtUid.getInstance(_jQueryTable). getOldRowDataByRowUid(currentRowUud);

        resetRow(_jQueryTable, rowIndex, oldRowData);
    }

    function updateRow(_jQueryTable, rowIndex, values) {
        let dt_api = DtApi.getInstance(_jQueryTable);
        dt_api.recupereLigneParIndex(rowIndex).modifierLigne(values);
    }

    function resetRow(_jQueryTable, rowIndex, oldRowData) {
        let dt_api = DtApi.getInstance(_jQueryTable);
        dt_api.recupereLigneParIndex(rowIndex).reinitLigne(oldRowData);
    }

    return {
        setEditCmd
    }
})();