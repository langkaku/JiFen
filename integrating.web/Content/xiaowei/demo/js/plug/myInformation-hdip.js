var Module = function () {
    var form = $('#form');
    var el = $(".portlet-body"); 
    var initMyInformation = function(){
        $.ajax({
            url:'getMyInformation.do',
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
					setPhoto(data.db, data.model.FPhoto);		                
					setHead(data.db, data.model.FHead);	
                    $("#EmploeedId").val(data.model.FEmployeeId);
                    $("#username").html(data.model.FEmployeeName);
                    $("#tel").html(data.model.FMobile);
                    var sex = '';
                    for(var item in Status.SexStatus){
                        if (Status.SexStatus[item] == data.model.FSex) {
                            sex = item;
                        };
                    }
                    var sexName = sex+'Name';
                    $("#sex").html(Status.SexStatus[sexName]);
                    $("#dob").html(data.model.FStaffDate);                                  
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                failM('操作失败');
            }
        });
    }

    $(".FPass").click(function(){
        document.form.reset();
        validator.resetForm();
        $("#modal").modal("show"); 
    }); 
    var validator = form.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: false,
        ignore: "",
        messages: {
        },
        rules: {
            FPass: {
                //minlength: 5,
                required: true
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
            addPost();
        }
    });        

    $("#savePass").click(function(){
        if (form.valid()) {
            form.submit();
        }
    });

    var addPost = function(){
        var queryString = "FPass="+$.md5($("#FPass").val());
        $.ajax({
            url:'modifyMyPass.do',
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if( data.message.result!=0 ){
                    if (data.message.result == 2) {
                        failM(data.message.errorMsg);
                    } else {                        
                        failM(data.message.errorMsg);
                    }
                } else {
                    $("#modal").modal("hide");
                    successM('重置密码成功');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                failM('操作失败');
            }
        });
    }
    var setPhoto = function(db, photo) {
		if (photo == undefined || photo == "") {
			$("#FPhoto").css("display", "none");
			$("#nophoto").css("display", "");
		} else {
			$("#FPhoto").attr("src", "/upload/photo/" + db + "/" + photo + "?t=" + Date.parse(new Date()));
			$("#FPhoto").css("display", "");
			$("#nophoto").css("display", "none"); 
		}		    
    }    
    var setHead = function(db, head) {
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
    return {
        init: function () {
            initMyInformation();
        }

    };

}();





