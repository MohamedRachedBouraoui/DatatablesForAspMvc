DtCheckBoxColumnHelper = (function () {
    const DT_CHECKBOX_COLUMN_CHANGED_EVENT = 'dt.checkbox.column.changed';

    function render(d, t, row, meta, colId) {
        console.log('DtCheckBoxColumnHelper.render');
        if (row[colId].toString() == 'true') {
            return `<input type="checkbox" class='dt_checkbox_col_${colId} dt_checkbox_col' checked value="true" data-row-index='${meta.row}'>`;
        }
        return `<input  type="checkbox" class='dt_checkbox_col_${colId} dt_checkbox_col' value="false" data-row-index='${meta.row}'>`;
    }

    function calculateTotalSelected(rows, _checkBoxId) {

        let totalSelected = 0;
        for (var j = 0; j < rows.length; j++) {
            if (rows[j][_checkBoxId] === true) {
                totalSelected++;
            }
        }

        return totalSelected;
    }

    function setupHeaders(_jQueryTable) {

        //setup status with values comming from server
        $('.dt_checkbox_all_col').each(function () {
            let jqueryThis = $(this);

            let _checkBoxId = jqueryThis.attr('id');
            let dt = _jQueryTable.DataTable();
            let rows = dt.rows().data();

            let totalSelected = calculateTotalSelected(rows, _checkBoxId);
            updateHeaderStatus(jqueryThis, totalSelected, rows.length)

        });

        $('.dt_checkbox_all_col').change(function () {//on change


            let jqueryThis = $(this);
            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {
                if (_classArray[i].startsWith('dt_checkbox_all_') === true) {
                    let _class = _classArray[i];
                    let _classChildren = _class.replace('dt_checkbox_all_', 'dt_checkbox_col_');

                    $('.' + _classChildren).prop("checked", jqueryThis.is(':checked'));//check/uncheck rows
                    break;
                }
            }

            let dt = _jQueryTable.DataTable();//update dt_table rows
            let rows = dt.rows().data().toArray();
            for (var i = 0; i < rows.length; i++) {
                let checkBoxId = jqueryThis.attr('id');
                let val = jqueryThis.is(':checked');

                rows[i][checkBoxId] = val;
            }
            // dt.rows().invalidate();
        });
    }

    function updateHeaderStatus(header, totalSelected, totalLength) {

        switch (totalSelected) {
            case 0: {
                header.prop("indeterminate", false);
                header.prop("checked", false);
                break;
            }
            case totalLength: {
                header.prop("indeterminate", false);
                header.prop("checked", true);
                break;
            }
            default: {
                header.prop("indeterminate", true);
                break;
            }
        }
    }

    function setupRows(_jQueryTable) {

        


        //On col-checkbox change
        $('.dt_checkbox_col').change(function () {

            let jqueryThis = $(this);

            _jQueryTable.trigger(jQuery.Event(DT_CHECKBOX_COLUMN_CHANGED_EVENT));

            let dt = _jQueryTable.DataTable();

            let rowIndex = jqueryThis.data('row-index');
            let rowdata = dt.row(rowIndex).data();
            let rows = dt.rows().data();

            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {

                if (_classArray[i].startsWith('dt_checkbox_col_') === true) {
                    let _class = _classArray[i];
                    let _checkBoxId = _class.replace('dt_checkbox_col_', '');
                    rowdata[_checkBoxId] = jqueryThis.is(':checked');//upate data value
                    rowdata.isDirty = true;
                    let totalSelected = calculateTotalSelected(rows, _checkBoxId);

                    let _classHeader = $('.' + _class.replace('dt_checkbox_col_', 'dt_checkbox_all_'));
                    updateHeaderStatus($(_classHeader), totalSelected, rows.length);
                    break;
                }
            }
        });
    }

    function setupRowsForNewValues(_jQueryTable) {
        // default status
        $('.dt_checkbox_col').each(function () {

            let jqueryThis = $(this);

            let dt = _jQueryTable.DataTable();

            let rowIndex = jqueryThis.data('row-index');
            let rowdata = dt.row(rowIndex).data();

            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {

                if (_classArray[i].startsWith('dt_checkbox_col_') === true) {
                    let _class = _classArray[i];
                    let _checkBoxId = _class.replace('dt_checkbox_col_', '');
                    let isChecked = rowdata[_checkBoxId].toString() === 'true';
                    jqueryThis.prop('checked', isChecked);
                    break;
                }
            }
        });
    }

    function setupCheckboxColumns(_jQueryTable) {

        setupHeaders(_jQueryTable);
        setupRows(_jQueryTable);

        _jQueryTable.on('draw.dt', function () {
            setupRowsForNewValues(_jQueryTable);
        });
    }

    return {
        render,
        setupCheckboxColumns
    }
})();