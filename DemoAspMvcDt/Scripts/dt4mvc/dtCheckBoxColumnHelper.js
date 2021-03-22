DtCheckBoxColumnHelper = (function () {
    const DT_CHECKBOX_COLUMN_CHANGED_EVENT = 'dt.checkbox.column.changed';

    function render(d, t, row, meta, colId) {

        if (row[colId] == true) {

            return `<input type="checkbox" class='dt_checkbox_col_${colId} dt_checkbox_col' checked value="true" data-row-index='${meta.row}'>`;
        }
        return `<input type="checkbox" class='dt_checkbox_col_${colId} dt_checkbox_col' value="false" data-row-index='${meta.row}'>`;
    }

    function setupCheckboxColumns(dtModel, _jQueryTable, rawTableName) {
        $('.dt_checkbox_all_col').change(function () {

            let jqueryThis = $(this);
            let classes = this.className;
            let _classArray = classes.split(' ');

            for (var i = 0; i < _classArray.length; i++) {
                if (_classArray[i].startsWith('dt_checkbox_all_') === true) {
                    let _class = _classArray[i];
                    let _classChildren = _class.replace('dt_checkbox_all_', 'dt_checkbox_col_');
                    $('.' + _classChildren).prop("checked", jqueryThis.is(':checked'));
                    break;
                }
            }

            let dt = _jQueryTable.DataTable();
            let rows = dt.rows().data().toArray();
            for (var i = 0; i < rows.length; i++) {
                let checkBoxId = jqueryThis.attr('id');
                rows[i][checkBoxId] = jqueryThis.is(':checked');
            }
            dt.rows().invalidate();
        });

        $('.dt_checkbox_col').change(function () {
            
            _jQueryTable.trigger(jQuery.Event(DT_CHECKBOX_COLUMN_CHANGED_EVENT));

            let dt = _jQueryTable.DataTable();

            let jqueryThis = $(this);
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

                    let totalSelected = 0;
                    for (var j = 0; j < rows.length; j++) {
                        if (rows[j][_checkBoxId] === true) {
                            totalSelected++;
                        }
                    }

                    let _classHeader = $('.' + _class.replace('dt_checkbox_col_', 'dt_checkbox_all_'));

                    if (totalSelected == 0) {
                        _classHeader.prop("indeterminate", false);
                        _classHeader.prop("checked", false);
                    } else if (totalSelected === rows.length) {

                        _classHeader.prop("checked", true);
                    } else {
                        _classHeader.prop("indeterminate", true);
                    }
                    break;
                }
            }


        });
    }

    return {
        render,
        setupCheckboxColumns
    }
})();