module_example_render=function(){$(function(){let n={TableName:"example_render",IdOfHiddenInputHoldingTableData:"dt_example_render_data",NameAttributeForHiddenInputHoldingTableData:"name='list_items'",TableClassName:"  table table-striped table-hover table-bordered dataTable ",IsDtAjaxLoadingDefferd:"false",CustomConfigValues:'{"dom":"Bfrtipl","searchHighlight":true,"colReorder":{"fixedColumnsLeft":1,"fixedColumnsRight":1},"scrollY":"400px","processing":true,"initComplete":function(){ onInitComplete(this.api());},"rowId":"Identifiant","columns":[{"data":"Identifiant","orderable":false,"checkboxes":{"selectRow":true}},{"data":"Identifiant","name":"Identifiant","title":"Identifiant","type":"number","visible":false},{"data":"Name","name":"Name","title":"Name","type":"text","orderable":false,"className":"test_class_type","render":function(d,t,r,m){return bold(d,t,r,m);}},{"data":"Age","name":"Age","title":"Age","type":"number","className":"demo-class"},{"data":"DOB","name":"DOB","title":"DOB","type":"date"},{"data":"IsMaried","name":"IsMaried","type":"bool","title":"Married","render":function(d,t,r,m){return formatIsMaried(d,t,r,m);}},{"data":"Progress","name":"Progress","title":"Progress","type":"text","render":$.fn.dataTable.render.percentBar(\'round\',\'#FFF\', \'#269ABC\', \'#31B0D5\', \'#286090\', 1, \'groove\')},{"data":null,"className":"dt-command","orderable":false,"searchable":false,"render":function(d,t,r,m){return cmdEditPerson(d,t,r,m);},"width":"13%"},{"data":null,"orderable":false,"className":"dt-command","render":function ( data, type, row, meta ){\r\n    if(row.isDirty){\r\nconsole.log(\'row.tdUid: \'+row.tdUid);\r\n    return \'<i class="dt-cancel-edit-command fas fa-undo-alt" data-row-index=\'+meta.row+\' data-td-uid=\'+row.td_uid+\'><\/i>\';\r\n    }\r\n        return \'<i class="dt-edit-command far fa-edit" data-row-index=\'+meta.row+\'><\/i>\';\r\n    }}],"order":[[1,"asc"]],"select":{"style":"multi"},"buttons":[{"extend":"pdf","text":"Export PDF","className":"dt_pdf_btn"}],"ajax":function (data, callback, settings) { \r\n    if (_isDtAjaxLoadingDefferd) {\r\n        _isDtAjaxLoadingDefferd = false;\r\n        callback({data: []}); // don\'t fire ajax, just return empty set\r\n            return; }\r\n\r\n    $.ajax({\r\n  "url": "/Home/GetPeople",\r\n  "method": "POST",\r\n  "beforeSend": function(xhr, opts){ beforeSendFunction(xhr, opts);},\r\n  "success": function(data){DtDatesHelper.dtConvertDates(data,$(\'#example_render\').attr(\'default_date_time_format\')); callback(data);onSuccessFunction(data);},\r\n  "error": function(event){ onErrorFunction(event);},\r\n  "data": getPeopleSector(data)\r\n});\r\n    }}',HasDefaultSettings:!0,DefaultConfigValues:"DataTableConfig.dtDefaults",DoCreateDtApiInstance:!0,DtApiInstanceName:"example_render_dt",HasCheckBoxColumn:!0,IsUsedInForm:!0,FormId:"",SubmitWithMultiHiddenInputs:!1,PrefixForMultiHiddenInputs:null,NativeEvents:"$(\"#example_render\").on('new_row_added.dt',function(e){onRowAdded(e);});\r\n$(\"#example_render\").on('new_row_adding.dt',function(e){onRowAdding(e);});\r\n$(\"#example_render\").on('row_removing.dt',function(e){onRowRemoving(e);});\r\n$(\"#example_render\").on('row_removed.dt',function(e){onRowRemoved(e);});\r\n$(\"#example_render\").on('row_updating.dt',function(e){OnRowUpdating(e);});\r\n$(\"#example_render\").on('row_updated.dt',function(e){OnRowUpdated(e);});\r\n$(\"#example_render\").on('select',function(e, dt, type, indexes){OnRowSelected(e, dt, type, indexes);});\r\n$(\"#example_render\").on('deselect',function(e, dt, type, indexes){OnRowDeselected(e, dt, type, indexes);});\r\n$(\"#example_render\").on('user-select',function(e, dt, type, cell, originalEvent){beforeRowSelection(e, dt, type, cell, originalEvent);});\r\n",HasClickEvents:!1,ClickEvents:null,IsSubmitOnlyNewAndModifiedRows:!1,TableDefaultDatesFormat:"YYYY-MM-DD",HasEditRowCommand:!0,EditPopupTitle:"Update Person !!"},i=n.TableName,u=document.getElementById(`div__dt__${i}`),t=DtTableHtmlHelper.createTable(n,u);t.on("draw.dt",function(){DtEditCmd.setEditCmd(n,t,i)});let f=n.IsDtAjaxLoadingDefferd,r={dom:"Bfrtipl",searchHighlight:!0,colReorder:{fixedColumnsLeft:1,fixedColumnsRight:1},scrollY:"400px",processing:!0,initComplete:function(){onInitComplete(this.api())},rowId:"Identifiant",columns:[{data:"Identifiant",orderable:!1,checkboxes:{selectRow:!0}},{data:"Identifiant",name:"Identifiant",title:"Identifiant",type:"number",visible:!1},{data:"Name",name:"Name",title:"Name",type:"text",orderable:!1,className:"test_class_type",render:function(n,t,i,r){return bold(n,t,i,r)}},{data:"Age",name:"Age",title:"Age",type:"number",className:"demo-class"},{data:"DOB",name:"DOB",title:"DOB",type:"date"},{data:"IsMaried",name:"IsMaried",type:"bool",title:"Married",render:function(n,t,i,r){return formatIsMaried(n,t,i,r)}},{data:"Progress",name:"Progress",title:"Progress",type:"text",render:$.fn.dataTable.render.percentBar("round","#FFF","#269ABC","#31B0D5","#286090",1,"groove")},{data:null,className:"dt-command",orderable:!1,searchable:!1,render:function(n,t,i,r){return cmdEditPerson(n,t,i,r)},width:"13%"},{data:null,orderable:!1,className:"dt-command",render:function(n,t,i,r){return i.isDirty?(console.log("row.tdUid: "+i.tdUid),'<i class="dt-cancel-edit-command fas fa-undo-alt" data-row-index='+r.row+" data-td-uid="+i.td_uid+"><\/i>"):'<i class="dt-edit-command far fa-edit" data-row-index='+r.row+"><\/i>"}}],order:[[1,"asc"]],select:{style:"multi"},buttons:[{extend:"pdf",text:"Export PDF",className:"dt_pdf_btn"}],ajax:function(n,t){if(f){f=!1;t({data:[]});return}$.ajax({url:"/Home/GetPeople",method:"POST",beforeSend:function(n,t){beforeSendFunction(n,t)},success:function(n){DtDatesHelper.dtConvertDates(n,$("#example_render").attr("default_date_time_format"));t(n);onSuccessFunction(n)},error:function(n){onErrorFunction(n)},data:getPeopleSector(n)})}};n.HasDefaultSettings&&(r=$.extend({},DataTableConfig.dtDefaults(),r));let e=t.DataTable(r);n.DoCreateDtApiInstance&&(example_render_dt=new DtApi(i));n.IsUsedInForm&&DtFormHelper.setupForm(n,u,e,t);DtEventsHelper.setupEvents(n,e)})}()
