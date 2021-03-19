DtAjaxHelper = (function () {

    function getAntiForgeryToken(form) {

        var form = $('#__AjaxAntiForgeryForm');
        return $('input[name="__RequestVerificationToken"]', form).val();
    }
    function addAntiForgeryTokenTodata(form, data) {
        var localData = data !== undefined ? data : {};
        localData.__RequestVerificationToken = getAntiForgeryToken(form);
        return localData;
    }

    function callAjax(url, data, successCallback, errorCallback, method, form) {
        $.ajax({
            method: method || 'GET',
            url,
            data: method == 'GET' ? data : addAntiForgeryTokenTodata(form, data),//for a 'POST' method we must use a form so we can have the 'antiForgeryToken'
            success: function (response) {
                successCallback(response);
            },
            error: function (status, error) {
                errorCallback(status, error);
            }
        });
    }

    function fetchView(url, data, successCallback, errorCallback) {
        callAjax(url, data, function (response) {
            //$('.datetimepicker-v4').datetimepicker({
            //    locale: 'fr-ca',
            //    format: 'L'
            //});
            successCallback(response);

        }, function (status, error) {
            console.error('Ajax Error !!!', status, error);
            if (errorCallback) {
                errorCallback(status, error);
            }
        });
    }

    function fetchData(url, data, successCallback, errorCallback) {
        callAjax(url, data, function (response) {
            successCallback(response);

        }, function (status, error) {
            console.error('Ajax Error !!!', status, error);
            if (errorCallback) {
                errorCallback(status, error);
            }
        });
    }

    return {
        fetchView,
        fetchData
    }
})();