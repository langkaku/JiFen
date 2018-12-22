var Module = function () {
	var oDate = new Date();
	var date = oDate.getFullYear() + '-' + (oDate.getMonth()+1) + '-' + oDate.getDate();
	var ding = true;
	var qiniuDomain;
	var DB = window.location.host.substring(0, window.location.host.indexOf("."));
	var itemJson;
	var el1 = $("body"); 
	function Levenshtein_Distance(s,t){
		var n=s.length;// length of s
		var m=t.length;// length of t
		var d=[];// matrix
		var i;// iterates through s
		var j;// iterates through t
		var s_i;// ith character of s
		var t_j;// jth character of t
		var cost;// cost
		// Step 1
		if (n == 0) return m;
		if (m == 0) return n;
		// Step 2
		for (i = 0; i <= n; i++) {
			d[i]=[];
			d[i][0] = i;
		}
		for (j = 0; j <= m; j++) {
			d[0][j] = j;
		}
		// Step 3
		for (i = 1; i <= n; i++) {
			s_i = s.charAt (i - 1);
			// Step 4
			for (j = 1; j <= m; j++) {
				t_j = t.charAt (j - 1);
				// Step 5
				if (s_i == t_j) {
					cost = 0;
				}else{
					cost = 1;
				}
				// Step 6
				d[i][j] = Minimum (d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1] + cost);
			}
		}
		// Step 7
		return d[n][m];
	}
	function Levenshtein_Distance_Percent(s,t){
		var l=s.length>t.length?s.length:t.length;
		var d=Levenshtein_Distance(s,t);
		return (1-d/l).toFixed(4);
	}
	function Minimum(a,b,c){
		return a<b?(a<c?a:c):(b<c?b:c);
	}

	var by = function(name) {
		return function(o, p) {
			var a, b;
			if (typeof o === "object" && typeof p === "object" && o && p)
			{
				a = o[name];
				b = p[name];
				if (a === b) {return 0;}
				if (typeof a === typeof b) { return a > b ? -1 : 1;}
				return typeof a > typeof b ? -1 : 1;
			}
			else {throw ("error"); }
		}
	}
	var filter = function(text,data){
		var value = [];
		for (var i = 0; i < data.length; i++) {
			var val = Levenshtein_Distance_Percent(text,data[i].FTitle);
			data[i].val = val;
		};
		data.sort(by("val"));
		for (var i = 0; i < data.length; i++) {
			if (data[i].val > 0) {
				value.push(data[i]);
			}else{
				break;
			}
		};	
		return value;
	}
	$('#FTitle').bind("input propertychange",function() {
		var FTitle = $(this).val();
		FTitleChange(FTitle);
	});
    var initMore = function(templateJson) {//TODO:select后要执行此方法
    	if (templateJson === undefined) return;
		$('#FContentDiv').hide();
		$('#more').append('<div class="form-group"><label class="col-md-2 control-label"></label><div class="col-md-9"><div class="alert alert-success" style="padding:5px; margin:0px;">以下是更多的细节描述</div></div>');
		var arr = eval('(' + templateJson + ')');
		for (var m=0; m<arr.length; m++) {
			var json = arr[m];
			if (json.type == 'string' || json.type == 'int') {
				var widthStr = '';
				if (json.type == 'string' && json.maxlength !== undefined) {
					widthStr = ' maxlength="' + json.maxlength + '"';
				}
				var inputType = 'text';
				if (json.type == 'int') inputType = 'number';
				var display = json.display;if (display === undefined) display = '';
				var refer = json.refer;if (refer === undefined) refer = '';
				var value = json.value;if (value === undefined) value = '';else value = ' value="' + value + '"';
				var placeholder = json.placeholder;if (placeholder === undefined) placeholder = '';else placeholder = ' placeholder="' + placeholder + '"';
				if (display == 'none' || refer != '') {
				} else {
					$('#more').append('<div class="form-group"><label class="col-md-2 control-label">' + json.title + '</label><div class="col-md-9"><input type="' + inputType + '" ' + value + placeholder + ' name="' + json.name + '" id="' + json.name + '" class="form-control" ' + widthStr + '></div></div>');
					if (json.required == true) {
						$('#' + json.name).rules("add", { required: true, messages: { required: "这是必填字段"} });
					}
				}
			} else if (json.type == 'text') {//TODO:回车的考虑  TODO:date和long都没有实现
				
			}
		}
    }
	var currItem = null;    	
    var FTitleChange = function(FTitle) {
		$('#more').html('');
		$('#FContentDiv').show();
    	$("#FItemId").val(0);
    	$("#FRule").val('');
		if (FTitle === '') {//重置
			$('.countable').hide();
			$('#fenInput').show();
			$('#fenTip').hide();	
			$('#fenStep').hide();	
			$("#FFen").val('');			
		} else {
			$("#FCount").rules("remove");
			var found = false;
			currItem = null;
			$('#FCheckEmployeeDesc').val('');
			$.each(itemJson,function(index,item){
				if (item['FTitle'] == FTitle) {
					if ($.trim(item.FTitle) != $.trim(item.FContent)) {
	    				$('#detail').html('<h4 style="color:#000">“' + item.FTitle + '”的详细要求如下:</h4><br/>' + item.FContent);
	    			}
					if (item.FCheckType == 0) {
						$('#checkEmployeeIdsDiv').show();
						$('#checkEmployeeDescDiv').hide();
						$("#FCheckEmployeeIds").rules("add", { required: true, messages: { required: "这是必填字段"} });
					} else {
						$('#checkEmployeeIdsDiv').hide();
						$('#checkEmployeeDescDiv').show();
						if (item.FCheckType == 1) {
							$('#FCheckEmployeeDesc').val('当事人(奖扣对象)的直接上级');
						} else if (item.FCheckType == 2) {
							$('#FCheckEmployeeDesc').val(item.FCheckEmployeeNames);
						}
						$("#FCheckEmployeeIds").rules("remove");
					}				
					found = true;
					currItem = item;
					$("#FItemId").val(item.FItemId);
					$("#FRule").val(item.FRule);
					if (item.FRule == 0) {
						$("#FFen").val(item.FFen);
						$('.countable').hide();	          								
						$('#fenInput').show();
						$('#fenTip').hide();
						$('#fenStep').hide();
					} else if (item.FRule == 1) {
						$("#FFen").val(0);
						var FFen1 = item.FFen1;
						var FFen2 = item.FFen2;
						var FFen3 = item.FFen3;
						var fen1 = '', fen2 = '', fen3 = '';
						if (FFen1*1 >= 0 && FFen2*1 >= 0 && FFen3*1 >= 0) {
							fen1 = "卓越:";fen2 = "优秀:";fen3 = "良好:";
						} else if (FFen1*1 <= 0 && FFen2*1 <= 0 && FFen3*1 <= 0) {
							fen1 = "严重:";fen2 = "警示:";fen3 = "一般:";
						} else {
							fen1 = "高分:";fen2 = "中分:";fen3 = "低分:";
						}						
						$("#fenStep input").val('待定（' + fen1 + item.FFen1 + '分，' + fen2 + item.FFen2 + '分，' + fen3 + item.FFen3 + '分）');
						$('.countable').hide();	          								
						$('#fenInput').hide();
						$('#fenTip').hide();
						$('#fenStep').show();
					} else if (item.FRule == 2) {
						$('#FBaseFen').val(item.FFen);
						change();
						$('.countable').show();	          								
						$('#fenInput').hide();
						$('#fenTip').hide();
						$('#fenStep').hide();
						$("#FCount").rules("add", { required: true, min: -10000, messages: { required: "这是必填字段"} });						
					} else if (item.FRule == 3) {
						$("#FFen").val(0);
						$('.countable').hide();	
						$('#fenInput').hide();
						$('#fenTip>label').html('本事件的得分由审核人在审核时指定');
						$('#fenTip').show();
						$('#fenStep').hide();
					}
	          	}			
			}); 
			if (found) {
				initMore(currItem.FTemplateJson); 
			} else {
				$('#detail').html('');
				$('#checkEmployeeIdsDiv').show();
				$('#checkEmployeeDescDiv').hide();
				$("#FCheckEmployeeIds").rules("add", { required: true, messages: { required: "这是必填字段"} });			
				$("#FFen").val(0);
				$('.countable').hide();	
				$('#fenInput').hide();
				$('#fenTip>label').html('标准之外的申请,分数由审核人在审核时指定');
				$('#fenTip').show();
				$('#fenStep').hide();
			}
		}
	}      	
	$("#applyTab").click(function(){
		if ($('#FTitle').val() === '') {
			$('.countable').hide();
			$('#fenInput').show();
			$('#fenTip').hide();		
			$('#fenStep').hide();					
		}
	});       
	$("#FTitle").autocomplete({
		minLength: 1,
		source: function(request, response){
			response(filter($("#FTitle").val(), itemJson));		
		},
		select: function(event, ui){
			if ($.trim(ui.item.FTitle) != $.trim(ui.item.FContent)) {
   				$('#detail').html('<h4 style="color:#000">“' + ui.item.FTitle + '”的详细要求如下:</h4><br/>' + ui.item.FContent);
   			}		
			$('#FCheckEmployeeDesc').val('');
			if (ui.item.FCheckType == 0) {
				$('#checkEmployeeIdsDiv').show();
				$('#checkEmployeeDescDiv').hide();
				$("#FCheckEmployeeIds").rules("add", { required: true, messages: { required: "这是必填字段"} });
			} else {
				$('#checkEmployeeIdsDiv').hide();
				$('#checkEmployeeDescDiv').show();
				if (ui.item.FCheckType == 1) {
					$('#FCheckEmployeeDesc').val('当事人(奖扣对象)的直接上级');
				} else if (ui.item.FCheckType == 2) {
					$('#FCheckEmployeeDesc').val(ui.item.FCheckEmployeeNames);
				}
				$("#FCheckEmployeeIds").rules("remove");
			}				
			if (ui.item.FRule == 0) {
				$('.countable').hide();
				$('#fenInput').show();
				$('#fenTip').hide();	
				$('#fenStep').hide();	
				$(this).val(ui.item.FTitle);
				$("#FFen").val(ui.item.FFen);
			} else if (ui.item.FRule == 1) {
				$('.countable').hide();
				$('#fenInput').hide();
				$('#fenTip').hide();	
				$('#fenStep').show();	
				$(this).val(ui.item.FTitle);
				$("#FFen").val(0);
				var FFen1 = ui.item.FFen1;
				var FFen2 = ui.item.FFen2;
				var FFen3 = ui.item.FFen3;
				var fen1 = '', fen2 = '', fen3 = '';
				if (FFen1*1 >= 0 && FFen2*1 >= 0 && FFen3*1 >= 0) {
					fen1 = "卓越:";fen2 = "优秀:";fen3 = "良好:";
				} else if (FFen1*1 <= 0 && FFen2*1 <= 0 && FFen3*1 <= 0) {
					fen1 = "严重:";fen2 = "警示:";fen3 = "一般:";
				} else {
					fen1 = "高分:";fen2 = "中分:";fen3 = "低分:";
				}				
				$("#fenStep input").val('待定（' + fen1 + ui.item.FFen1 + '分，' + fen2 + ui.item.FFen2 + '分，' + fen3 + ui.item.FFen3 + '分）');
			} else if (ui.item.FRule == 2) {
				$('.countable').show();
				$('#fenInput').hide();
				$('#fenTip').hide();
				$('#fenStep').hide();	
				$(this).val(ui.item.FTitle);
				$("#FBaseFen").val(ui.item.FFen);				
				change();		
			} else if (ui.item.FRule == 3) {
				$("#FFen").val(0);
				$('.countable').hide();	
				$('#fenInput').hide();
				$('#fenTip>label').html('本事件的得分由审核人在审核时指定');
				$('#fenTip').show();
				$('#fenStep').hide();	
				$(this).val(ui.item.FTitle);								
			}
			if (ui.item.FItemId !== undefined) {
				$("#FItemId").val(ui.item.FItemId);
				$("#FRule").val(ui.item.FRule);
			} else {
				$("#FItemId").val(0);
				$("#FRule").val('');
			}
			initMore(ui.item.FTemplateJson); 	
			event.preventDefault();		
		}
	}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
			var str = item.FFen;
			if (item.FRule == 1) {
				str = item.FFen3  + '至' + item.FFen1;
			} else if (item.FRule == 3) {
				str = '待定';
			}	
	        return $( "<li>" )
	          .append( "<div>" + item.FTitle + "<i>积分标准:<strong>" + str + "</strong></i></div><p></p>")
	          .appendTo( ul );
	};			
	var form1 = $('#form1');	
	$("#FFen").change(function(){formatFen(this);});
	//表单验证
	var validator = form1.validate({
		errorElement: 'span',
		errorClass: 'help-block help-block-error',
		focusInvalid: false,
		ignore: "",
		messages: {
		},
		rules: {
			FTitle: {
				required: true
			},				
			FDestEmployeeIds: {
				required: true
			},				  
			FCheckEmployeeIds: {
				required: true
			}
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
			applyPost();
		}
	});        
	var applyPost = function () {
		wait(el1);
		var FFen, FCount;
		if ($('.countable').css("display") == 'none') {
			FFen = $("#FFen").val();
			FCount = 0;
		} else {
			FFen = $("#FFen2").val();
			FCount = $("#FCount").val();
			if (FCount == '') FCount = 0;
			if (FCount == 0) {
				fail('数量不能为0');
				complete(el1);		
				return;
			}			
		}
		if ($('#FCheckEmployeeDesc').val() == '未指定直接上级') {
			fail('本积分标准的审核人是直接上级，请管理员在人员管理里给我指定直接上级我才能申请');
			complete(el1);
			return;
		}		
		var FContent = $("#FContent").serialize().replace(/\%0D\%0A/g,"<br/>");
		$.each($(".pic"), function(index, item) {
			var src = '';
			if (ding) src = $(item).attr('src');
			else src = qiniuDomain + date + '-' + $(item).attr('serverId') + '.jpg';
			FContent += '<p><a href="' + src + '" target="_blank"><img src="' + src + '" width="200"/></a></p>';
		});
		var FCheckEmployeeNames = ',';		
		$('#FCheckEmployeeIds').find("option:selected").each(function(){
			var t = $(this).text();
			if (FCheckEmployeeNames.indexOf(',' + t + ',') == -1) {
				FCheckEmployeeNames += t + ',';
			}
		});						
		if (FCheckEmployeeNames == ',') FCheckEmployeeNames = '';
		else FCheckEmployeeNames = FCheckEmployeeNames.substring(1, FCheckEmployeeNames.length - 1);	
		var querystring = '';
		if (currItem != null && currItem.FTemplateJson !== undefined) {
			var arr = eval('(' + currItem.FTemplateJson + ')');
			for (var m=0; m<arr.length; m++) {
				var json = arr[m];
				querystring += '&' + $("#" + json.name).serialize();
			}
			if (querystring != '') {
				querystring += '&FTemplateId=' + currItem.FTemplateId;
			}
		}					
		$.ajax({
			url: '/templates/fenOther/applyPostForOther.do',
			data: $("#FTitle").serialize() + '&FFen=' + FFen + '&FCount=' + FCount + '&FCheckEmployeeIds=' + $("#FCheckEmployeeIds").val() + "&FCheckEmployeeNames=" + FCheckEmployeeNames + '&FItemId=' + $("#FItemId").val() + '&FRule=' + $("#FRule").val() + '&FDestEmployeeIds=' + $("#FDestEmployeeIds").val() + '&' + FContent + querystring,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(el1);
				if(data.message.result != 0){
					window.setTimeout(function() {
						fail(data.message.errorMsg);
					}, 300);
				} else {			
					success('提交成功!');
					$('#FTitle,#FFen,#FFen2,#FCount,#FFenBase').val('');
					$('#more').html('');
					$('#FContentDiv').show();						
					$("#attach>p").remove();
					$("#FItemId").val("0");
					$("#FRule").val('');
					$('#FContent').val('');
					$('#listA').click();
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(el1);				
			}			
		});			
	}
	$("#save").click(function(){
		if ($('.countable').css("display") != 'none') {
			var FCount = $.trim($('#FCount').val());
			if (FCount == '' || isNaN(FCount)) {
				fail('数量输入错误');
				return;
			}		
		}
		if (form1.valid()) {
			form1.submit();
		}
	});

	//获取审核人列表
	var initCheckEmployeeIds = function() {
		$.ajax({
			url: '/templates/fenOther/getCheckEmployeeTreeSelectOptionHtml.do',
			data: '',
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				if( data.message.result!=0 ){                    
                    fail(data.message.errorMsg);
                } else {
                	if (data.attach) {
                		$('#attach').show();
                		if (data.isTry) $('#upload').html('上传证据(试用)');
                	}
                	
                	var i = data.lastCheckEmployeeIds.split(',');
					$(':input[name=FCheckEmployeeIds]').append(data.html);			
					$(':input[name=FCheckEmployeeIds]').val(i).multipleSelect({
						selectAll: false,
					    filter: true,
					    multiple: true
					});			
                }
			}
		});		
	}
	$("#FCount").change(function(){formatFen(this);});
	$('#FCount').bind("input propertychange",function() {
		change();
	});
	var change = function() {
		$('#FFen2').val($('#FBaseFen').val() * $('#FCount').val());
	}    
	var line = function(item){
		var str = '';
		str += '<table class="table table-bordered table-striped" FFenLogId="'+item.FFenLogId+'"><tbody>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">单据号</td><td>'+item.FFenLogId+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">积分标题</td><td>'+item.FTitle+'</td></tr>';
		var fen = item.FFen;
		if (item.FItemId === 0 && item.FFen === 0) {
			fen = '待定';
		} else {
			if (item.FRule == 1) {
				fen = '待定';
			} else if (item.FRule == 3) {
				fen = '待定';				
			}
		}
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">积分</td><td>'+fen+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">奖扣对象</td><td>'+item.FDestEmployeeName+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">审核人</td><td>'+item.FCheckEmployeeNames+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">状态</td><td>'+getStatusName(Status.FenLogStatus, item.FStatus)+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">内容</td><td>'+item.FContent+'</td></tr>';
		str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">操作</td><td>';
		str += '<button type="button" class="btn red btn-xs delete" FFenLogId="'+item.FFenLogId+'">撤销</button></td></tr>';
		str += '</tbody></table>';
		return str;				
	}
	$('#listA').click(function(){
		$.ajax({
			url:'/templates/fenOther/getApplyListForMobile.do',
			data:'',
			dataType:'json',
			type:'POST',
			success: function(data){
				if( data.message.result!=0 ){
	                if (data.message.result == 2) {
	                    parent.window.location = "../login/login.html";
	                } else {                        
	                    fail(data.message.errorMsg);
	                }
	            } else {
	                if (data.aaData.length === 0) {
	                	$("#list").html("暂无数据");         	     
	                } else {
	                	var tabContent = '';
	                	$.each(data.aaData,function(index,item){
	                		tabContent += line(item);
	                	});
	                	$("#list").html(tabContent);
	                }
	            }
			},
			error: function(xhr, ajaxOptions, thrownError){}
		});
	});
	$(".delete").live("click",function(){
		var FFenLogId = $(this).attr("FFenLogId");
		deleteConfirm(FFenLogId);
	});	
	var deleteConfirm = function(FFenLogId) {
		confirm("是否确认撤销,撤销后无法还原?", function(result) {
			if (result) {
				$.ajax({
					url:"/templates/fenOther/applyLogDelete.do" ,
					data: "FFenLogId=" + FFenLogId,
					dataType: 'json',
					type: 'POST',
					success: function (data) {
						if( data.message.result!=0 ){
							fail(data.message.errorMsg);
						} else {
							$('table[FFenLogId="'+FFenLogId+'"]').remove();
							successM('撤销成功');
							if($('table').length == 0) $("#list").html("<tr><td>暂无数据</td></tr>"); 
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
					}
				});
			}
		}); 	
	};
	var oneItem = function(item){
		var str = '';
		str += '<table class="table table-striped" style="border-collapse:collapse;" FItemId="' + item.FItemId + '"><tbody>';	
		str += '<tr><td class="tcd">'+item.FTitle+'<button type="button" class="btn purple default apply pull-right" FItemId="'+item.FItemId+'">申请</button></td></tr>';
		str += '<tr style="display:none" class="cr"><td class="cd"></td></tr>';
		str += '</tbody></table>';
		return str;				
	}	
	$('#otherMenu>p').css('font-weight', 'bold');
	$('#otherMenu>i').css('font-weight', 'bold');
	$('#key').focus();
	var up = function(date, serverId) {
		$.ajax({
		    url:'/templates/fenOther/upload.do',
		    data:'date=' + date + '&serverId=' + serverId,
		    dataType:'json',
		    type:'POST',
		    success: function(data){
				if( data.message.result!=0 ){
					if (data.message.result == 2) {
						parent.window.location = "../login/login.html";
					} else {
						fail('上传图片失败！');
					}
				} else {
				}
		    },
		    error: function(xhr, ajaxOptions, thrownError) {
		    	fail('上传图片失败');
		    }
		});   
	}	
	$('#upload').click(function() {
		$.ajax({
		    url:'/templates/fenOther/getUploadConfig.do',
		    data:'url=' + encodeURIComponent(window.location.href),
		    dataType:'json',
		    type:'POST',
		    success: function(data){
				if( data.message.result!=0 ){
					if (data.message.result == 2) {
						parent.window.location = "../login/login.html";
					}
				} else {
					var _config = eval('(' + data.configValue + ')');
					ding = data.ding;
					qiniuDomain = data.qiniuDomain;
					if (data.ding) {
						dd.config({
							agentId : _config.agentid,
							corpId : _config.corpId,
							timeStamp : _config.timeStamp,
							nonceStr : _config.nonceStr,
							signature : _config.signature,
							jsApiList : [ 'runtime.info', 'biz.contact.choose',
									'device.notification.confirm', 'device.notification.alert',
									'device.notification.prompt', 'biz.ding.post',
									'biz.util.openLink', 'biz.util.uploadImage' ]
						});
		
						dd.ready(function() {
							dd.runtime.permission.requestAuthCode({
								corpId : _config.corpId,
								onSuccess : function(info) {
		
									dd.biz.util.uploadImage({
									    multiple: true, //是否多选，默认false
									    max: 5, //最多可选个数
									    onSuccess : function(result) {
									    	var arr = (''+result+'').split(',');
											for(var i=0;i<arr.length;i++){
												$('#attach').append('<p><img class="pic" src="' + arr[i] + '" width="200"/>&nbsp;<a class="delpic">删除</a></p>');
											}
									    },
									    onFail : function(err) {}
									})
		
								},
								onFail : function(err) {
									alert('fail: ' + JSON.stringify(err));
								}
							});
						});
						dd.error(function(err) {
							alert('dd error: ' + JSON.stringify(err));
						});
					} else {
						wx.config({
						    beta: true,
						    debug: false,
						    appId: _config.appId,
						    timestamp: _config.timestamp,
						    nonceStr: _config.nonceStr,
						    signature: _config.signature,
						    jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage']
						});
						
						wx.ready(function(){
wx.chooseImage({
count: 3, // 默认9
sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
success: function (res) {
var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
wx.uploadImage({
localId: localIds[0],
isShowProgressTips: 1,
success: function (res) {
var serverId = res.serverId;
up(date, serverId);
wx.downloadImage({
serverId: serverId,
isShowProgressTips: 1,
success: function (res) {
var localId = res.localId;
$('#attach').append('<p><img class="pic" serverId="' + serverId + '" src="' + localId + '" width="200"/>&nbsp;<a class="delpic">删除</a></p>');
if (localIds.length > 1) {
wx.uploadImage({
localId: localIds[1],
isShowProgressTips: 1,
success: function (res) {
var serverId = res.serverId;
up(date, serverId);
wx.downloadImage({
serverId: serverId,
isShowProgressTips: 1,
success: function (res) {
var localId = res.localId;
$('#attach').append('<p><img class="pic" serverId="' + serverId + '" src="' + localId + '" width="200"/>&nbsp;<a class="delpic">删除</a></p>');
if (localIds.length > 2) {
wx.uploadImage({
localId: localIds[2],
isShowProgressTips: 1,
success: function (res) {
var serverId = res.serverId;
up(date, serverId);
wx.downloadImage({
serverId: serverId,
isShowProgressTips: 1,
success: function (res) {
var localId = res.localId;
$('#attach').append('<p><img class="pic" serverId="' + serverId + '" src="' + localId + '" width="200"/>&nbsp;<a class="delpic">删除</a></p>');
}
});																									
}
});		        					
}
}
});																									
}
});		        					
}
}
});																									
}
});		        					
}
});
						});				
					}
				}
		    },
		    error: function(xhr, ajaxOptions, thrownError) {
		    }
		});   
						
	
	});
	$(".delpic").live("click",function(){
		$(this).parent().remove();
	});    
	return {
		init: function () {
			initCheckEmployeeIds();
			var allContent = '';	
			$.ajax({
				url:'/templates/fenOther/getItemListOrderByItemTypeId.do',
				data:'',
				dataType:'json',
				type:'POST',
				success: function(data){
					if( data.message.result!=0 ){        
		            } else {			
						itemJson = data.aaData;
		                if (data.aaData.length === 0) {
		                	$("#all").append("<tr><td>暂无数据</td></tr>");         	     
		                } else {         
		                	var tabContent = '';
		                	var lastTypeId = -1;
		                	$.each(data.aaData,function(index,item){
		                		if (lastTypeId == -1 && item.FItemTypeId != lastTypeId) {
		                			lastTypeId = item.FItemTypeId;
		                		} else if (item.FItemTypeId != lastTypeId) {
		                			var typeName = data["type"+lastTypeId];
		                			if (typeName === undefined) typeName = '未分类的';
									$("#myDrop").append('<li><a href="#tab_' + lastTypeId + '" tabindex="-1" data-toggle="tab" class="itemA"> ' + typeName + ' </a></li>');
									$("#content").append('<div class="tab-pane fade" id="tab_' + lastTypeId + '"><p>' + tabContent + '</p></div>');	
									tabContent = '';	         
									lastTypeId = item.FItemTypeId;	
		                		}
		                		tabContent += oneItem(item);
		                	});
		              		var typeName = data["type"+lastTypeId];
		              		if (typeName === undefined) typeName = '未分类的';
							$("#myDrop").append('<li><a href="#tab_' + lastTypeId + '" tabindex="-1" data-toggle="tab" class="itemA"> ' + typeName + ' </a></li>');
							$("#content").append('<div class="tab-pane fade" id="tab_' + lastTypeId + '"><p>' + tabContent + '</p></div>');	
		
			                function sortNum(a,b){  
			                   return a.FNum-b.FNum  
			                }                
			                itemJson.sort(sortNum);
		                	$.each(itemJson,function(index,item){
		                		allContent += oneItem(item);
		                	});
		                	$("#all").html(allContent);
		                }
		                
					    $('#applyA,#listA').on('shown.bs.tab',function(e) {  
							$('#search').hide();
					    });  
					    $('#allA,#findA,.itemA').on('shown.bs.tab',function(e) {  
							$('#search').show();
					    });                  
						$("#myDrop li:eq(0) a").click();
								
		                $('.apply').on('click', function(){
		                	var FItemId = $(this).attr("FItemId");
		                	$('#applyA').tab('show');
							$.each(itemJson,function(index,item){
								if(item.FItemId == FItemId){
									$('#FTitle').val(item.FTitle);
									FTitleChange($('#FTitle').val());
								}
							});
							//$('#FContent').val('');
						});
						tableHandle();
						
						$.ajax({
							url: '/templates/fenOther/getDestEmployeeTreeSelectOptionHtml.do',
							data: '',
							dataType: 'json',
							type: 'POST',
							success: function (data) {
								if( data.message.result!=0 ){        
				                       fail(data.message.errorMsg);
				                } else {
									/*$(':input[name=FDestEmployeeIds]').select2({
										allowClear: true
									});
									$.uniform.update($(':input[name=FDestEmployeeIds]').select2("val", data.USER_ID));*/
									$(':input[name=FDestEmployeeIds]').append(data.html);			
									$(':input[name=FDestEmployeeIds]').val(data.USER_ID).multipleSelect({
										selectAll: false,						
									    filter: true,
									    multiple: true
									});		
				                }
							}
						});	
						
						var key = getParam(window.location.href, 'FTitle');
						var fid = getParam(window.location.href, 'FItemId');
						if (key === undefined && fid !== undefined) {
							$.each(itemJson,function(index,item){
								if(item.FItemId == fid){
									key = item.FTitle;
								}
							});			
							if (key !== undefined) {
								$('#key').val(key);
								keyChange();
			    				//$('#go').click();					
							}									
						} else if (key !== undefined) {
							$('#key').val(decodeURI(key));
							keyChange();
		    				//$('#go').click();					
						}				
					}				
				}
			});
			var tableHandle = function() {
				$('table').click(function() {
					var that = this;
					var FItemId = $(this).attr('FItemId');
					if ($(this).find('.cr').css("display") == 'none') {
						$.each(itemJson,function(index,item){
							if (item['FItemId'] == FItemId) {	
								var fen = '';
								if (item.FRule == 1) {
									fen = '<span class="badge badge-primary">' + item.FFen3  + '至' + item.FFen1 + '分</span>';
								} else if (item.FRule == 3) {
									fen = '<span class="badge badge-primary">审核时指定分数</span>';
								} else {
									if (item.FFen > 0) {
										fen = '<span class="badge badge-success">' + item.FFen + '分</span>';
									} else {
										fen = '<span class="badge badge-danger">' + item.FFen + '分</span>';
									}
								}
								var limit = '';
								if (item.FLimitType != 0) {
									var period = '天';
									if (item.FLimitType == 2) period = '周';
									else if (item.FLimitType == 3) period = '月'; 
									limit = '<span class="badge badge-warning pull-right">每' + period + '可申请' + item.FLimitCount + '次</span>';
								}
								$(that).find('.cr').find('.cd').html(fen + limit + '<br/>' + item.FContent.replace('\r\n',"<br/>"));
								$(that).find('.cr').show();																	
							}
						});				
					}
				});					
			}
			var keyChange = function() {
				$('#allA').click();
				var key = $.trim($("#key").val());
				if (key == '') {
					$("#all").html(allContent);	
					tableHandle();
				} else {
					var data = filter(key, itemJson);
					var str = '';
					$.each(data,function(index,item){
						str += oneItem(item);
					});
					if (str == '') {
						$("#all").html('<center><h3>未找到任何相关的标准</h3><p>即使是这样，你还是可以点击上面绿色按钮去申请</p></center>');
					} else {
						$("#all").html(str);
						tableHandle();
					}
				}
				$('.apply').on('click', function(){
		            var FItemId = $(this).attr("FItemId");
					$.each(itemJson,function(index,item){
						if(item.FItemId == FItemId){
							$('#applyA').tab('show');
							$('#FTitle').val(item.FTitle);
							FTitleChange($('#FTitle').val());
						}
					});
					//$('#FContent').val('');
				});		
			}				
			$('#key').bind("input propertychange",function() {
				keyChange();	
			});
		    $('#go').click(function() {
				$('#fenInput').show();
				$('#fenTip').hide();	
				$('#fenStep').hide();	
				$('#applyA').tab('show');
		
				$('#FTitle').val($.trim($('#key').val()));
				FTitleChange($('#FTitle').val());
				if ($('#FContent').val() == '') $('#FContent').val($.trim($('#key').val()));
		    });			
		}
	};
}();