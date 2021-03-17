

    let dtModel = {"TableName":"example_render","IdOfHiddenInputHoldingTableData":"dt_example_render_data","NameAttributeForHiddenInputHoldingTableData":"name=\u0027list_items\u0027","TableClassName":"  table table-striped table-hover table-bordered dataTable ","IsDtAjaxLoadingDefferd":"false","CustomConfigValues":"{\"dom\":\"Bfrtipl\",\"searchHighlight\":true,\"colReorder\":{\"fixedColumnsLeft\":1,\"fixedColumnsRight\":1},\"scrollY\":\"400px\",\"processing\":true,\"initComplete\":function(){ onInitComplete(this.api());},\"rowId\":\"Identifiant\",\"columns\":[{\"data\":\"Identifiant\",\"orderable\":false,\"checkboxes\":{\"selectRow\":true}},{\"data\":\"Identifiant\",\"name\":\"Identifiant\",\"title\":\"Identifiant\",\"type\":\"number\",\"visible\":false},{\"data\":\"Name\",\"name\":\"Name\",\"title\":\"Name\",\"type\":\"text\",\"orderable\":false,\"className\":\"test_class_type\",\"render\":function(d,t,r,m){return bold(d,t,r,m);}},{\"data\":\"Age\",\"name\":\"Age\",\"title\":\"Age\",\"type\":\"number\",\"className\":\"demo-class\"},{\"data\":\"DOB\",\"name\":\"DOB\",\"title\":\"DOB\",\"type\":\"date\"},{\"data\":\"IsMaried\",\"name\":\"IsMaried\",\"type\":\"bool\",\"title\":\"Married\",\"render\":function(d,t,r,m){return formatIsMaried(d,t,r,m);}},{\"data\":\"Progress\",\"name\":\"Progress\",\"title\":\"Progress\",\"type\":\"text\",\"render\":$.fn.dataTable.render.percentBar(\u0027round\u0027,\u0027#FFF\u0027, \u0027#269ABC\u0027, \u0027#31B0D5\u0027, \u0027#286090\u0027, 1, \u0027groove\u0027)},{\"data\":null,\"className\":\"dt-command\",\"orderable\":false,\"searchable\":false,\"render\":function(d,t,r,m){return cmdEditPerson(d,t,r,m);},\"width\":\"13%\"},{\"data\":null,\"orderable\":false,\"className\":\"dt-command\",\"render\":function ( data, type, row, meta ){ return \u0027\u003ci class=\"dt-edit-command far fa-edit\" data-row-index=\u0027+meta.row+\u0027\u003e\u003c/i\u003e\u0027;}}],\"order\":[[1,\"asc\"]],\"select\":{\"style\":\"multi\"},\"buttons\":[{\"extend\":\"pdf\",\"text\":\"Export PDF\",\"className\":\"dt_pdf_btn\"}],\"ajax\":function (data, callback, settings) { \r\n    if (_isDtAjaxLoadingDefferd) {\r\n        _isDtAjaxLoadingDefferd = false;\r\n        callback({data: []}); // don\u0027t fire ajax, just return empty set\r\n            return; }\r\n\r\n    $.ajax({\r\n  \"url\": \"/Home/GetPeople\",\r\n  \"method\": \"POST\",\r\n  \"beforeSend\": function(xhr, opts){ beforeSendFunction(xhr, opts);},\r\n  \"success\": function(data){DtDatesHelper.dtConvertDates(data,$(\u0027#example_render\u0027).attr(\u0027default_date_time_format\u0027)); callback(data);onSuccessFunction(data);},\r\n  \"error\": function(event){ onErrorFunction(event);},\r\n  \"data\": getPeopleSector(data)\r\n});\r\n    }}","HasDefaultSettings":true,"DefaultConfigValues":"DataTableConfig.dtDefaults","DoCreateDtApiInstance":true,"DtApiInstanceName":"example_render_dt","HasCheckBoxColumn":true,"IsUsedInForm":true,"FormId":"","SubmitWithMultiHiddenInputs":false,"PrefixForMultiHiddenInputs":null,"NativeEvents":"$(\"#example_render\").on(\u0027new_row_added.dt\u0027,function(e){onRowAdded(e);});\r\n$(\"#example_render\").on(\u0027new_row_adding.dt\u0027,function(e){onRowAdding(e);});\r\n$(\"#example_render\").on(\u0027row_removing.dt\u0027,function(e){onRowRemoving(e);});\r\n$(\"#example_render\").on(\u0027row_removed.dt\u0027,function(e){onRowRemoved(e);});\r\n$(\"#example_render\").on(\u0027row_updating.dt\u0027,function(e){OnRowUpdating(e);});\r\n$(\"#example_render\").on(\u0027row_updated.dt\u0027,function(e){OnRowUpdated(e);});\r\n$(\"#example_render\").on(\u0027select\u0027,function(e, dt, type, indexes){OnRowSelected(e, dt, type, indexes);});\r\n$(\"#example_render\").on(\u0027deselect\u0027,function(e, dt, type, indexes){OnRowDeselected(e, dt, type, indexes);});\r\n$(\"#example_render\").on(\u0027user-select\u0027,function(e, dt, type, cell, originalEvent){beforeRowSelection(e, dt, type, cell, originalEvent);});\r\n","HasClickEvents":false,"ClickEvents":null,"IsSubmitOnlyNewAndModifiedRows":false,"TableDefaultDatesFormat":"YYYY-MM-DD","HasEditRowCommand":true,"EditPopupTitle":"Update Person"};


    module_example_render = (function () {
        $(function () {

            let rawTableName = dtModel.TableName;

            let closestDiv = document.getElementById(`div__dt__${rawTableName}`); //This div is added in DtModel.cs --> ToString()

            let _jQueryTable = DtTableHtmlHelper.createTable(dtModel, closestDiv);


                         //Edit Column
                
            _jQueryTable.on('draw.dt', function () { DtEditCmd.setEditCmd(dtModel, _jQueryTable, rawTableName); });
                




                    // if true then the "ajax" call will not trigger on first time: See the "ajax" settings for the Datatable in the "dtCustomConfig" object
                    // NB: Must be placed here (just before the "dtCustomConfig")
                    // Used in 'DtModel.cd --> InitDataTableConfig --> Ajax config'
                    let _isDtAjaxLoadingDefferd  =dtModel.IsDtAjaxLoadingDefferd;

                     let dtCustomConfig ={"dom":"Bfrtipl","searchHighlight":true,"colReorder":{"fixedColumnsLeft":1,"fixedColumnsRight":1},"scrollY":"400px","processing":true,"initComplete":function(){ onInitComplete(this.api());},"rowId":"Identifiant","columns":[{"data":"Identifiant","orderable":false,"checkboxes":{"selectRow":true}},{"data":"Identifiant","name":"Identifiant","title":"Identifiant","type":"number","visible":false},{"data":"Name","name":"Name","title":"Name","type":"text","orderable":false,"className":"test_class_type","render":function(d,t,r,m){return bold(d,t,r,m);}},{"data":"Age","name":"Age","title":"Age","type":"number","className":"demo-class"},{"data":"DOB","name":"DOB","title":"DOB","type":"date"},{"data":"IsMaried","name":"IsMaried","type":"bool","title":"Married","render":function(d,t,r,m){return formatIsMaried(d,t,r,m);}},{"data":"Progress","name":"Progress","title":"Progress","type":"text","render":$.fn.dataTable.render.percentBar('round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'groove')},{"data":null,"className":"dt-command","orderable":false,"searchable":false,"render":function(d,t,r,m){return cmdEditPerson(d,t,r,m);},"width":"13%"},{"data":null,"orderable":false,"className":"dt-command","render":function ( data, type, row, meta ){ return '<i class="dt-edit-command far fa-edit" data-row-index='+meta.row+'></i>';}}],"order":[[1,"asc"]],"select":{"style":"multi"},"buttons":[{"extend":"pdf","text":"Export PDF","className":"dt_pdf_btn"}],"ajax":function (data, callback, settings) { 
    if (_isDtAjaxLoadingDefferd) {
        _isDtAjaxLoadingDefferd = false;
        callback({data: []}); // don't fire ajax, just return empty set
            return; }

    $.ajax({
  "url": "/Home/GetPeople",
  "method": "POST",
  "beforeSend": function(xhr, opts){ beforeSendFunction(xhr, opts);},
  "success": function(data){DtDatesHelper.dtConvertDates(data,$('#example_render').attr('default_date_time_format')); callback(data);onSuccessFunction(data);},
  "error": function(event){ onErrorFunction(event);},
  "data": getPeopleSector(data)
});
    }};


                     //Will merge custom and default settings for the datatable: in this case, default settings will be overwritten by custom ones having same name
                     // To inverse the logic, do this instead: dtCustomConfig = $.extend({},dtCustomConfig, Model.defaultDtConfigValue());
            if (dtModel.HasDefaultSettings)
                    {
                        dtCustomConfig = $.extend({}, DataTableConfig.dtDefaults (), dtCustomConfig);
                    }


                    let dtTable  = _jQueryTable .DataTable(dtCustomConfig);//Init dataTable

            if (dtModel.DoCreateDtApiInstance) //Create an instance for the DtApi
                    {
                            example_render_dt = new DtApi(rawTableName); // will be a global variable
                    }

            if (dtModel.IsUsedInForm)
                    {
                DtFormHelper.setupForm(dtModel, closestDiv, dtTable, _jQueryTable);

                    }




            DtEventsHelper.setupEvents(dtModel, dtTable);

        });
    })();

