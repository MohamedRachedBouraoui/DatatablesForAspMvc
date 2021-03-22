

    module_example_render = (function () {

            
            let isDtAjaxLoadingDefferd = false;
            

        $(function () {

                dtModel = {"TableName":"example_render","IdOfHiddenInputHoldingTableData":"dt_example_render_data","NameAttributeForHiddenInputHoldingTableData":"name=\u0027list_items\u0027","TableClassName":"  table table-striped table-hover table-bordered dataTable ","IsDtAjaxLoadingDefferd":false,"CustomConfigValues":"{\r\n  \"dom\": \"Bfrtipl\",\r\n  \"searchHighlight\": true,\r\n  \"scrollY\": \"400px\",\r\n  \"processing\": true,\r\n  \"initComplete\": function(){ onInitComplete(this.api());},\r\n  \"rowId\": \"Identifiant\",\r\n  \"columns\": [\r\n    {\r\n      \"data\": \"Identifiant\",\r\n      \"name\": \"Identifiant\",\r\n      \"title\": \"Identifiant\",\r\n      \"type\": \"number\",\r\n      \"searchable\": false,\r\n      \"orderable\": false,\r\n      \"visible\": false\r\n    },\r\n    {\r\n      \"data\": \"Name\",\r\n      \"name\": \"Name\",\r\n      \"title\": \"Name\",\r\n      \"type\": \"text\",\r\n      \"orderable\": false,\r\n      \"className\": \"test_class_type\",\r\n      \"render\": function(d,t,r,m){return bold(d,t,r,m);}\r\n    },\r\n    {\r\n      \"data\": \"Age\",\r\n      \"name\": \"Age\",\r\n      \"title\": \"Age\",\r\n      \"type\": \"number\",\r\n      \"className\": \"demo-class\"\r\n    },\r\n    {\r\n      \"data\": \"DOB\",\r\n      \"name\": \"DOB\",\r\n      \"title\": \"DOB\",\r\n      \"type\": \"date\"\r\n    },\r\n    {\r\n      \"data\": \"IsMaried\",\r\n      \"name\": \"IsMaried\",\r\n      \"type\": \"bool\",\r\n      \"title\": \"Married\",\r\n      \"render\": function(d,t,r,m){return formatIsMaried(d,t,r,m);}\r\n    },\r\n    {\r\n      \"data\": \"Progress\",\r\n      \"name\": \"Progress\",\r\n      \"title\": \"Progress\",\r\n      \"type\": \"text\",\r\n      \"render\": $.fn.dataTable.render.percentBar(\u0027round\u0027,\u0027#FFF\u0027, \u0027#269ABC\u0027, \u0027#31B0D5\u0027, \u0027#286090\u0027, 1, \u0027groove\u0027)\r\n    },\r\n    {\r\n      \"data\": null,\r\n      \"className\": \"dt-command\",\r\n      \"orderable\": false,\r\n      \"searchable\": false,\r\n      \"render\": function(d,t,r,m){return cmdEditPerson(d,t,r,m);},\r\n      \"width\": \"13%\"\r\n    },\r\n    {\r\n      \"data\": null,\r\n      \"className\": \"dt-command\",\r\n      \"orderable\": false,\r\n      \"searchable\": false,\r\n      \"width\": \"1em\",\r\n      \"render\": function(data, type, row, meta){return DtEventsHelper.renderEditRowCommand(data, type, row, meta);}\r\n    },\r\n    {\r\n      \"data\": null,\r\n      \"className\": \"dt-command dt-command-checkbox\",\r\n      \"orderable\": false,\r\n      \"searchable\": false,\r\n      \"width\": \"15px\",\r\n      \"render\": function(d,t,r,m){return DtCheckBoxColumnHelper.render(d,t,r,m,\u0027chk_1\u0027);},\r\n      \"title\": \"\u003cinput type=\u0027checkbox\u0027 id=\u0027chk_1\u0027 class=\u0027dt_checkbox_all_chk_1 dt_checkbox_all_col\u0027\u003e\"\r\n    },\r\n    {\r\n      \"data\": null,\r\n      \"className\": \"dt-command dt-command-checkbox\",\r\n      \"orderable\": false,\r\n      \"searchable\": false,\r\n      \"width\": \"15px\",\r\n      \"render\": function(d,t,r,m){return DtCheckBoxColumnHelper.render(d,t,r,m,\u0027chk_2\u0027);},\r\n      \"title\": \"\u003cinput type=\u0027checkbox\u0027 id=\u0027chk_2\u0027 class=\u0027dt_checkbox_all_chk_2 dt_checkbox_all_col\u0027\u003e\"\r\n    }\r\n  ],\r\n  \"buttons\": [\r\n    {\r\n      \"extend\": \"pdf\",\r\n      \"text\": \"Export PDF\",\r\n      \"className\": \"dt_pdf_btn\"\r\n    }\r\n  ],\r\n  \"ajax\": function (data, callback, settings) { DtAjaxHelper.setAjaxForDt(module_example_render,data, callback, settings,{\r\n  \"url\": \"/Home/GetPeople\",\r\n  \"method\": \"POST\",\r\n  \"beforeSend\": function(xhr, opts){ beforeSendFunction(xhr, opts);},\r\n  \"success\": function(data){  DtDatesHelper.dtConvertDates(data,$(\u0027#example_render\u0027).attr(\u0027default_date_time_format\u0027)); callback(data);onSuccessFunction(data);},\r\n  \"error\": function(event){ onErrorFunction(event);},\r\n  \"data\": getPeopleSector(data)\r\n});}\r\n}","HasDefaultSettings":true,"DefaultConfigValues":"DataTableConfig.dtDefaults","DoCreateDtApiInstance":true,"DtApiInstanceName":"example_render_dt","HasCheckBoxColumn":true,"IsUsedInForm":true,"FormId":"","SubmitWithMultiHiddenInputs":false,"PrefixForMultiHiddenInputs":null,"NativeEvents":"$(\"#example_render\").on(\u0027new_row_added.dt\u0027,function(e){onRowAdded(e);});\r\n$(\"#example_render\").on(\u0027new_row_adding.dt\u0027,function(e){onRowAdding(e);});\r\n$(\"#example_render\").on(\u0027row_removing.dt\u0027,function(e){onRowRemoving(e);});\r\n$(\"#example_render\").on(\u0027row_removed.dt\u0027,function(e){onRowRemoved(e);});\r\n$(\"#example_render\").on(\u0027row_updating.dt\u0027,function(e){OnRowUpdating(e);});\r\n$(\"#example_render\").on(\u0027row_updated.dt\u0027,function(e){OnRowUpdated(e);});\r\n$(\"#example_render\").on(\u0027select\u0027,function(e, dt, type, indexes){OnRowSelected(e, dt, type, indexes);});\r\n$(\"#example_render\").on(\u0027deselect\u0027,function(e, dt, type, indexes){OnRowDeselected(e, dt, type, indexes);});\r\n$(\"#example_render\").on(\u0027user-select\u0027,function(e, dt, type, cell, originalEvent){beforeRowSelection(e, dt, type, cell, originalEvent);});\r\n","HasClickEvents":false,"ClickEvents":null,"IsSubmitOnlyNewAndModifiedRows":false,"TableDefaultDatesFormat":"YYYY-MM-DD","HasEditRowCommand":true,"EditPopupTitle":"Update Person !!","FetchEditViewFromServerSide":false,"FetchEditViewFromUrl":null,"ValidateEditViewByUrl":null,"HasCheckboxColumns":true};

                let rawTableName = dtModel.TableName;

                let closestDiv = document.getElementById(`div__dt__${rawTableName}`); //This div is added in DtModel.cs --> ToString()

                let _jQueryTable = DtTableHtmlHelper.createTable(dtModel, closestDiv);


                
                //Edit Column: must be setup before datatable creation to catch the draw event
            _jQueryTable.on('draw.dt', function () { DtEditCmd.setEditCmd(dtModel, _jQueryTable, rawTableName); });
                

                
                //Checkbox Column: must be setup before datatable creation to catch the draw event
            _jQueryTable.on('draw.dt', function () { DtCheckBoxColumnHelper.setupCheckboxColumns(dtModel, _jQueryTable, rawTableName); });
                



                let dtCustomConfig ={
  "dom": "Bfrtipl",
  "searchHighlight": true,
  "scrollY": "400px",
  "processing": true,
  "initComplete": function(){ onInitComplete(this.api());},
  "rowId": "Identifiant",
  "columns": [
    {
      "data": "Identifiant",
      "name": "Identifiant",
      "title": "Identifiant",
      "type": "number",
      "searchable": false,
      "orderable": false,
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
      "className": "dt-command",
      "orderable": false,
      "searchable": false,
      "width": "1em",
      "render": function(data, type, row, meta){return DtEventsHelper.renderEditRowCommand(data, type, row, meta);}
    },
    {
      "data": null,
      "className": "dt-command dt-command-checkbox",
      "orderable": false,
      "searchable": false,
      "width": "15px",
      "render": function(d,t,r,m){return DtCheckBoxColumnHelper.render(d,t,r,m,'chk_1');},
      "title": "<input type='checkbox' id='chk_1' class='dt_checkbox_all_chk_1 dt_checkbox_all_col'>"
    },
    {
      "data": null,
      "className": "dt-command dt-command-checkbox",
      "orderable": false,
      "searchable": false,
      "width": "15px",
      "render": function(d,t,r,m){return DtCheckBoxColumnHelper.render(d,t,r,m,'chk_2');},
      "title": "<input type='checkbox' id='chk_2' class='dt_checkbox_all_chk_2 dt_checkbox_all_col'>"
    }
  ],
  "buttons": [
    {
      "extend": "pdf",
      "text": "Export PDF",
      "className": "dt_pdf_btn"
    }
  ],
  "ajax": function (data, callback, settings) { DtAjaxHelper.setAjaxForDt(module_example_render,data, callback, settings,{
  "url": "/Home/GetPeople",
  "method": "POST",
  "beforeSend": function(xhr, opts){ beforeSendFunction(xhr, opts);},
  "success": function(data){  DtDatesHelper.dtConvertDates(data,$('#example_render').attr('default_date_time_format')); callback(data);onSuccessFunction(data);},
  "error": function(event){ onErrorFunction(event);},
  "data": getPeopleSector(data)
});}
};



                
                //Will merge custom and default settings for the datatable:
                //in this case, default settings will be overwritten by custom ones having same name
                // To inverse the logic, do this instead: dtCustomConfig = $.extend({},dtCustomConfig, Model.defaultDtConfigValue());

                    dtCustomConfig = $.extend({}, DataTableConfig.dtDefaults (), dtCustomConfig);
                

                //Init dataTable
                let dtTable =  _jQueryTable .DataTable(dtCustomConfig);

                //Create an instance for the DtApi
                    
                    // will be a global variable
                    example_render_dt = new DtApi(rawTableName);
                    

                // data setup for form-Submit
             
                DtFormHelper.convertFormDataIntoHiddenInputsForSubmit(dtModel, closestDiv, dtTable, _jQueryTable);
             

                DtEventsHelper.setupEvents(dtModel, dtTable);


            });//JS block-End

            function deferAjaxCall() {
                return isDtAjaxLoadingDefferd ;
            }
            function cancelDeferAjaxCall() {
                isDtAjaxLoadingDefferd =false;
            }

            return {
                deferAjaxCall,
                cancelDeferAjaxCall
            }
        })();

