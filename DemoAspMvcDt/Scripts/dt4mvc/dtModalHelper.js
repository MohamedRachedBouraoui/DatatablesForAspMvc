DtModalHelper = (function () {

    let jqueryModal = null;

    const DT_MODAL_ID = '#dt_modal';
    const DT_MODAL_BTN_CONFIRM = 'dt-modal-btn-confirm';
    const DT_MODAL_BTN_CONFIRM_CLASS = '.' + DT_MODAL_BTN_CONFIRM;
    const DT_MODAL_BTN_CANCEL = 'dt-modal-btn-cancel';
    const DT_MODAL_BTN_CANCEL_CLASS = '.' + DT_MODAL_BTN_CANCEL;
    const DT_MODAL_CONFIRMED_EVENT = 'dt-modal-confirmed';
    const DT_MODAL_CANCELED_EVENT = 'dt-modal-canceled';

    const DT_MODAL_SIZE_DEFAULT = '';//500px
    const DT_MODAL_SIZE_S = 'modal-sm';//300px
    const DT_MODAL_SIZE_LG = 'modal-lg';//800px
    const DT_MODAL_SIZE_XL = 'modal-xl';//1140px

    function getModalTemplate() {
        return `
            <div class="modal fade" id="dt_modal" tabindex="-1" role="dialog" aria-labelledby="dt_modalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <i class="fas fa-info fa-2x mr-4" style="color: cornflowerblue;"></i>
                    <h5 class="modal-title" id="dt_modalLabel"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                  <div class="container-fluid">

                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary ${DT_MODAL_BTN_CANCEL}" data-dismiss="modal" >Close</button>
                    <button type="button" class="btn btn-primary ${DT_MODAL_BTN_CONFIRM}">Save changes</button>
                  </div>
                </div>
              </div>
            </div>`;
    }

    function createModalTemplate() {

        if (jqueryModal !== null) {//modal already added
            return;
        }

        setupShowAndDismissEvents();

        let modalTemplate = getModalTemplate();
        $('body').prepend(modalTemplate);
        jqueryModal = $(DT_MODAL_ID);
    }

    function setupShowAndDismissEvents() {
        //-- On-showing
        $('body').off('shown.bs.modal').on('shown.bs.modal', DT_MODAL_ID, function (e) {

            let confirmBtn = $(this).find(DT_MODAL_BTN_CONFIRM_CLASS).first();
            confirmBtn.off().on('click', function (ev) {

                jqueryModal.trigger(jQuery.Event(DT_MODAL_CONFIRMED_EVENT));

            });
        });

        //-- On-hiding
        $('body').off('hide.bs.modal').on('hide.bs.modal', DT_MODAL_ID, function (e) {
            jqueryModal.trigger(jQuery.Event(DT_MODAL_CANCELED_EVENT));
        });
    }

    function show(title, html, confirmCallback,size) {
        debugger;
        size = size || DT_MODAL_SIZE_DEFAULT;

        createModalTemplate();
        jqueryModal.off(DT_MODAL_CONFIRMED_EVENT).on(DT_MODAL_CONFIRMED_EVENT, function (e) {
            confirmCallback(e);
        });

        jqueryModal.find('.modal-title').html('    '+title);
        jqueryModal.find('.modal-body .container-fluid').empty().html(html);

        jqueryModal.find('.modal-dialog').addClass(size);
        jqueryModal.modal('toggle');
        //jqueryModal.modal('handleUpdate');
        //jqueryModal.modal('show');
    }

    function hide() {
        jqueryModal.modal('toggle');
        //jqueryModal.modal('hide');
    }

    return {
        show,
        hide,
        DT_MODAL_SIZE_S,
        DT_MODAL_SIZE_LG, 
        DT_MODAL_SIZE_XL 
    }
})();