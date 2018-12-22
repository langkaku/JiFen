jQuery(document).ready(function() {       
	Metronic.init(); // init metronic core components
	$("#FFlag").on("click","a",function(){
		$("#FFlagName").html($(this).html()+'<b class="caret"></b>');
		init($(this).attr("FFlag"));
	});
	init('');
	$.ajax({
		url:'getMyFenTotal.do',
		data:'',
		dataType:'json',
		type:'POST',
		success: function(data){
			if( data.message.result!=0 ){
				if (data.message.result == 2) {
					parent.window.location = "../login/login.html";
				} else {                        
					failM(data.message.errorMsg);
				}
			} else {
				$("#FFen").html(data.FFen);
				$("#FFenCurrMonth").html(data.FFenCurrMonth);
				$("#FFenToday").html(data.FFenToday);
				$.each(data.aaData,function(index,item){
					$('#FFlag').append('<li><a href="javascript:;" class="btn" FFlag="' + item.FId + '">' + item.FName + '</a><b></b></li>');
				});
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
		}
	});
});
var el = $(".portlet-body");
function init(FFlag) {
	$("#pagination").myPagination({
		currPage: 1,
		pageCount: 1,	 
		cssStyle: 'sabrosus',
		info: { 
			msg_on: false
		},
		ajax: {
			on: true,		
			callback: 'doCallBack',			
			url: "getMyFenLogForMobile.do",
			dataType: 'json',
			ajaxStart: function() {				
				wait(el);
				$("#pagination").hide();
			},
			param: {
				on: true,
				page: 1,
				form: true,
				formData: "FFlag=" + FFlag
			} 
		}
	});
}
function doCallBack(data) {
	complete(el);
	if( data.message.result!=0 ){
		if (data.message.result == 2) {
			parent.window.location = "../login/login.html";
		} else {                        
			failM(data.message.errorMsg);
		}
	} else {
		var _varViewData = "";
		$.each(data.aaData, function(index, item) {
			_varViewData += line(item);
		});
		$("#content").html(_varViewData);
		if (_varViewData !== '') $("#pagination").show(); 
		return;
	}
}
var line = function(item){
	if (item.FCheckEmployeeName == undefined) item.FCheckEmployeeName = '';
	if (item.FCheckTime == undefined) item.FCheckTime = '';
	var str = '';
	var fen = item.FFen;
	if (item.FStatus == Status.FenLogStatus.init) {
		if (item.FItemId === 0 && item.FFen === 0) {
			fen = '待定';
		} else {
			if (item.FRule == 1) {
				fen = '待定';
			} else if (item.FRule == 3) {
				fen = '待定';
			}
		}
	}	
	str += '<table class="table table-bordered table-striped"><tbody>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">单据号</td><td>'+item.FFenLogId+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">积分标题</td><td>'+item.FTitle+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">积分</td><td>'+fen+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">申请人</td><td>'+item.FOrigEmployeeName+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">申请时间</td><td>'+item.FCreateTime+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">状态</td><td>'+getStatusName(Status.FenLogStatus, item.FStatus)+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">审核人</td><td>'+item.FCheckEmployeeName+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">审核时间</td><td>'+item.FCheckTime+'</td></tr>';
	str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">详情</td><td>'+item.FContent+'</td></tr>';
	str += '</tbody></table>';
	return str;
}