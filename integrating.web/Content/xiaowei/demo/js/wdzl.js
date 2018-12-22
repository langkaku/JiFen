var host = window.location.host.replace('-', '_');
var db = host.substring(0, host.indexOf("."));
var setPhoto = function(photo) {
	if (photo == undefined || photo == "") {
		$("#FPhoto").css("display", "none");
		$("#nophoto").css("display", "");
	} else {
		$("#FPhoto").attr("src", "/upload/photo/" + db + "/" + photo + "?t=" + Date.parse(new Date()));
		$("#FPhoto").css("display", "");
		$("#nophoto").css("display", "none"); 
	}		    
}    
var setHead = function(head) {
	if (head == undefined || head == "") {
		$("#FHead").css("display", "none");
		$("#nohead").css("display", "");
	} else {
		var src = "/upload/head/" + db + "/" + head + "?t=" + Date.parse(new Date());
		$("#FHead").attr("src", src); 
		$("#FHead").css("display", "");
		$("#nohead").css("display", "none");
		$(window.parent.document).find("#FHead").attr('src', src);
	}	
};
function photoChanage(input) {
	previewImg(input, 'photoPost.do', 1500);
}
function headChanage(input) {
	previewImg(input, 'headPost.do', 300);
}
function previewImg(input, url, size) {
    var maxsize = 300 * 1024;//超过300k进行压缩
    //是否支持
    if (typeof FileReader === 'undefined') {
    	alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
    	input.setAttribute('disabled','disabled');
    }
    if(input.files && input.files[0]){
    	var file = input.files[0],
    	reader = new FileReader();
    	if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
    		alert('不是有效的图片文件!');
    		return;
    	}
    	reader.readAsDataURL(file);
    	reader.onload = function(e){
             var result=this.result;//获取到base64的图片
            //大于300k图片进行压缩
            if(result.length >= maxsize){
                //getId(imgObj).setAttribute('src',result);//回显图片
                //getId(imgObj).classList.add('on');//回显图片
                //var img = new Image();
                //img.src = result; //result是 传送过来的图片文件
                lrz(input.files[0], {  
                	width: size  
                })  
                .then(function (rst) {   
                       //压缩后异步上传  
                       $.ajax({  
                       	url : url,  
                       	type: "POST",  
                       	data : {
                            image:rst.base64,//压缩后的base值
                        },  
                        dataType:"json",  
                        cache:false,  
                        async:false,  
                        success : function(data) {
                        	if (url == 'photoPost.do') {
                        		setPhoto(data.FPhoto);
                        		if (data.FHead !== undefined) setHead(data.FHead);	                
                        		success('上传照片成功');
                        	} else {
                        		setHead(data.FHead);		             	
                        		success('上传头像成功');
                        	}
                        },
                        error : function(){

                        }  
                    });  

                   })
            }else{
                //getId(imgObj).setAttribute('src',result);
               // getId(imgObj).classList.add('on');
               var img = new Image();
               img.src = result;
                //getId(imgObj).setAttribute('src',result);
                //getId(imgObj).classList.add('on');
                $.ajax({  
                	url :url,  
                	type: "POST",  
                	data : {
                        image:result//压缩后的base值
                    },  
                    dataType:"json",  
                    cache:false,  
                    async:false,  
                    success : function(data) {
                    	if (url == 'photoPost.do') {
                    		setPhoto(data.FPhoto);
                    		if (data.FHead !== undefined) setHead(data.FHead);	                
                    		success('上传照片成功');
                    	} else {
                    		setHead(data.FHead);		             	
                    		success('上传头像成功');
                    	}
                    },
                    error : function(){

                    }  
                });

            }

        }
    }
}

jQuery(document).ready(function() {
	Module.init();
	$('#logout').click(function() {
		$.ajax({
			url: '../logout/logout.do',
			data: '',
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				if (getParam(window.location.href, 'touch') == 1) {
					window.location="../login/login-touch.html";
				} else {
					window.location="../login/login.html";
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
			}    
		});
	});
});