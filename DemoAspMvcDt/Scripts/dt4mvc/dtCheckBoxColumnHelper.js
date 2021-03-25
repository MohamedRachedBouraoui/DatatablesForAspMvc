DtCheckBoxColumnHelper = (function () {
    const DT_CHECKBOX_COLUMN_CHANGED_EVENT = 'dt.checkbox.column.changed';
    const DT_CHECKBOX_ALL = 'dt_checkbox_all_';
    const CLASS_FOR_DT_CHECKBOX_ALL = '.' +DT_CHECKBOX_ALL;
    const DT_CHECKBOX_COL = 'dt_checkbox_col_';
    const CLASS_FOR_DT_CHECKBOX_COL = '.' + DT_CHECKBOX_COL;

    function render(d, t, row, meta, colId) {
        DtLogger.log('DtCheckBoxColumnHelper.render');

        if (row[colId].toString() == 'true') {
            return `<input type="checkbox" class='${DT_CHECKBOX_COL}${colId} ${DT_CHECKBOX_COL}' checked value="true" data-row-index='${meta.row}'>`;
        }
        return `<input  type="checkbox" class='${DT_CHECKBOX_COL}${colId} ${DT_CHECKBOX_COL}' value="false" data-row-index='${meta.row}'>`;
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

    function getCheckboxAllIdClass(htmlElement) {
        let classes = htmlElement.className;
        let _classArray = classes.split(' ');

        for (var i = 0; i < _classArray.length; i++) {
            if (_classArray[i].startsWith(DT_CHECKBOX_ALL) === true) {
                return _classArray[i];
            }
        }

        return null;
    }

    function setupHeaders(_jQueryTable) {

        //setup status with values comming from server
        $(CLASS_FOR_DT_CHECKBOX_ALL).each(function () {
            let jqueryThis = $(this);

            let _checkBoxId = jqueryThis.attr('id');
            let dt = _jQueryTable.DataTable();
            let rows = dt.rows().data();

            let totalSelected = calculateTotalSelected(rows, _checkBoxId);
            updateHeaderStatus(jqueryThis, totalSelected, rows.length)

        });
        
        //on change
        $(CLASS_FOR_DT_CHECKBOX_ALL).change(function () {


            let jqueryThis = $(this);

            let idClass = getCheckboxAllIdClass(this);

            let _classChildren = idClass.replace(DT_CHECKBOX_ALL, DT_CHECKBOX_COL);

            let isChecked = jqueryThis.is(':checked');

            $('.' + _classChildren).prop("checked", isChecked);//check/uncheck rows

            let dt = _jQueryTable.DataTable();//update dt_table rows
            let rows = dt.rows().data().toArray();

            let checkBoxId = jqueryThis.attr('id');

            for (var i = 0; i < rows.length; i++) {
                rows[i][checkBoxId] = isChecked;
            }
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
        $(CLASS_FOR_DT_CHECKBOX_COL).change(function () {

            let jqueryThis = $(this);

            _jQueryTable.trigger(jQuery.Event(DT_CHECKBOX_COLUMN_CHANGED_EVENT));

            let dt = _jQueryTable.DataTable();

            let rowIndex = jqueryThis.data('row-index');
            let rowdata = dt.row(rowIndex).data();
            let rows = dt.rows().data();

            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {

                if (_classArray[i].startsWith(DT_CHECKBOX_COL) === true) {
                    let _class = _classArray[i];
                    let _checkBoxId = _class.replace(DT_CHECKBOX_COL, '');
                    rowdata[_checkBoxId] = jqueryThis.is(':checked');//upate data value
                    rowdata.isDirty = true;
                    let totalSelected = calculateTotalSelected(rows, _checkBoxId);

                    let _classHeader = $('.' + _class.replace(DT_CHECKBOX_COL, DT_CHECKBOX_ALL));
                    updateHeaderStatus($(_classHeader), totalSelected, rows.length);
                    break;
                }
            }
        });
    }

    function setupRowsForNewValues(_jQueryTable) {
        // default status
        $(CLASS_FOR_DT_CHECKBOX_COL).each(function () {

            let jqueryThis = $(this);

            let dt = _jQueryTable.DataTable();

            let rowIndex = jqueryThis.data('row-index');
            let rowdata = dt.row(rowIndex).data();

            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {

                if (_classArray[i].startsWith(DT_CHECKBOX_COL) === true) {
                    let _class = _classArray[i];
                    let _checkBoxId = _class.replace(DT_CHECKBOX_COL, '');
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