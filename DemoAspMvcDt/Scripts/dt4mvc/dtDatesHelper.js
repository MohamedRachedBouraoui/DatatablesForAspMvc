DtDatesHelper = (function () {

    function dtConvertDates(data, dateFormat) {

        
        for (let _prop in data) {

            if (data[_prop] !== null && typeof (data[_prop]) == "object") {
                dtConvertDates(data[_prop], dateFormat);
            } else {
                if (data[_prop] != null && data[_prop].toString().indexOf('/Date\(') > -1) {

                    let m = window.moment.utc(data[_prop]);
                    data[_prop] = m.locale('fr-ca').format(dateFormat);
                }
            }
        }
    }
    return {
        dtConvertDates
    }
})();