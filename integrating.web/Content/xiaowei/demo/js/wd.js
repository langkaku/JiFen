 function fixSafari(evt) {
 	var str = navigator.userAgent;
 	var isiPhone = str.indexOf("iPhone") != -1;
 	var isSafari = str.indexOf("Safari") != -1;
 	if (isiPhone || isSafari) {
 		evt.persisted && window.location.reload();
 	}
 }

 jQuery(document).ready(function() {
 	// $('#userMenu>p').css('font-weight', 'bold');
 	// $('#userMenu>i').css('font-weight', 'bold');
 	var info = [];
 	var color = [];
	//请求获奖列表
	var initAwardList = function(){
		$.ajax({
			url:'getAwardList.do',
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
					if (data.awardList.length == 0) {
						$("#award").hide();
					}else{
						info = data.awardList;
						if (info.length == 9) {
							color = ["#CC4D33", "#B3CC33", "#33B3CC", "#CC4D33", "#B3CC33", "#33B3CC", "#CC4D33", "#B3CC33", "#33B3CC"];
						}else if (info.length == 8) {
							color = ["#CC4D33", "#B3CC33", "#33B3CC", "#3366AF", "#8BD864", "#CC33B3", "#33CC4D", "#33CC99"];
						}else if (info.length == 7) {
							color = ["#CC4D33", "#B3CC33", "#33B3CC", "#3366AF", "#8BD864", "#CC33B3", "#33CC4D"];
						}else if (info.length == 6) {
							color = ["#E94269", "#F3AC45", "#4488CA", "#53972B", "#33CC4D", "#B3CC33"];
						}else{
							color = ["#E94269", "#F3AC45", "#4488CA", "#53972B", "#CC4D33"];
						}
						DrawRoun(color);
					};
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				failM('操作失败');
			}
		});
	}

	//生成转盘
	function DrawRoun (colors){
		var color = colors;
		var step = 2*Math.PI/info.length;   //12 info.length
		var outerR = 250; //轮盘的大小
		var interR = 100;//内存空白圆的大小
		for ( var i = 0; i < info.length; i++) { //12 info.length
			//color.push(getColor());
		}
		var canvas = document.getElementById("canvas");
		var context = canvas.getContext("2d");
		context.translate(250,250); //中心点
		init(context);
		function init(context){
			for ( var i = 0; i < info.length; i++) {  //12 info.length
				context.save();
				context.beginPath();
				context.moveTo(0,0);
				context.fillStyle=color[i];
				context.arc(0,0,outerR,i*step,(i+1)*step);
				context.fill();
				context.restore();
			}
			for ( var i = 0; i < info.length; i++) {  //12 info.length
				context.save();
				context.beginPath();
				context.fillStyle="#000";
				context.font="22px 微软雅黑";
				context.fillStyle = "#fff";
				context.textAlign="center";
				context.textBaseline="middle";
				context.rotate(i*step+step/2);
				context.fillText(info[i].FTitle,(outerR + interR)/2,0);
				context.restore();
			}
		}

		function getColor(){
			var random = function(){
				return Math.floor(Math.random()*255);
			}
			return "rgb("+random()+","+random()+","+random()+")";
		}
		$("#size").show();
		$(".portlet").hide();
		var size = $("#size").width();
		var aroundSize = size-20;
		var start = size/2.5;
		var marginSize = -size/5;
		jQuery("#canvas").css({width:aroundSize,height:aroundSize}).parent("div").css("width",aroundSize);
		jQuery(".rotary").css({width:start,height:start,marginTop:marginSize,marginLeft:marginSize});
	}

	var $rotary = $('.rotary');
	$rotary.click(function(){
		$.ajax({
			url:'draw.do',
			data:'',
			dataType:'json',
			type:'POST',
			success: function(data){
				if( data.message.result!=0 ){
					failM(data.message.errorMsg);
				} else {
					$('#back').show();
					for (var i = 0; i < info.length; i++) {
						if (data.FAwardId == info[i].FAwardId) {
							rotateFunc(180/info.length*(2*(i+1)-1),data.drawList);
							break;
						};
					};
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				failM('操作失败');
			}
		});
	});
	//ROUND BEGINING
	var rotateFunc = function(angle,list){
		//var j = 180/info.length
		//var text = info[(angle/j-1)/2];
		$rotary.stopRotate();
		$rotary.rotate({
			angle: 0,
			duration: 5000,
			animateTo: angle + 1440,
			callback: function(){
				//请求
				$.ajax({
					url:'notify.do',
					data:'',
					dataType:'json',
					type:'POST',
					success: function(data){
						bootbox.alert(data.content);
					},
					error: function(xhr, ajaxOptions, thrownError) {
						failM('操作失败');
					}
				});
			}
		});
	};

	var DB = window.location.host.substring(0, window.location.host.indexOf(".")).replace('-', '_');
	//DB = 'zh';
	var power = function(FIsAdmin, FPower, module) {
		if (FIsAdmin == 1 || FPower.indexOf("," + module + ",") != -1) {
			$("#" + module).show();
		} else {
			$("#" + module).hide();
		}
	}
	$.ajax({
		url:'getUserInitInfo.do',
		data:'',
		dataType:'json',
		type:'POST',
		success: function(data){
			if( data.message.result!=0 ){
				if (data.message.result == 2) {
					parent.window.location = "../login/login.html";
				}
			} else {
				if (data.CLOSE_FUNCTION.indexOf(',draw,') == -1) {
					if (data.targetFen) {
						var FFenToday = data.FFenToday;
						if (data.drawed != undefined && data.drawed) {
						} else {
							$("#draw").show();
							if (FFenToday >= data.everydayTargetFen) {
								$("#draw").html("我今天积分" + data.FFenToday + "分,已完成今天小目标,获得一次抽奖机会");
								initAwardList();
							} else {
								$("#draw").html("我今天积分" + data.FFenToday + "分,离今天的小目标还差" + (data.everydayTargetFen - data.FFenToday) + "分,完成有惊喜");
							}
						}
					}
				}

				$("#top").attr('href','../top/top-hdip.html?TODAY=' + data.TODAY + '&YESTODAY=' + data.YESTODAY);
				$("#FEmployeeName").html(data.model.FEmployeeName);
				$("#FFen").html(data.model.FFen);
				$("#FFenCurrMonth").html(data.model.FFenCurrMonth);
				$("#FFenYestoday").html(data.FFenYestoday);
				$("#fenOrder").html(data.fenOrder);
				$("#fenYestodayOrder").html(data.fenYestodayOrder);
				$("#fenCurrMonthOrder").html(data.fenCurrMonthOrder);
				$("#fenDeptOrder").html(data.fenDeptOrder);
				$(".img-responsive").attr("src" , getPhoto(DB, data.model.FPhoto));
				$(".img-responsive").show();
				//$("#FFenToday").html(data.FFenToday);
				if (data.CLOSE_FUNCTION.indexOf(',welfare,') != -1) {
					$('.welfare').hide();
					$('.wish').hide();
				} else {
					if (data.nearFenMargin !== undefined) {
						$("#welfare").html("离下一个福利还差" + data.nearFenMargin + "分");
					} else {
						$("#welfare").html("最近没有福利可拿");
					}
					var str = '';
					$.each(data.wishList,function(index,item){
						if (str != '') str += '<br/>';
						var FCreateTime = item.FCreateTime;
						FCreateTime = FCreateTime.substring(5, 10);
						str += FCreateTime + ' 许愿：' + item.FContent;
					});
					if (str != '') {
						$("#wishList").html(str);
					}
				}
				if (data.fenLogo !== undefined) {
					$('#huibiao').css('background-image','url(' + data.fenLogo + ')');
					$('#huibiao').show();
				} else {
					$("#level").html(icon(data.model.FFen));
					$("#level").show();
				}
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {
		}
	});
	$(".img-responsive").click(function() {
		window.location = 'wdzl.html';
	});
});        