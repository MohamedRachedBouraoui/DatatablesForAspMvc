DtEditCmd = (function () {

    const TD_UID_DATA = 'td-uid';
    const TD_UID_PROP = 'td_uid';
    const TD_ROW_INDEX_DATA = 'row-index';

    let rowsUidDic = {};
    let rowUid = 1;

    function setEditCmd(dtModel, _jQueryTable, rawTableName) {

        _jQueryTable.off('click', '.dt-edit-command');
        // _jQueryTable.find('.dt-edit-command').off();
        _jQueryTable.on('click', '.dt-edit-command', function (e) {
            let editBtn = $(e.target);

            if (dtModel.FetchEditViewFromServerSide === true) {
                console.log('FetchEditViewFromServerSide...');
                handleEditRowCmdFromServer(dtModel, editBtn, rawTableName, _jQueryTable);
            } else {
                handleEditRowCmd(dtModel, editBtn, rawTableName, _jQueryTable);
            }
        });

        _jQueryTable.off('click', '.dt-cancel-edit-command ');
        _jQueryTable.on('click', '.dt-cancel-edit-command ', function (e) {
            let editBtn = $(e.target);
            handleCancelEditRowCmd(editBtn, rawTableName);
            return false;
        });
    }

    // Server-Side
    function handleEditRowCmdFromServer(dtModel, editBtn, rawTableName, _jQueryTable) {
        //getGuid

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let dt_api = new DtApi(rawTableName);
        let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();

        let currentRowUid = editBtn.data(TD_UID_DATA);
        if (currentRowUid == undefined) {
            rowOldData[TD_UID_PROP] = setRowUid(rowOldData);
        }

        DtAjaxHelper.fetchView(dtModel.FetchEditViewFromUrl, rowOldData, function (html) {
            displayHtmlInModalAndHandleFormSubmit(html, dtModel, rawTableName, rowIndex, rowOldData[TD_UID_PROP], DtModalHelper.DT_MODAL_SIZE_XL);

        });
    }


    // Client side
    function handleEditRowCmd(dtModel, editBtn, rawTableName, _jQueryTable) {

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let dt_api = new DtApi(rawTableName);
        let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();

        let currentRowUud = editBtn.data(TD_UID_DATA);
        if (currentRowUud == undefined) {
            rowOldData[TD_UID_PROP] = setRowUid(rowOldData);
        }
        let html = buildHtmlForEdition(rowOldData, _jQueryTable);

        displayHtmlInModalAndHandleFormSubmit(html, dtModel, rawTableName, rowIndex);
    }

    function buildHtmlForEdition(rowOldData, _jQueryTable) {

        let dtTable = _jQueryTable.DataTable();
        let all_columns = dtTable.settings().init().columns;

        let inputs = [`<input type="hidden" name="${TD_UID_PROP}" value="${rowOldData.td_uid}">`];

        for (let i in all_columns) {
            let col_name = all_columns[i].name;
            let col = dtTable.column(col_name + ':name');

            if (col.dataSrc() != undefined) {
                if (col.visible()) { //Proceed visible columns
                    if (all_columns[i].type === 'bool') {//For checkboxes

                        let isCheck = (rowOldData[col_name]).toString() == 'true' ? 'checked="checked"' : '';

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

        return inputs.join('');
    }

    //Shared between server & client sides
    function displayHtmlInModalAndHandleFormSubmit(html, dtModel, rawTableName, rowIndex, rowOldDataUid, modalSize) {


        html = `<form class="dt-edit-form">${html}</form>`;

        DtModalHelper.show(dtModel.EditPopupTitle, html, function (e) {
            debugger;
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
                updateRow(rawTableName, rowIndex, formData);
                DtModalHelper.hide();
            }

        }, modalSize);
    }

    function setRowUid(rowOldData) {
        rowsUidDic[rowUid.toString()] = rowOldData;
        return rowUid++;
    }

    function getOldRowDataByRowUid(rowUid) {
        let olddata = rowsUidDic[rowUid];
        return olddata;
    }

    function handleCancelEditRowCmd(editBtn, rawTableName) {

        let rowIndex = editBtn.data(TD_ROW_INDEX_DATA);
        let currentRowUud = editBtn.data(TD_UID_DATA);
        let oldRowData = getOldRowDataByRowUid(currentRowUud);

        resetRow(rawTableName, rowIndex, oldRowData);
    }

    function updateRow(rawTableName, rowIndex, values) {
        let dt_api = new DtApi(rawTableName);
        dt_api.recupereLigneParIndex(rowIndex).modifierLigne(values);
    }

    function resetRow(rawTableName, rowIndex, oldRowData) {
        let dt_api = new DtApi(rawTableName);
        dt_api.recupereLigneParIndex(rowIndex).reinitLigne(oldRowData);
    }

    return {
        setEditCmd
    }
})();