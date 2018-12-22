var Module = function () {
	var form1 = $('#form1');
	var ageMonthFen = 0;
	var signPercentMapSize = 0;
	var table1 = $('#table1');
	var el = $('body');
	$.extend(true, $.fn.DataTable.TableTools.classes, {"container": "btn-group tabletools-dropdown-on-portlet","buttons": {"normal": "btn btn-sm default","disabled": "btn btn-sm default disabled"},"collection": {"container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"}});        
	var oTable1 = table1.dataTable({
		"aaSorting": [],
		"order": [[ 7, "desc" ]],			
		"sAjaxSource": "getList.do",
		"aoColumns": [
			{"mData":"FEmployeeName"},
			{"mData":"FDeptFen"},
			{"mData":"FPositionFen"},
			{"mData":"FEducationFen"},
			{"mData":"FTitleFens"},
			{"mData":"FSpecFens"},			
			{"mData":"FAgeFen"},
			{"mData":"FFenBase"}		
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
	$("div.buttons").html('<span style="color:green;font-weight:bold; font-size:16px;">每个人的月基础分是在每月的1号由系统自动发</span>');
	var tableWrapper = $("#table1_wrapper");
	tableWrapper.find(".dataTables_length select").select2({
		showSearchInput: true
	});
	$("#modal1").draggable({
		handle: ".modal-header"
	});
	var el2 = $("#modal1 > .modal-dialog"); 
	$('#ageMonthFenSet').click(function() {
		$("#modal1").modal("show");			
		$('.Metronic-alerts').remove();
		validator.resetForm();
		var url ="getAgeMonthFen.do";
		$.ajax({
			url:url ,
			data: '',
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(el2);
				if( data.message.result!=0 ){
					window.setTimeout(function() {
						errorTip(data.message.errorMsg, ".form-body");
					}, 300);
				} else {
					$(":input[name=ageMonthFen]").val(data.ageMonthFen);								
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(el2);
				errorTip('操作失败', ".form-body");
			}
		});  		
	});
	var modifyPost = function () {
		var url ="ageMonthFenModify.do";
		var queryString = $("#form1").serialize();
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(el2);
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
				complete(el2);
				errorTip('操作失败', ".form-body");
			}
		});
	}
	$("#ageMonthFen").change(function(){
		formatFen(this);
	});
	$("#down").click(function(){
		downFen("#ageMonthFen");
	});
	$("#up").click(function(){
		upFen("#ageMonthFen");
	});		
	var validator = form1.validate({
		errorElement: 'span',
		errorClass: 'help-block help-block-error',
		focusInvalid: false,
		ignore: "",
		messages: {
		},
		rules: {
			ageMonthFen: {
				required: true,
				range:[0, Status.FenRangeStatus.max]
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
			modifyPost();
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

	return {
		init: function () {
		}
	};
}();