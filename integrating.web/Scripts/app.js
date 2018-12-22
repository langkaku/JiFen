
function loadJSAPI(jsApiList,func) {
	if(jsApiList == undefined || jsApiList == []){
		jsApiList = ['runtime.info'];
	}
	var senddata = {
		"function": "getDingConfig(url)",
		"url": window.location.href
	}
	doAjax(senddata, function(_config) {
		window._config = _config;
		if(typeof(dd) == "object" && dd.version){
			dd.config({
				agentId: _config.agentId,
				corpId: _config.corpId,
				timeStamp: _config.timeStamp,
				nonceStr: _config.nonceStr,
				signature: _config.signature,
				jsApiList: jsApiList
			});
			
			dd.ready(function() {
				func();
			});
			
			dd.error(function(err) {
				showMsg('dd error: ' + JSON.stringify(err));
			});
		}else if(typeof(DingTalkPC) == "object" && DingTalkPC.ua.isInDingTalk){
			DingTalkPC.config({
				agentId: _config.agentId,
				corpId: _config.corpId,
				timeStamp: _config.timeStamp,
				nonceStr: _config.nonceStr,
				signature: _config.signature,
				jsApiList: jsApiList
			});
			
			DingTalkPC.ready(function() {
				func();
			});
			
			DingTalkPC.error(function(err) {
				showMsg('DingTalkPC error: ' + JSON.stringify(err));
			});
		}else{
			func();
		}
	})
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
