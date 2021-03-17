DtTableHtmlHelper = (function () {

    function createTable(dtModel, closestDiv) {

        let rawTableName = dtModel.TableName;

        let _jQueryTable = $("#" + rawTableName);

        if (_jQueryTable.length > 0) {//A table with table_name as id is already set in the DOM
            if (_jQueryTable.is('table') === false) {//The tale_name is already used but not as a table
                throw rawTableName + " is not a table";
            }
            else {
                _jQueryTable.attr('default_date_time_format', dtModel.TableDefaultDatesFormat);// add default dates format as an attribute
            }
        } else {//Will create the table element

            let tbElement = document.createElement('table');
            tbElement.setAttribute('default_date_time_format', dtModel.TableDefaultDatesFormat);
            tbElement.setAttribute('width', '100%');
            tbElement.setAttribute('class', 'display ' + dtModel.TableClassName);
            tbElement.setAttribute('id', dtModel.TableName);
            closestDiv.appendChild(tbElement);

            _jQueryTable = $("#" + rawTableName);
        }
        return _jQueryTable;
    }
    return {
        createTable
    }
})();