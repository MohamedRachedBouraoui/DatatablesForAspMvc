 document.write('<input type="hidden" id="dt_example_render_data" />');

   if ($("#example_render").length==0){
        document.write('<table id="example_render" class="display   table table-striped table-hover table-bordered dataTable " width="100%"></table>');
    }

   var example_render_jQuery=$('#example_render');

$(function() {
   var example_render_isDtAjaxLoadingDefferd = true;

   var dtCustomConfig = {
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
      "visible": false
    },
    {
      "data": "Name",
      "name": "Name",
      "title": "Name",
      "orderable": false,
      "className": "test_class_type",
      "render": function(d,t,r,m){return bold(d,t,r,m);}
    },
    {
      "data": "Age",
      "name": "Age",
      "title": "Age",
      "className": "demo-class"
    },
    {
      "data": "DOB",
      "name": "DOB",
      "title": "DOB",
      "render": $.fn.dataTable.render.moment( 'YYYY/MM/DD' )
    },
    {
      "data": "DOBAsString",
      "name": "DOBAsString",
      "title": "Birthday"
    },
    {
      "data": "Progress",
      "name": "Progress",
      "title": "Progress",
      "render": $.fn.dataTable.render.percentBar('round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'groove')
    },
    {
      "data": null,
      "className": "dt-command",
      "orderable": false,
      "searchable": false,
      "render": function(d,t,r,m){return cmdEditPerson(d,t,r,m);},
      "width": "13%"
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
  "ajax": function (data, callback, settings) { if (example_render_isDtAjaxLoadingDefferd) {  example_render_isDtAjaxLoadingDefferd = false;  callback({data: []}); // don't fire ajax, just return empty set
            return; }

    $.ajax({
  "url": "/Home/GetPeople",
  "method": "POST",
  "beforeSend": function(xhr, opts){ beforeSendFunction(xhr, opts);},
  "success": function(data){ callback(data);onSuccessFunction(data);},
  "error": function(event){ onErrorFunction(event);},
  "data": getPeopleSector(data)
});   },
}; 
var defaultDtConfigObject = DataTableConfig.dtDefaults();
dtCustomConfig = $.extend({},defaultDtConfigObject,dtCustomConfig);

   var _dt_example_render = example_render_jQuery.DataTable(dtCustomConfig); 

     example_render_dt =new DtApi('example_render') 

_dt_example_render.on( 'user-select', function ( e, dt, type, cell, originalEvent ) {  if ( $(originalEvent.currentTarget).hasClass('dt-command') ) { e.preventDefault(); }  } );

   var dt_example_render_enclosing_form = example_render_jQuery.closest('form');

    dt_example_render_enclosing_form.on('submit',function(e){

   var allDtData=_dt_example_render.rows().data().toArray();
    var hiddenInputs='';
    for (var i = 0; i < allDtData.length; i++) {
            var _data = allDtData[i];
            for (const property in _data) {                
                var hiddenInputName=""+"["+i+"]."+property;
                var hiddenInputValue= _data[property];

                if(hiddenInputValue.toString().indexOf('/Date\(')!=-1){ // Convert /Date(ticks)/
                hiddenInputValue = moment(hiddenInputValue).format();
                //hiddenInputValue = moment(hiddenInputValue).format('MM/DD/YYYY HH:mm:ss');
                }

    hiddenInputs+="<input name='"+hiddenInputName+"' type='hidden' value='"+hiddenInputValue+"' />";
            }
        }

    $('#dt_example_render_data').html(hiddenInputs);
});
$("#example_render").on('new_row_added.td',function(e){onRowAdded(e);});
$("#example_render").on('new_row_adding.td',function(e){onRowAdding(e);});
$("#example_render").on('row_removing.td',function(e){onRowRemoving(e);});
$("#example_render").on('row_removed.td',function(e){onRowRemoved(e);});
$("#example_render").on('row_updating.td',function(e){OnRowUpdating(e);});
$("#example_render").on('row_updated.td',function(e){OnRowUpdated(e);});
_dt_example_render.on('select',function(e, dt, type, indexes){OnRowSelected(e, dt, type, indexes);});
_dt_example_render.on('deselect',function(e, dt, type, indexes){OnRowDeselected(e, dt, type, indexes);});
_dt_example_render.on('user-select',function(e, dt, type, cell, originalEvent){beforeRowSelection(e, dt, type, cell, originalEvent);});
});
