// 苹果手机适配
if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
	window.onload = function(){
		sessionStorage.setItem("historyUrl",window.location.href);
	}
	
	window.onpopstate = function(event){
		var historyUrl = sessionStorage.getItem("historyUrl");
		if(historyUrl){
			location.href = historyUrl;
		}else{
			history.back();
		}
	}
}
// 显示标题
if(sessionStorage.getItem("rolename")){
	var pathname = location.pathname.split("/");
	if($.inArray("tools", pathname) == -1){
		document.title = "员工积分  - " + sessionStorage.getItem("rolename")	
	}
}
// 页面添加水印
if(sessionStorage.getItem("watermark")){
	watermark({"watermark_txt": sessionStorage.getItem("watermark"), "watermark_x_space": 100, "watermark_width": 320})	
}

// 添加会计格式显示
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

// 手机号控件添加点击反显功能
$("#mobile").click(function(){
	if($(this).prop("tagName") == "INPUT" && $(this).attr("readonly") == "readonly" && $(this).attr("type") == "text"){
		var obj = $(this);
		var showText = $(this).val();
		if(showText){
			var isEncrypt = false;
			for(var i=0;i<showText.length;i++){
				if("~!@#$%^&*+".indexOf(showText.substr(i,1)) > -1){
					isEncrypt = true;
					break;
				}
			}
			if(isEncrypt){
				var senddata = {
					"function" : "decryptText(showtext)",
					"showtext" : showText
				}
				doAjax(senddata,function(data){
					$(obj).val(data.text);
					if($("#phone").length > 0 && $("#phone").hasClass("button")){
						$("#phone").attr("href", "tel:" + data.text);
					}
				})	
			}
		}
	}
})

// 函数库区
function doAjax(senddata, func) {
	var lNotShowPreloader = false;
	if(typeof(senddata.NotShowPreloader) == "boolean" && senddata.NotShowPreloader){
		lNotShowPreloader = true;
	}
	var cPreloaderTitle = "正在加载数据...";
	if(typeof(senddata.PreloaderTitle) == "string" && senddata.PreloaderTitle != ""){
		cPreloaderTitle = senddata.PreloaderTitle
	}
	var nPreloaderTimeout = 20000;
	if(typeof(senddata.PreloaderTimeout) == "number" && senddata.PreloaderTimeout >= 0){
		nPreloaderTimeout = senddata.PreloaderTimeout
	}
	delete senddata.NotShowPreloader;
	delete senddata.PreloaderTitle;
	delete senddata.PreloaderTimeout;
	
	if(!lNotShowPreloader){
		$.showPreloader(cPreloaderTitle);
	    if(nPreloaderTimeout > 0){
	    	setTimeout(function () {
		        $.hidePreloader();
		    }, nPreloaderTimeout);	
	    }
	}
      
	var arr = location.href.split("/");  
	arr.pop();
	if(arr[arr.length-1] == "html"){
		var header = "../";	
	}else if(arr[arr.length-1] == "tools"){
		var header = "../../";
	}else{
		var header = "";
	}
	var path = header + "websrv.asp";
	if(typeof(senddata) == "object") {
		senddata = JSON.stringify(senddata);
	}
	$.post(path, senddata, function(data, status) {
		if(!lNotShowPreloader){
			$.hidePreloader();
		}
		if(status == "success") {
			try {
				data = JSON.parse(data);
			} catch(e) {
				data = {
					"error": "json 数据解析错误!"
				};
			}
			// 登录超期,请重新登录
			if(data.error && data.error == "登录超期,请重新登录"){
				$.alert("登录超期,请重新登录",function(){
					window.location.replace(header + "index.asp");
				});
			}else{
				func(data);	
			}
		}
	});
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return(r[2]);
	return null;
}

function Strextract(str,chr1,chr2,index){
	if(typeof(index) == "undefined"){
        index = 1;
   }
    var chr1len,chr1site,chr2len,chr2site;
    chr1len = chr1.length;
    chr2len = chr2.length;
    chr1site = 0;
    chr2site = 0;
    for(var i=0;i<index;i++){
        chr1site = str.indexOf(chr1,chr1site);
        chr2site = str.indexOf(chr2,chr2site);
        if(chr1site == -1 || chr2site == -1){
        	break;
        }
        chr1site = str.indexOf(chr1,chr1site)+ chr1len;
        chr2site = str.indexOf(chr2,chr2site) + chr2len;
    }

    return str.substring(chr1site,chr2site - chr2len);	
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

function showEmptyDate(date){
	if(typeof(date) == "string" && date == "0000-00-00 00:00"){
		return "";
	}else{
		return date;
	}
}

function showMsg(text,func){
	if(typeof(dd) == "object" && dd.version){
		dd.device.notification.alert({
		    message: text,
		    title: "提示",//可传空
		    buttonName: "确定",
		    onSuccess : function() {
		    	if(typeof(func) == "function"){
		    		func();	
		    	}
		    },
		    onFail : function(err) {}
		});	
	}else if(typeof(DingTalkPC) == "object" && DingTalkPC.ua.isInDingTalk){
		DingTalkPC.device.notification.alert({
		    message: text,
		    title: "提示",//可传空
		    buttonName: "确定",
		    onSuccess : function() {
		    	if(typeof(func) == "function"){
		    		func();	
		    	}
		    },
		    onFail : function(err) {}
		});	
	}else{
		alert(text);
		if(typeof(func) == "function"){
    		func();	
    	}
	}
}

function loadJSAPI(jsApiList,func) {
	if(jsApiList == undefined || jsApiList == []){
		jsApiList = ['runtime.info'];
    }
    $.post("Application/getDingConfig", { "url": window.location.href }, function (_config) {
        _config = JSON.parse(_config)
        window._config = _config;
        if (typeof (dd) == "object" && dd.version) {
            console.log(_config.agentId)
            dd.config({
                agentId: _config.agentId,
                corpId: _config.corpId,
                timeStamp: _config.timeStamp,
                nonceStr: _config.nonceStr,
                signature: _config.signature,
                jsApiList: jsApiList
            });

            dd.ready(function () {
                func();
            });

            dd.error(function (err) {
                showMsg('dd error: ' + JSON.stringify(err));
            });
        } else if (typeof (DingTalkPC) == "object" && DingTalkPC.ua.isInDingTalk) {
            DingTalkPC.config({
                agentId: _config.agentId,
                corpId: _config.corpId,
                timeStamp: _config.timeStamp,
                nonceStr: _config.nonceStr,
                signature: _config.signature,
                jsApiList: jsApiList
            });

            DingTalkPC.ready(function () {
                func();
            });

            DingTalkPC.error(function (err) {
                showMsg('DingTalkPC error: ' + JSON.stringify(err));
            });
        } else {
            func();
        }
    });
}

function showPreloader(text){
	text = typeof(text) == "undefined" || text == "" ? "正在加载数据..." : text;
	
	if(typeof(dd) == "object" && dd.version){
		dd.device.notification.showPreloader({
		    text: text,
		    showIcon: true,
		    onSuccess : function(result) {},
		    onFail : function(err) {}
		})	
	}
}

function hidePreloader(){
	if(typeof(dd) == "object" && dd.version){
		dd.device.notification.hidePreloader({
		    onSuccess : function(result) {},
		    onFail : function(err) {}
		})
	}
}

function toast(text,icon,timeout){
	text = typeof(text) == "undefined" || text == "" ? "执行完成" : text;
	icon = typeof(icon) == "undefined" || icon == "" ? "" : icon;
	timeout = typeof(timeout) == "undefined" || timeout == 0 ? 1 : timeout;
	
	if(typeof(dd) == "object" && dd.version){
		dd.device.notification.toast({
		    icon: icon, //icon样式，有success和error，默认为空 0.0.2
		    text: text, //提示信息
		    duration: timeout, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
		    delay: 0, //延迟显示，单位秒，默认0
		    onSuccess : function(result) {},
		    onFail : function(err) {}
		})
	}else if(typeof(DingTalkPC) == "object" && DingTalkPC.ua.isInDingTalk){
		DingTalkPC.device.notification.toast({
		    icon: icon, //icon样式，有success和error，默认为空 0.0.2
		    text: text, //提示信息
		    duration: timeout, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
		    delay: 0, //延迟显示，单位秒，默认0
		    onSuccess : function(result) {},
		    onFail : function(err) {}
		})
	}
}
