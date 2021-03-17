

    if ($('#example_render').length > 0 && $('#example_render').is('table')===false) {//The tale_name is already used but not as a table
        throw "example_render is not a table";
    }

    if ($('#example_render').length === 0) {//A table with table_name as id is already set in the DOM
    document.write("<table id='example_render' class='display   table table-striped table-hover table-bordered dataTable ' width='100%'></table>");
    }

    module_example_render = (function () {
        $(function () {

                    var rawTableName ='example_render';

            var _jQueryTable = $("#" + rawTableName);


            
            _jQueryTable.on('draw.dt', function () {
                console.log('draw.dt ....');
                setEditCmd();
            });
             

                        
                        _jQueryTable.append("<input type='hidden' id='dt_example_render_data' name='list_items'/>");

                        

                    // if true then the "ajax" call will not trigger on first time: See the "ajax" settings for the Datatable in the "dtCustomConfig" object
                    // NB: Must be placed here (just before the "dtCustomConfig")
                    var _isDtAjaxLoadingDefferd  = false;

                    var dtCustomConfig ={
  "dom": "Bfrtipl",
  "searchHighlight": true,
  "colReorder": {
    "fixedColumnsLeft": 1,
    "fixedColumnsRight": 1
  },
  "scrollY": "400px",
  "processing": true,
  "initComplete": function(){ onInitComplete(this.api());},
  "rowId": "Identifiant",
  "columns": [
    {
      "data": "Identifiant",
      "orderable": false,
      "checkboxes": {
        "selectRow": true
      }
    },
    {
      "data": "Identifiant",
      "name": "Identifiant",
      "title": "Identifiant",
      "type": "number",
      "visible": false
    },
    {
      "data": "Name",
      "name": "Name",
      "title": "Name",
      "type": "text",
      "orderable": false,
      "className": "test_class_type",
      "render": function(d,t,r,m){return bold(d,t,r,m);}
    },
    {
      "data": "Age",
      "name": "Age",
      "title": "Age",
      "type": "number",
      "className": "demo-class"
    },
    {
      "data": "DOB",
      "name": "DOB",
      "title": "DOB",
      "type": "date"
    },
    {
      "data": "IsMaried",
      "name": "IsMaried",
      "type": "bool",
      "title": "Married",
      "render": function(d,t,r,m){return formatIsMaried(d,t,r,m);}
    },
    {
      "data": "Progress",
      "name": "Progress",
      "title": "Progress",
      "type": "text",
      "render": $.fn.dataTable.render.percentBar('round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'groove')
    },
    {
      "data": null,
      "className": "dt-command",
      "orderable": false,
      "searchable": false,
      "render": function(d,t,r,m){return cmdEditPerson(d,t,r,m);},
      "width": "13%"
    },
    {
      "data": null,
      "orderable": false,
      "className": "dt-command",
      "render": function ( data, type, row, meta ){ return '<i class="dt-edit-command far fa-edit" data-row-index='+meta.row+'></i>';}
    }
  ],
  "order": [
    [
      1,
      "asc"
    ]
  ],
  "select": {
    "style": "multi"
  },
  "buttons": [
    {
      "extend": "pdf",
      "text": "Export PDF",
      "className": "dt_pdf_btn"
    }
  ],
  "ajax": function (data, callback, settings) { 
    if (_isDtAjaxLoadingDefferd) {
        _isDtAjaxLoadingDefferd = false;
        callback({data: []}); // don't fire ajax, just return empty set
            return; }

    $.ajax({
  "url": "/Home/GetPeople",
  "method": "POST",
  "beforeSend": function(xhr, opts){ beforeSendFunction(xhr, opts);},
  "success": function(data){ callback(data);onSuccessFunction(data);},
  "error": function(event){ onErrorFunction(event);},
  "data": getPeopleSector(data)
});
    }
}


                     //Will merge custom and default settings for the datatable: in this case, default settings will be overwritten by custom ones having same name
                     // To inverse the logic, do this instead: dtCustomConfig = $.extend({},dtCustomConfig, Model.defaultDtConfigValue);
                        

                     dtCustomConfig = $.extend({}, dtCustomConfig, DataTableConfig.dtDefaults);

                        

                    var dtTable  = _jQueryTable .DataTable(dtCustomConfig);//Init dataTable

                        
                            example_render_dt = new DtApi(rawTableName); // will be a global variable
                        



                        

                            
                                var form = _jQueryTable.closest('form') ;
                            

                                       form.on('submit', function (e) {

                                    //TODO: option to send only new ansd modified data
                                               var dataToSubmit =dtTable.rows().data().toArray();


                                    //Will create as many hidden inputs as data length and inject them into the "hiddenTableData" DIV
                                            
                                            $('#dt_example_render_data').val(JSON.stringify(dtTable .rows().data().toArray()));
                                            
                            });
                        


                $("#example_render").on('new_row_added.dt',function(e){onRowAdded(e);});
$("#example_render").on('new_row_adding.dt',function(e){onRowAdding(e);});
$("#example_render").on('row_removing.dt',function(e){onRowRemoving(e);});
$("#example_render").on('row_removed.dt',function(e){onRowRemoved(e);});
$("#example_render").on('row_updating.dt',function(e){OnRowUpdating(e);});
$("#example_render").on('row_updated.dt',function(e){OnRowUpdated(e);});
$("#example_render").on('select',function(e, dt, type, indexes){OnRowSelected(e, dt, type, indexes);});
$("#example_render").on('deselect',function(e, dt, type, indexes){OnRowDeselected(e, dt, type, indexes);});
$("#example_render").on('user-select',function(e, dt, type, cell, originalEvent){beforeRowSelection(e, dt, type, cell, originalEvent);});
 // For events like "OnAddingRow","OnDeletingRow"

            // If a button in a Cell is clicked the we need to "preventDefault" the "user-select" event to prevent accidently selecting/deselecting the row
                        
                            dtTable.on('user-select', function (e, dt, type, cell, originalEvent) { if ($(originalEvent.currentTarget).hasClass('dt-command')) { e.preventDefault(); } });
                        


            
        function setEditCmd() {
            let popupTitle = 'Update Person';

            //TODO: problem with events after deleting items
            _jQueryTable.find('.dt-edit-command').bind('click',function (e) {


                let rowIndex = $(e.target).data('row-index');
                let dt_api = new DtApi(rawTableName);
                let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();
                let html = buildHtmlForEdition(rowOldData);
                Swal.fire({
                    title: `<strong>${popupTitle}</strong>`,
                    icon: 'info',
                    html: '<form class="dt-edit-form" style="text-align:left;">' + html.join('') + '</form>',
                    //focusConfirm: false,
                    className: "dt-popup-edit-swal-actions",
                    showCloseButton: true,
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Save',
                    //confirmButtonAriaLabel: 'Thumbs up, great!',
                    cancelButtonText:
                        '<i class="fa fa-thumbs-down"> Cancel</i>',
                    //cancelButtonAriaLabel: 'Thumbs down',
                    preConfirm: () => {

                        let form = $('.dt-edit-form');
                        $.validator.unobtrusive.parse(form);
                        if (form.valid()==false) {
                            return false;
                        }
                        let result = {};
                        form.submit(function (event) {
                            event.preventDefault();
                            const data = new FormData(event.target);

                            result = Object.fromEntries(data.entries());
                        });

                        form.submit();

                        return result;
                    }
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            alert(JSON.stringify(result.value));
                            updateRow(rowIndex, result.value);
                        }
                    });
            });

        }
        function buildHtmlForEdition(rowOldData) {

            var all_columns = dtTable.settings().init().columns;

            var inputs = [];
            for (var i in all_columns) {
                let col_name = all_columns[i].name;
                let col = dtTable.column(col_name + ':name');

                if (col.dataSrc() != undefined) {
                    if (col.visible()) { //Proceed visible columns
                        if (all_columns[i].type === 'bool') {//For checkboxes

                            let isCheck = rowOldData[col_name] === true ? 'checked="checked"' : '';                                                        

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
            return inputs;
        }

            function updateRow(rowIndex, values) {
                let dt_api = new DtApi(rawTableName);
                let rowOldData = dt_api.recupereLigneParIndex(rowIndex).recupereDonneesLigne();
                dt_api.modifierLigne(values);
           
        }
             
        });

    })();

