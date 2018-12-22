var Module = function () {
	var nEditing = null;    	
	var table1 = $('#table1');
	var form1 = $('#form1');
	var el = $("#modal1 > .modal-dialog"); 
	$("#FMonthFen").change(function(){
		formatFen(this);
	});
	$("#down").click(function(){
		downFen("#FMonthFen");
	});
	$("#up").click(function(){
		upFen("#FMonthFen");
	});		
	$.extend(true, $.fn.DataTable.TableTools.classes, {"container": "btn-group tabletools-dropdown-on-portlet","buttons": {"normal": "btn btn-sm default","disabled": "btn btn-sm default disabled"},"collection": {"container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"}});        
	var oTable1 = table1.dataTable({
		"aaSorting": [],
		"sAjaxSource": "getEducationList.do?sTempTableParent=.portlet-body",
		"aoColumns": [
			{"mData":"FEducationName"},
			{"mData":"FMonthFen"},
			{
				"mData": null,
				"bSortable": false,
				"fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
					$(nTd).html('<a class="modify btn default btn-xs purple" href="javascript:;" iRow="' + iRow + '">编辑</a><a class="delete btn default btn-xs" href="javascript:;" iRow="' + iRow + '">删除</a>');
				}
			}
		],
		"sServerMethod": "POST",
		"bProcessing": true,
		"sPaginationType": "full_numbers",
		"oLanguage": {
			"sLengthMenu": " _MENU_ ",
			"sZeroRecords": "抱歉， 没有找到",
			"sInfo": "_START_ 至 _END_ /共 _TOTAL_ 行",
			"sInfoEmpty": "没有数据",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"sSearch": "检索",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "前一页",
				"sNext": "后一页",
				"sLast": "尾页"
			},
			"sZeroRecords": "没有检索到数据",
			"sProcessing": "<div class='block-spinner-bar'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>"
		},
		"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'<'pull-left'f>><'col-md-6 col-sm-12'<'buttons pull-right'>>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
		"tableTools": {
			"sSwfPath": "../../assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
			"aButtons": [{
				"sExtends": "csv",
				"sButtonText": "CSV"
			}, {
				"sExtends": "xls",
				"sButtonText": "Excel"
			}, {
				"sExtends": "copy",
				"sButtonText": "复制"
			}]
		}
	});
	$("div.buttons").html('<a class="btn btn-default add"><i class="fa fa-plus"></i> 添加 </a>');
	var tableWrapper = $("#table1_wrapper");
	tableWrapper.find(".dataTables_length select").select2({
		showSearchInput: true
	});

	var validator = form1.validate({
		errorElement: 'span',
		errorClass: 'help-block help-block-error',
		focusInvalid: false,
		ignore: "",
		messages: {
		},
		rules: {
			FEducationName: {
				minlength: 2,
				required: true
			},
			FMonthFen: {
				required: true,
				range:[Status.FenRangeStatus.min, Status.FenRangeStatus.max]
			}                 
		},
		messages: {
		},        
		errorPlacement: function (error, element) { // render error placement for each input type
			if (element.parent(".input-group").size() > 0) {
				error.insertAfter(element.parent(".input-group"));
			} else if (element.attr("data-error-container")) { 
				error.appendTo(element.attr("data-error-container"));
			} else if (element.parents('.radio-list').size() > 0) { 
				error.appendTo(element.parents('.radio-list').attr("data-error-container"));
			} else if (element.parents('.radio-inline').size() > 0) { 
				error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
			} else if (element.parents('.checkbox-list').size() > 0) {
				error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
			} else if (element.parents('.checkbox-inline').size() > 0) { 
				error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
			} else {
				error.insertAfter(element); // for other inputs, just perform default behavior
			}
		},            
		invalidHandler: function (event, validator) {              
		},
		highlight: function (element) {
			$(element)
			.closest('.form-group').addClass('has-error');
		},
		unhighlight: function (element) {
			$(element)
			.closest('.form-group').removeClass('has-error');
		},
		success: function (label) {
			label
			.closest('.form-group').removeClass('has-error');
		},
		submitHandler: function (form) {
			if (nEditing == null) {
				addPost();
			} else {
				modifyPost();
			}
		}
	});        

	$("#modal1").draggable({
		handle: ".modal-header"
	});

	$("#save").click(function(){
		if (form1.valid()) {
			form1.submit();
		}
	});
	$(".add").live('click', function(){
		nEditing = null;
		complete(el);
		$("#modal1").modal("show");
		document.form1.reset();
		$('.Metronic-alerts').remove();
		validator.resetForm();
		$("#addTitle").css('display','block');
		$("#modifyTitle").css('display','none');
	});
	var addPost = function () {
		wait(el);            	
		var url ="educationAdd.do" ;			
		var queryString = $("#form1").serialize();
		$.ajax({
			url:url,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(el);
				if( data.message.result!=0 ){
					window.setTimeout(function() {
					errorTip(data.message.errorMsg, ".form-body");
					}, 300);
				} else {
					oTable1.fnAddData(data.model);
					oTable1.fnPageChange('last', true); 	            	
					$("#modal1").modal("hide");						
					success('添加成功');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(el);
				errorTip('操作失败', ".form-body");
			}
		});
	}

	table1.on('click', '.modify', function (e) {
		e.preventDefault();
		var iRow = $(this).parents('tr')[0];
		modify(iRow);
	});
	$(".temp-table .modify").live("click", function(){
		iRow = $(this).attr("iRow");
		modify(iRow);
	});	
	var modify = function(iRow) {
		var aData = oTable1.fnGetData(iRow);
		nEditing = iRow;
		complete(el);
		$("#modal1").modal("show");			
		$('.Metronic-alerts').remove();
		validator.resetForm();
		$("#addTitle").css('display','none');
		$("#modifyTitle").css('display','block');		
		$(":input[name=FEducationId]").val(aData.FEducationId);
		$(":input[name=FEducationName]").val(aData.FEducationName);
		$(":input[name=FMonthFen]").val(aData.FMonthFen);		
	};
	var modifyPost = function () {
		wait(el);          
		var url ="educationModify.do" ;
		var queryString = $("#form1").serialize();
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(el);
				if( data.message.result!=0 ){
					window.setTimeout(function() {
					errorTip(data.message.errorMsg, ".form-body");
					}, 300);
				} else {
					oTable1.fnReloadAjax();
					$("#modal1").modal("hide");
					success('修改成功');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(el);
				errorTip('操作失败', ".form-body");
			}
		});
	}

	table1.on('click', '.delete', function (e) {
		e.preventDefault();
		var iRow = $(this).parents('tr')[0];
		deleteConfirm(iRow);
	});
	$(".temp-table .delete").live("click", function(){
		iRow = $(this).attr("iRow");
		deleteConfirm(iRow);
	});	
	var deleteConfirm = function(iRow) {
		confirm("是否确认删除,删除后无法还原?", function(result) {
			if (result) {
				var aData = oTable1.fnGetData(iRow);
				var url ="educationDelete.do";
				var queryString = "FEducationId=" + aData.FEducationId;
				$.ajax({
					url:url ,
					data: queryString,
					dataType: 'json',
					type: 'POST',
					success: function (data) {
						if( data.message.result!=0 ){
							fail(data.message.errorMsg);
						} else {
							oTable1.fnReloadAjax();
							success('删除成功');
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						
					}
				});
			}
		}); 	
	};
	return {
		init: function () {
	
		}
	};
}();