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


    function fetchView(url, data, successCallback, errorCallback) {
        $.ajax({
            method: 'GET',
            url: url,
            data: data,// addAntiForgeryTokenTodata(form,data),
            success: function (response) {
                //$('.datetimepicker-v4').datetimepicker({
                //    locale: 'fr-ca',
                //    format: 'L'
                //});
                    successCallback(response);
                },
            error: function (status, error) {
                console.error('Ajax Error !!!', status, error);
                errorCallback(status, error);
            }
        });
    }

    return {
        fetchView
    }
})();