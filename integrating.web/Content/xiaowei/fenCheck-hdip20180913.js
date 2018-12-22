var Module = function () {
	$('#addFen').click(function() {
		$('#addOrDecTitle').html('加分');
		$('#addOrDecButton').removeClass('red').addClass('green');
		var FFen = $('#FFen').val();
		if (FFen.substring(0,1) === '-') {
			$('#FFen').val(FFen.substring(1));
		}
	});
	$('#decFen').click(function() {
		$('#addOrDecTitle').html('扣分');
		$('#addOrDecButton').removeClass('green').addClass('red');
		var FFen = $('#FFen').val();
		if (FFen.substring(0,1) !== '-') {
			$('#FFen').val('-' + FFen);
		}
	});
	$("#FFen").bind( 'input propertychange', function () {
		var FFen = $('#FFen').val();
		if (FFen.substring(0,1) !== '-') {
			$('#addFen').click();
		} else {
			$('#decFen').click();
		}
	});
	var tip = '';
	var fenCheckItem = function(fenLogModel){
		var str = '';
		var title = '';
		var fen = fenLogModel.FFen;
		if (fenLogModel.FItemId === 0 && fenLogModel.FFen === 0) {
			title = ' FTitle="' + fenLogModel.FTitle + '"';
			fen = '待定';
		} else if (fenLogModel.FRule == 1) {
			fen = '待定';
		} else if (fenLogModel.FRule == 3) {
			fen = '待定';
		}
		str += '<tr FFenLogId="'+fenLogModel.FFenLogId+'" ' + title + '><td>';
		str += '<div class="meet-our-team">';
		str += '<h4>'+fenLogModel.FTitle+' <br><span class="label label-primary">' + fenLogModel.FContent + fenLogModel.FCheckLog + '</span><span class="CRight">'+fen+'<br><small>申请分数</small></span></h4>';
		str += '<div class="team-info">';
		str += '<p>奖扣对象 ：'+fenLogModel.FDestEmployeeName+'<br>所在部门：'+fenLogModel.FDestDeptName+'<br>';
		str += '<br>申请人员 ：'+fenLogModel.FOrigEmployeeName+'<br>申请时间 ：'+fenLogModel.FCreateTime+'<br/>单据号　 ：' + fenLogModel.FFenLogId + '</p><br>';
		str += '<p>';
		if (fenLogModel.FItemId === 0 && fenLogModel.FFen === 0) {
			str += '<p style="font-size:12px;" class="font-red">这是积分标准之外的申请，审核时需要指定是依据哪条标准或直接指定分数</p>';
			str += '<a class="pass btn default purple-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>审核通过(指定标准)</a><br/><br/>';
			str += '<a class="passByFen btn default purple-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>&nbsp;审核通过(指定分数)</a><br/><br/>';
		} else {
			if (fenLogModel.FRule == 1) {
				var FFen1 = fenLogModel.FFen1;if (FFen1 === undefined) FFen1 = '未知';
				var FFen2 = fenLogModel.FFen2;if (FFen2 === undefined) FFen2 = '未知';
				var FFen3 = fenLogModel.FFen3;if (FFen3 === undefined) FFen3 = '未知';
				var fen1 = '', fen2 = '', fen3 = '';
				if (FFen1 == '未知' || FFen2 == '未知' || FFen3 == '未知') {
				} else {
					if (FFen1*1 >= 0 && FFen2*1 >= 0 && FFen3*1 >= 0) {
						fen1 = "卓越:";fen2 = "优秀:";fen3 = "良好:";
					} else if (FFen1*1 <= 0 && FFen2*1 <= 0 && FFen3*1 <= 0) {
						fen1 = "严重:";fen2 = "警示:";fen3 = "一般:";
					} else {
						fen1 = "高分:";fen2 = "中分:";fen3 = "低分:";
					}
				}				
				str += '<div class="btn-group dropup"><button class="btn default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">通过 <i class="fa fa-angle-up"></i></button><ul class="dropdown-menu" role="menu"><li><a stepFen="' + FFen1 + '" class="pass">' + fen1 + FFen1 + '分 </a></li><li><a stepFen="' + FFen2 + '" class="pass">' + fen2 + FFen2 + '分 </a></li><li><a stepFen="' + FFen3 + '" class="pass">' + fen3 + FFen3 + '分 </a></li></ul></div>';
			} else if (fenLogModel.FRule == 3) {
				str += '<a class="passByFen btn default purple-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>&nbsp;审核通过(指定分数)</a>';
			} else {
				str += '<a class="pass btn default purple-stripe" href="javascript:;" iRow="0"><i class="fa fa-check"></i>通过</a>';
			}
		}
		str += '<a class="fail btn default red-stripe" href="javascript:;" irow="0"><i class="fa fa-times"></i>不通过</a>';
		str += '<a class="share btn default blue-stripe" href="javascript:;" irow="0"><i class="fa fa-share"></i>共享</a>' + tip;
		tip = '';
		str += '</p></div></div>';
		str += '</td></tr>';
		return str;		
	}	
	var sharingItem = function(fenLogModel) {
		var str = '';
		var title = '';
		var fen = fenLogModel.FFen;
		if (fenLogModel.FItemId === 0 && fenLogModel.FFen === 0) {
			title = ' FTitle="' + fenLogModel.FTitle + '"';
			fen = '待定';
		} else if (fenLogModel.FRule == 1) {
			fen = '待定';
		} else if (fenLogModel.FRule == 3) {
			fen = '待定';
		}
		str += '<tr FFenLogId="'+fenLogModel.FFenLogId+'" ' + title + '><td>';
		str += '<div class="meet-our-team">';
		str += '<h4>'+fenLogModel.FTitle+' <br><span class="label label-primary">' + fenLogModel.FContent + fenLogModel.FCheckLog + '</span><span class="CRight">'+fen+'<br><small>申请分数</small></span></h4>';
		str += '<div class="team-info">';
		str += '<p>奖扣对象 ：'+fenLogModel.FDestEmployeeName+'<br>所在部门：'+fenLogModel.FDestDeptName+'<br>';
		str += '<br>申请人员 ：'+fenLogModel.FOrigEmployeeName+'<br>申请时间 ：'+fenLogModel.FCreateTime+'<br/>单据号　 ：' + fenLogModel.FFenLogId + '</p><br>';
		str += '<p>';
		if (fenLogModel.FItemId === 0 && fenLogModel.FFen === 0) {
			str += '<p style="font-size:16px;" class="font-red">这是积分标准之外的申请，审核时需要指定是依据哪条标准或直接指定分数</p>';
			str += '<a class="passByItemId btn default red-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>&nbsp;审核通过(指定标准)</a><br/><br/>';
			str += '<a class="passByFen btn default purple-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>&nbsp;审核通过(指定分数)</a><br/><br/>';
			str += '<a class="fail btn default blue-stripe" href="javascript:;" irow="0"><i class="fa fa-times"></i>&nbsp;不通过</a>';
		} else {
			if (fenLogModel.FRule == 1) {
				var FFen1 = fenLogModel.FFen1;if (FFen1 === undefined) FFen1 = '未知';
				var FFen2 = fenLogModel.FFen2;if (FFen2 === undefined) FFen2 = '未知';
				var FFen3 = fenLogModel.FFen3;if (FFen3 === undefined) FFen3 = '未知';
				var fen1 = '', fen2 = '', fen3 = '';
				if (FFen1 == '未知' || FFen2 == '未知' || FFen3 == '未知') {
				} else {
					if (FFen1*1 >= 0 && FFen2*1 >= 0 && FFen3*1 >= 0) {
						fen1 = "卓越:";fen2 = "优秀:";fen3 = "良好:";
					} else if (FFen1*1 <= 0 && FFen2*1 <= 0 && FFen3*1 <= 0) {
						fen1 = "严重:";fen2 = "警示:";fen3 = "一般:";
					} else {
						fen1 = "高分:";fen2 = "中分:";fen3 = "低分:";
					}
				}					
				str += '<div class="btn-group dropup"><button class="btn default dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">通过 <i class="fa fa-angle-up"></i></button><ul class="dropdown-menu" role="menu"><li><a stepFen="' + FFen1 + '" class="pass">' + fen1 + FFen1 + '分 </a></li><li><a stepFen="' + FFen2 + '" class="pass">' + fen2 + FFen2 + '分 </a></li><li><a stepFen="' + FFen3 + '" class="pass">' + fen3 + FFen3 + '分 </a></li></ul></div>';
			} else if (fenLogModel.FRule == 3) {
				str += '<a class="passByFen btn default purple-stripe" href="javascript:;" irow="0"><i class="fa fa-check"></i>&nbsp;审核通过(指定分数)</a>';
			} else {
				str += '<a class="pass btn default purple-stripe" href="javascript:;" iRow="0"><i class="fa fa-check"></i>通过</a>';
			}
			str += '<a class="fail btn default blue-stripe" href="javascript:;" irow="0"><i class="fa fa-times"></i>&nbsp;不通过</a>';
		}
		str += '</p></div></div>';
		str += '</td></tr>';
		return str;			
	}
	var getFenCheck = function(){
		$.ajax({
			url:'/templates/fenCheck/getFenCheckList.do',
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
					if (data.aaData.length!=0) {
						var str = '';
						$.each(data.aaData,function(index,item){
							str += fenCheckItem(item);
						});
						$("#checkContent").empty().append(str);
						$("[data-toggle='popover']").popover();
					}else{
						$("#checkContent").empty().append("<tr><td>暂无数据</td></tr>"); 
					};
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			}
		});
	}

	var getSharing = function(){
		$.ajax({
			url:'/templates/fenCheck/getSharingList.do',
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
					if (data.aaData.length!=0) {
						var str = '';
						$.each(data.aaData,function(index,item){
							str += sharingItem(item);
						});
						$("#shareContent").empty().append(str);
						$("#shareDiv").show();
						$("#shareLength").html(data.aaData.length);
					}else{
						$("#shareDiv").hide();
						$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
					};
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			}
		});
	}

	$(".nav-tabs li:eq(0)").click(function(){
		getFenCheck();
	});
	$(".nav-tabs li:eq(1)").click(function(){
		getSharing();
	});
	
	var table1 = $("#table1");
	var portlet_tab_1El = $('#portlet_tab_1');
	table1.on('click', '.share', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		$('#shareFenLogId').val(FFenLogId);
		share();		
	});
	var share = function() {
		$.ajax({
			url: 'getCheckEmployeeTreeSelectOptionHtml.do',
			data: '',
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				if( data.message.result!=0 ){                    
                    fail(data.message.errorMsg);
                } else {
					$(':input[name=FCheckEmployeeId]').select2({
						allowClear: true
					});	                
					$(':input[name=FCheckEmployeeId]').append(data.html);	
					$("#modalShare").modal("show");													
                }
			}
		});		
	};	
	$("#toShare").click(function() {
		var url ="/templates/fenCheck/share.do";
		var queryString = $("#formShare").serialize();
		wait(portlet_tab_1El);
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(portlet_tab_1El);
				if( data.message.result!=0 ){
					fail(data.message.errorMsg);
				} else {
					$("#modalShare").modal("hide");
					success('共享成功，对方将收到审核通知');
					$("#shareDiv").show();
					if ($("#shareLength").html()=='') {
						$("#shareLength").html(0); 
					};
					$("#shareLength").html(parseInt($("#shareLength").html())+1);
					var FFenLogId = $('#shareFenLogId').val();
					$("#table1 tr[FFenLogId="+FFenLogId+"]").remove();
					if ($("#checkContent").children().length==0) {
						$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
					};
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(portlet_tab_1El);
			}
		});
	});	
	table1.on('click', '.passByFen', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		$('#FFenLogId').val(FFenLogId);
		$('#FFen').val('');
		$('#addOrDecTitle').html('请选择加分或扣分');
		$('#addOrDecButton').removeClass('green').removeClass('red');		
		$("#modal4").modal("show");	
	});	
	table1.on('click', '.pass', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var FFenLogId = tr.attr('FFenLogId');
		var FTitle = tr.attr('FTitle');
		pass(FFenLogId, FTitle, $(this).attr('stepFen'));
	});
	var pass = function(FFenLogId, FTitle, stepFen) {
		if (FTitle !== undefined) {
			setItemIdAndPass(FFenLogId, FTitle);
		} else {
			confirm("是否确认通过?", function(result) {
				if (result) {
					var url ="/templates/fenCheck/fenCheckPass.do";
					var queryString = "FFenLogId=" + FFenLogId;
					if (stepFen !== undefined) {
						queryString += "&stepFen=" + stepFen;
					}					
					wait(portlet_tab_1El);
					$.ajax({
						url:url ,
						data: queryString,
						dataType: 'json',
						type: 'POST',
						success: function (data) {
							complete(portlet_tab_1El);
							if( data.message.result!=0 ){
								fail(data.message.errorMsg);
							} else {
								success('操作成功');
								$("#table1 tr[FFenLogId="+FFenLogId+"]").remove();
								if ($("#checkContent").children().length==0) {
									$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
								};
							}
						},
						error: function(xhr, ajaxOptions, thrownError) {
							complete(portlet_tab_1El);
						}
					});
				}
			}); 
		}
	};			
	var selectItemEl = $('#selectItem');
	var setItemIdAndPass = function(FFenLogId, FTitle) {
		$('#FFenLogId').val(FFenLogId);
		$.ajax({
			url:'/templates/fenCheck/getItemListWithContent.do',
			data:'',
			dataType:'json',
			type:'POST',
			success: function(data){
				var c = getContent(FTitle, data.aaData, true);
				$('#selectItem').html('<input type="text" class="form-control" name="key" value="' + FTitle + '"/><br/><span class="font-red">要是没找到,喊管理员增加一条</span><div class="scroller" style="height: 250px;margin:8px 0;" data-always-visible="1" data-rail-visible1="1">'+c+'</div>');
				$('.scroller').slimScroll({
					alwaysVisible: false
				});			
				$("input[name=key]").bind( 'input propertychange', function () {
					var val = $(this).val();
					$(this).parent("#selectItem").find(".scroller").empty();
					$(this).parent("#selectItem").find(".scroller").append(getContent(val, data.aaData, true));
					$('.setItemId').on('click', function (e) {
						var FItemId = $(this).attr('FItemId');
						var stepFen = $(this).attr('stepFen');
						var FFenLogId = $('#FFenLogId').val();
						confirm("确认标准并通过审核?", function(result) {
							if (result) {
								var url ="/templates/fenCheck/setItemIdAndPass.do";
								var queryString = "FFenLogId=" + $('#FFenLogId').val() + "&FItemId=" + FItemId;
								if (stepFen !== undefined) {
									queryString += "&stepFen=" + stepFen;
								}								
								wait(selectItemEl);
								$.ajax({
									url:url ,
									data: queryString,
									dataType: 'json',
									type: 'POST',
									success: function (data) {
										complete(selectItemEl);
										if( data.message.result!=0 ){
											fail(data.message.errorMsg);
										} else {
											success('操作成功');
											$("#modal3").modal("hide");
											if (/active/gi.test($(".tab-content .tab-pane:eq(0)").attr("class"))) {
												$("#table1 tr[FFenLogId="+FFenLogId+"]").remove();
												if ($("#checkContent").children().length==0) {
													$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
												};										
											} else {
												$("#table2 tr[FFenLogId="+FFenLogId+"]").remove();
												$("#shareLength").html(parseInt($("#shareLength").html())-1);
												if ($("#shareLength").html() == 0) {
													$("#shareDiv").hide();
													$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
												};																	
											}									
										}
									},
									error: function(xhr, ajaxOptions, thrownError) {
										complete(selectItemEl);
									}
								});
							}
						}); 
					});						
				});																			
				$("#modal3").modal("show");
				$('.setItemId').on('click', function (e) {
					var FItemId = $(this).attr('FItemId');
					var stepFen = $(this).attr('stepFen');
					var FFenLogId = $('#FFenLogId').val();
					confirm("确认标准并通过审核?", function(result) {
						if (result) {
							var url ="/templates/fenCheck/setItemIdAndPass.do";
							var queryString = "FFenLogId=" + $('#FFenLogId').val() + "&FItemId=" + FItemId;
							if (stepFen !== undefined) {
								queryString += "&stepFen=" + stepFen;
							}
							wait(selectItemEl);
							$.ajax({
								url:url ,
								data: queryString,
								dataType: 'json',
								type: 'POST',
								success: function (data) {
									complete(selectItemEl);
									if( data.message.result!=0 ){
										fail(data.message.errorMsg);
									} else {
										success('操作成功');
										$("#modal3").modal("hide");
										if (/active/gi.test($(".tab-content .tab-pane:eq(0)").attr("class"))) {
											$("#table1 tr[FFenLogId="+FFenLogId+"]").remove();
											if ($("#checkContent").children().length==0) {
												$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
											};										
										} else {
											$("#table2 tr[FFenLogId="+FFenLogId+"]").remove();
											$("#shareLength").html(parseInt($("#shareLength").html())-1);
											if ($("#shareLength").html() == 0) {
												$("#shareDiv").hide();
												$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
											};																	
										}									
									}
								},
								error: function(xhr, ajaxOptions, thrownError) {
									complete(selectItemEl);
								}
							});
						}
					}); 
				});								
			},
			error: function(xhr, ajaxOptions, thrownError) {							
			}
		});			
	}	
	table1.on('click', '.fail', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		failConfirm(FFenLogId);
	});	
	var failConfirm = function(FFenLogId) {
		$(":input[name=FFenLogId]").val(FFenLogId);
		$("textarea").val("");
		$("#modal1").modal("show");	
	};
	$("#save").click(function() {
		var url ="/templates/fenCheck/fenCheckFail.do";
		var queryString = "FFenLogId=" + $(":input[name=FFenLogId]").val() + "&" + $(":input[name=FFailReason]").serialize();
		wait(portlet_tab_1El);
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(portlet_tab_1El);
				if( data.message.result!=0 ){
					fail(data.message.errorMsg);
				} else {
					success('操作成功');
					$("#modal1").modal("hide");
					$("#table1 tr[FFenLogId="+$(":input[name=FFenLogId]").val()+"]").remove();	
					if ($("#checkContent").children().length==0) {
						$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
					};                   	
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(portlet_tab_1El);
			}
		});
	});
	var allEl = $('#portlet_tab_1');
	$(".all").click(function() {
		confirm("是否确认全部通过?", function(result) {
			if (result) {
				wait(allEl);
				var url ="/templates/fenCheck/fenCheckAllPass.do";
				$.ajax({
					url:url ,
					data: '',
					dataType: 'json',
					type: 'POST',
					success: function (data) {
						complete(allEl);
						if( data.message.result!=0 ){
							fail(data.message.errorMsg);
						} else {
							getFenCheck();	
							if (data.tip !== undefined) {
								warn(data.tip);
							} else {
								success('操作成功');
							}							
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						complete(allEl);
					}
				});
			}
		}); 			
	});
	
	//表格2
	var table2 = $('#table2');
	var form4 = $('#form4');
	var validator = form4.validate({
		errorElement: 'span',
		errorClass: 'help-block help-block-error',
		focusInvalid: false,
		ignore: "",
		messages: {
		},
		rules: {
			FFen: {
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
			passByFenPost();
		}
	});        
	table2.on('click', '.passByFen', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		$('#FFenLogId').val(FFenLogId);
		$('#FFen').val('');
		$('#addOrDecTitle').html('请选择加分或扣分');
		$('#addOrDecButton').removeClass('green').removeClass('red');		
		$("#modal4").modal("show");	
	});
	$("#save4").click(function() {
		if (form4.valid()) {
			form4.submit();
		}
	});
	var modal4El = $("#modal4 > .modal-dialog"); 
	var passByFenPost = function() {
		var url ="/templates/fenCheck/passByFen.do";
		var FFenLogId = $('#FFenLogId').val();
		var queryString = "FFenLogId=" + $('#FFenLogId').val() + "&FFen=" + $('#FFen').val();
		wait(modal4El);
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {	
				complete(modal4El);
				if( data.message.result!=0 ){
					fail(data.message.errorMsg);
				} else {
					success('操作成功');
					$("#modal4").modal("hide");
					if (/active/gi.test($(".tab-content .tab-pane:eq(0)").attr("class"))) {
						$("#table1 tr[FFenLogId="+FFenLogId+"]").remove();
						if ($("#checkContent").children().length==0) {
							$("#checkContent").empty().append('<tr><td>暂无数据</td></tr>');
						};										
					} else {
						$("#table2 tr[FFenLogId="+FFenLogId+"]").remove();
						$("#shareLength").html(parseInt($("#shareLength").html())-1);
						if ($("#shareLength").html() == 0) {
							$("#shareDiv").hide();
							$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
						};																	
					}						
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(modal4El);
			}
		});
	}
	table2.on('click', '.passByItemId', function (e) {
		e.preventDefault();
		var tr = $(this).parents('tr');
		var FFenLogId = tr.attr('FFenLogId');
		var FTitle = tr.attr('FTitle');						
		setItemIdAndPass(FFenLogId, FTitle);
	});			
	table2.on('click', '.pass', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		pass2(FFenLogId, $(this).attr('stepFen'));
	});
	var portlet_tab_2El = $('#portlet_tab_2');
	var pass2 = function(FFenLogId, stepFen) {
		confirm("是否确认通过?", function(result) {
			if (result) {
				var url ="/templates/fenCheck/fenCheckPass.do";
				var queryString = "FFenLogId=" + FFenLogId;
				if (stepFen !== undefined) {
					queryString += "&stepFen=" + stepFen;
				}				
				wait(portlet_tab_2El);
				$.ajax({
					url:url ,
					data: queryString,
					dataType: 'json',
					type: 'POST',
					success: function (data) {
						complete(portlet_tab_2El);
						if( data.message.result!=0 ){
							fail(data.message.errorMsg);
						} else {
							success('操作成功');
							$("#table2 tr[FFenLogId="+FFenLogId+"]").remove();
							$("#shareLength").html(parseInt($("#shareLength").html())-1);
							if ($("#shareLength").html() == 0) {
								$("#shareDiv").hide();
								$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
							};
						}
					},
					error: function(xhr, ajaxOptions, thrownError) {
						complete(portlet_tab_2El);
					}
				});
			}
		}); 
	};	
	table2.on('click', '.fail', function (e) {
		e.preventDefault();
		var FFenLogId = $(this).parents('tr').attr('FFenLogId');
		failConfirm2(FFenLogId);
	});
	var failConfirm2 = function(FFenLogId) {
		$(":input[name=FFenLogId2]").val(FFenLogId);
		$("textarea").val("");
		$("#modal2").modal("show");	
	};
	$("#save2").click(function() {
		var url ="/templates/fenCheck/fenCheckFail.do";
		var queryString = "FFenLogId=" + $(":input[name=FFenLogId2]").val() + "&FFailReason=" + $(":input[name=FFailReason2]").val();
		wait(portlet_tab_2El);
		$.ajax({
			url:url ,
			data: queryString,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				complete(portlet_tab_2El);
				if( data.message.result!=0 ){
					fail(data.message.errorMsg);
				} else {
					success('操作成功');
					$("#modal2").modal("hide");
					$("#table2 tr[FFenLogId="+$(":input[name=FFenLogId2]").val()+"]").remove();
					$("#shareLength").html(parseInt($("#shareLength").html())-1);
					if ($("#shareLength").html() == 0) {
						$("#shareDiv").hide();
						$("#shareContent").empty().append("<tr><td>暂无数据</td></tr>");
					};             	
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				complete(portlet_tab_2El);
			}
		});
	});
	
	var getContent = function(text,data,selectItem){
		var backContet = '';
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
	
		for (var i = 0; i < data.length; i++) {
			var val = Levenshtein_Distance_Percent(text,data[i].FTitle);
			data[i].val = val;
		};
		data.sort(by("val"));
		for (var i = 0; i < data.length; i++) {
			if (data[i].val > 0 || text === '') {  //i < 3 && data[i].val > 0
				var colors = '';
				var buttonColor = '';
				if (data[i].FRule == 1) {
					colors = '<span class="label label-primary">'+ data[i].FFen3 + '至' + data[i].FFen1 +'</span>';
					buttonColor = 'blue';
				} else if (data[i].FRule != 3) {
					if (data[i].FFen >= 0) {
						colors = '<span class="label label-success">'+data[i].FFen+'</span>';
						buttonColor = 'green';
					}else{
						colors = '<span class="label label-danger">'+data[i].FFen+'</span>'
						buttonColor = 'red';
					}
				}				
				var str = '';
				if (data[i].FRule == 1) {
					var FFen1 = data[i].FFen1;if (FFen1 === undefined) FFen1 = '未知';
					var FFen2 = data[i].FFen2;if (FFen2 === undefined) FFen2 = '未知';
					var FFen3 = data[i].FFen3;if (FFen3 === undefined) FFen3 = '未知';
					var fen1 = '', fen2 = '', fen3 = '';
					if (FFen1 == '未知' || FFen2 == '未知' || FFen3 == '未知') {
					} else {
						if (FFen1*1 >= 0 && FFen2*1 >= 0 && FFen3*1 >= 0) {
							fen1 = "卓越:";fen2 = "优秀:";fen3 = "良好:";
						} else if (FFen1*1 <= 0 && FFen2*1 <= 0 && FFen3*1 <= 0) {
							fen1 = "严重:";fen2 = "警示:";fen3 = "一般:";
						} else {
							fen1 = "高分:";fen2 = "中分:";fen3 = "低分:";
						}
					}									
					str = '<div class="btn-group"><button class="btn btn-circle ' + buttonColor + ' dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">依据此标准审核通过 <i class="fa fa-angle-up"></i></button><ul class="dropdown-menu" role="menu"><li><a stepFen="' + FFen1 + '" FItemId="' + data[i].FItemId + '" class="setItemId">：' + fen1 + FFen1 + '分 </a></li><li><a stepFen="' + FFen2 + '" FItemId="' + data[i].FItemId + '" class="setItemId">' + fen2 + FFen2 + '分 </a></li><li><a stepFen="' + FFen3 + '" FItemId="' + data[i].FItemId + '" class="setItemId">' + fen3 + FFen3 + '分 </a></li></ul></div>';
				} else if (data[i].FRule != 3) {
					str = '<button type="button" class="setItemId btn btn-circle ' + buttonColor + '" FItemId="' + data[i].FItemId + '">依据此标准审核通过</button>';
				}				
				if (data[i].FRule != 3) backContet += '<div class="row"><div class="col-md-8"><span class="list-group-item2" style="border:0 !important;cursor: default;"><h4 class="list-group-item-heading">'+data[i].FTitle+'<span>&nbsp;'+colors+'</span></h4><p class="list-group-item-text">'+data[i].FContent+'</p></span></div><div class="col-md-4">' + str + '</div></div><hr>';
			}else{
				break;
			}
		};	
		return backContet;
	}
	$(".draggable-modal").draggable({
		handle: ".modal-header"
	});		
	return {
		init: function () {
			getFenCheck();
			getSharing();
		}
	};
}();