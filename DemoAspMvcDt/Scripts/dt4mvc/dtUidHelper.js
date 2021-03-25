var DtUid = (function () { // Single Uid Manager by jquery table

    const TD_UID_DATA = 'td-uid';
    const TD_UID_PROP = 'td_uid';

    var instances = {};

    function dtUidInit() {

       

        var rowsUidDic = {};
        var rowUid = 1;


        // Public methods        
        function setRowUid(rowOldData) {

            rowsUidDic[rowUid.toString()] = rowOldData;
            return rowUid++;
        }

        function getOldRowDataByRowUid(rowUid) {

            let olddata = rowsUidDic[rowUid];
            return olddata;
        }

        return {            
            setRowUid,
            getOldRowDataByRowUid
        };
    };
    return {
        TD_UID_DATA,
        TD_UID_PROP,
        getInstance: function (jqueryTable) {
            if (jqueryTable == undefined || jqueryTable == null) {
                throw 'A Jquery reference to the table is needed.';
            }
            if (!instances[jqueryTable]) {
                instances[jqueryTable] = dtUidInit();
            }
            return instances[jqueryTable];
        }
    };
})();