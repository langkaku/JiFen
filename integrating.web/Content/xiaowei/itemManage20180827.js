var Module = function () {
    var nEditing = null;
    var table1 = $('#table1');
    var form1 = $('#form1');
    var el = $("#modal1 > .modal-dialog");
    $("#FFen,#FFen1,#FFen2,#FFen3").focus(function () {
        $(this).select();
    });
    var rule = { required: true, min: Status.FenRangeStatus.min, max: Status.FenRangeStatus.max, messages: { required: "这是必填字段" } };
    $("#FRule0").click(function () {
        $('#uncertainFenDiv').hide();
        $('#fenTitle').html('分数');
        $('#fenDiv').show();
        $('#stepFenDiv').hide();
        $("#FFen").rules("add", rule);
        $("#FFen1").rules("remove");
        $("#FFen2").rules("remove");
        $("#FFen3").rules("remove");
    });
    $("#FRule1").click(function () {
        $('#uncertainFenDiv').hide();
        $('#fenTitle').html('分数');
        $('#fenDiv').hide();
        $('#stepFenDiv').show();
        $("#FFen").rules("remove");
        $("#FFen1").rules("add", rule);
        $("#FFen2").rules("add", rule);
        $("#FFen3").rules("add", rule);
    });
    $("#FRule2").click(function () {
        $('#uncertainFenDiv').hide();
        $('#fenTitle').html('<span class="font-red bold">单件分数</span>');
        $('#fenDiv').show();
        $('#stepFenDiv').hide();
        $("#FFen").rules("add", rule);
        $("#FFen1").rules("remove");
        $("#FFen2").rules("remove");
        $("#FFen3").rules("remove");
    });
    $("#FRule3").click(function () {
        $('#uncertainFenDiv').show();
        $('#fenTitle').html('分数');
        $('#fenDiv').hide();
        $('#stepFenDiv').hide();
        $("#FFen").rules("remove");
        $("#FFen1").rules("remove");
        $("#FFen2").rules("remove");
        $("#FFen3").rules("remove");
    });

    var oTable1 = table1.dataTable({
        "aaSorting": [1, 'asc'],
        "sAjaxSource": "getItemListWithContent.do",
        "aoColumns": [
            {
                "class": null,
                "orderable": false,
                "data": null,
                "defaultContent": '<input type="checkbox" class="checkboxes" />'
            },
            {
                "class": null,
                "data": "FNum",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html('<a class="edit">' + oData.FNum + '</a>');
                }
            },
            { "mData": "FItemTypeName" },
            { "mData": "FTitle" },
            { "mData": "FRuleName" },
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": '<span class="row-details row-details-close"></span>',
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    oTable1.fnClose(iRow);
                }
            },
            {
                "mData": null,
                "bSortable": false,
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    $(nTd).html('<a class="modify btn default btn-xs blue-stripe" href="javascript:;" iRow="' + iRow + '">编辑</a><a class="stop btn default btn-xs purple-stripe" href="javascript:;" iRow="' + iRow + '">暂停</a><a class="delete btn default btn-xs red-stripe" href="javascript:;" iRow="' + iRow + '">彻底删除</a>');
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
        "dom": "<'row'<'col-md-3 col-sm-12'<'pull-left'f>><'col-md-9 col-sm-12'<'buttons pull-right'>>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
        "fnInfoCallback": function (oSettings, iStart, iEnd, iMax, iTotal, sPre) {
            $('input[type="checkbox"]').uniform();
            if (iTotal == 0) {
                return "没有数据";
            } else {
                return iStart + " 至 " + iEnd + " /共 " + iTotal + " 行";
            }
        }
    });
    table1.on('click', '.edit', function (e) {
        var nRow = $(this).parents('tr')[0];
        var oData = oTable1.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        jqTds[1].innerHTML = '<input type="number" class="form-control input-small FNum" style="max-width:80px;" FItemId="' + oData.FItemId + '" value="' + oData.FNum + '"/><a class="save btn purple btn-xs">保存</a><a class="cancel btn default btn-xs">取消</a>';
        $('.FNum').select();
    });
    table1.on('click', '.cancel', function (e) {
        var nRow = $(this).parents('tr')[0];
        var oData = oTable1.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        jqTds[1].innerHTML = '<a class="edit">' + oData.FNum + '</a>';
    });
    table1.on('click', '.save', function (e) {
        var nRow = $(this).parents('tr')[0];
        var oData = oTable1.fnGetData(nRow);
        var FItemId = oData.FItemId;
        var FNum = $(this).prev().val();
        var queryString = "FItemId=" + FItemId + "&FNum=" + FNum;
        $.ajax({
            url: 'updateNum.do',
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data.message.result != 0) {
                    fail(data.message.errorMsg);
                } else {
		            /*var aData = oTable1.fnGetData(nRow);
		            oTable1.fnUpdate(FNum, nRow, 1, false);
		            var jqTds = $('>td', nRow);
		            jqTds[1].innerHTML = '<input type="number" class="form-control input-small FNum" FItemId="' + aData.FItemId + '" style="max-width:80px;" value="' + FNum + '"/>';
					$('#table1').DataTable()
				    .order( [[ 1, 'asc' ]] )
				    .draw(  );*/
                    oTable1.fnReloadAjax();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });

        oTable1.fnReloadAjax();
    });
    /*$('.FNum').bind('blur', function(){
        var nRow = $(this).parents('tr')[0];;
        var FItemId = $(this).attr('FItemId');
        var FNum = $(this).val();
        var queryString = "FItemId=" + FItemId + "&FNum=" + FNum;
        $.ajax({
            url: 'updateNum.do',
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if( data.message.result!=0 ){
                    fail(data.message.errorMsg);
                } else {
                    var aData = oTable1.fnGetData(nRow);
                    oTable1.fnUpdate(FNum, nRow, 1, false);
                    var jqTds = $('>td', nRow);
                    jqTds[1].innerHTML = '<input type="number" class="form-control input-small FNum" FItemId="' + aData.FItemId + '" style="max-width:80px;" value="' + FNum + '"/>';
                    $('#table1').DataTable()
                    .order( [[ 1, 'asc' ]] )
                    .draw(  );
                    //oTable1.fnReloadAjax();
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
            }
        });
    });*/

    $("#table1_wrapper div.buttons").html('<form id="formFile" name="formFile" method="post" action="uploadFile.do" target="frameFile" enctype="multipart/form-data"><div class="fileinput fileinput-new" style="display:none" data-provides="fileinput"><span class="btn default btn-file"><span>从文件导入标准...</span><input type="file" id="file" name="file" ></span>(导入前先<a href="../common/moban.xls" style="text-decoration:underline">下载模板</a>)</div><a class="btn btn-default import"><i class="fa fa-file"></i> 导入标准... </a><a class="btn btn-default" id="print">打印标准</a><a class="btn btn-default batch"> 批量删除 </a><a class="btn green add" id="addItem"><i class="fa fa-plus"></i> 添加标准 </a></form>');
    if (!IsPC()) {
        $('.import').hide();
        $('#print').hide();
    }

    $('.import').click(function () {
        $('.fileinput').show();
        $('.import').hide();
    });
    var host = window.location.host;
    if (host == 'hi.xiaov100.com') {
        $('.batch').hide();
    }
    var tableWrapper = $("#table1_wrapper");
    tableWrapper.find(".dataTables_length select").select2({
        showSearchInput: true
    });
    table1.find('.group-checkable').change(function () {
        var checked = jQuery(this).is(":checked");
        $('#table1 .checkboxes').each(function () {
            var iRow = $(this).parents('tr')[0];
            var aData = oTable1.fnGetData(iRow);
            if (checked) {
                $(this).prop("checked", true);
                $(this).parents('tr').addClass("active");
            } else {
                $(this).prop("checked", false);
                $(this).parents('tr').removeClass("active");
            }
        });
        jQuery.uniform.update('#table1 .checkboxes');

    });


    var validator = form1.validate({
        errorElement: 'span',
        errorClass: 'help-block help-block-error',
        focusInvalid: false,
        ignore: "",
        messages: {
        },
        rules: {
            FTitle: {
                minlength: 2,
                required: true
            },
            FRule: {
                required: true
            },
            FFen: {
                required: true,
                range: [Status.FenRangeStatus.min, Status.FenRangeStatus.max]
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
    $("#save").click(function () {
        if (form1.valid()) {
            form1.submit();
        }
    });
    $(".type").click(function () {
        window.location = 'itemTypeManage.html';
    });
    $(".stopManage").click(function () {
        window.location = 'stopManage.html';
    });
    $(".percent").click(function () {
        window.location = 'ambPercent.html';
    });
    $(".add").live('click', function () {
        nEditing = null;
        complete(el);
        $("#inputDiv").show();
        $("#listDiv").hide();
        document.form1.reset();
        $.uniform.update($("input[type=radio]").attr("checked", false));
        $.uniform.update($(":input[name=FRule][value=0]").attr("checked", true));
        $('#FRule0').click();
        $('#FContent').val('');
        $('.Metronic-alerts').remove();
        validator.resetForm();
        $("#addTitle").css('display', '');
        $("#modifyTitle").css('display', 'none');
        selectInit('getItemTypeIdAndNameList.do', 'FItemTypeId', 'FItemTypeId', 'FItemTypeName', '');
        $.uniform.update($(':input[name=FShowType]').select2("val", 0));
        $.uniform.update($(':input[name=FLimitType]').select2("val", 0));
        $.uniform.update($(':input[name=FCheckType]').select2("val", 0));
        getDeptIdAndNameList();
        initEmployee('');
        initCheckEmployee('');
        $('#deptIdsDiv').hide();
        $('#employeeIdsDiv').hide();
        $('#limitCountDiv').hide();
        $('#checkEmployeeIdsDiv').hide();
        $('#FShowType').change();
        $('#FLimitType').change();
        $('#FCheckType').change();
    });
    $("#back").click(function () {
        $("#inputDiv").hide();
        $("#listDiv").show();
    });
    var addPost = function () {
        wait(el);
        var FCheckEmployeeNames = ',';
        $('#FCheckEmployeeIds').find("option:selected").each(function () {
            var t = $(this).text();
            if (FCheckEmployeeNames.indexOf(',' + t + ',') == -1) {
                FCheckEmployeeNames += t + ',';
            }
        });
        if (FCheckEmployeeNames == ',') FCheckEmployeeNames = '';
        else FCheckEmployeeNames = FCheckEmployeeNames.substring(1, FCheckEmployeeNames.length - 1);
        var url = "itemAdd.do";
        var queryString = $("#form1").serialize() + '&FCheckEmployeeNames=' + FCheckEmployeeNames;
        $.ajax({
            url: url,
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                complete(el);
                if (data.message.result != 0) {
                    fail(data.message.errorMsg);
                } else {
                    oTable1.fnReloadAjax();
                    $("#inputDiv").hide();
                    $("#listDiv").show();
                    success('添加成功');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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
    $(".temp-table .modify").live("click", function () {
        iRow = $(this).attr("iRow");
        modify(iRow);
    });
    var modify = function (iRow) {
        var aData = oTable1.fnGetData(iRow);
        nEditing = iRow;
        complete(el);
        $("#inputDiv").show();
        $("#listDiv").hide();
        document.form1.reset();
        $('.Metronic-alerts').remove();
        validator.resetForm();
        $("#addTitle").css('display', 'none');
        $("#modifyTitle").css('display', '');
        var url = "getItemModel.do";
        var queryString = 'FItemId=' + aData.FItemId;
        $.ajax({
            url: url,
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                complete(el);
                if (data.message.result != 0) {
                    window.setTimeout(function () {
                        errorTip(data.message.errorMsg, ".form-body");
                    }, 300);
                } else {
                    var model = data.model;
                    $(":input[name=FItemId]").val(model.FItemId);
                    $(":input[name=FTitle]").val(model.FTitle);
                    $(":input[name=FFen]").val(model.FFen);
                    $(":input[name=FFen1]").val(model.FFen1);
                    $(":input[name=FFen2]").val(model.FFen2);
                    $(":input[name=FFen3]").val(model.FFen3);
                    $.uniform.update($("input[type=radio]").attr("checked", false));
                    $.uniform.update($(":input[name=FRule][value=" + model.FRule + "]").attr("checked", true));
                    $('#FRule' + model.FRule).click();
                    selectInit('getItemTypeIdAndNameList.do', 'FItemTypeId', 'FItemTypeId', 'FItemTypeName', model.FItemTypeId);
                    $('#FContent').val(model.FContent);
                    getDeptIdAndNameList(model.FDeptIds);
                    initEmployee(model.FEmployeeIds.split(','));
                    initCheckEmployee(model.FCheckEmployeeIds);
                    $.uniform.update($(':input[name=FShowType]').select2("val", model.FShowType));
                    $('#FShowType').change();
                    $.uniform.update($(':input[name=FLimitType]').select2("val", model.FLimitType));
                    $('#FLimitType').change();
                    $('#FLimitCount').val(model.FLimitCount);
                    $.uniform.update($(':input[name=FCheckType]').select2("val", model.FCheckType));
                    $('#FCheckType').change();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                complete(el);
                errorTip('操作失败', ".form-body");
            }
        });
    };
    var modifyPost = function () {
        wait(el);
        var FCheckEmployeeNames = ',';
        $('#FCheckEmployeeIds').find("option:selected").each(function () {
            var t = $(this).text();
            if (FCheckEmployeeNames.indexOf(',' + t + ',') == -1) {
                FCheckEmployeeNames += t + ',';
            }
        });
        if (FCheckEmployeeNames == ',') FCheckEmployeeNames = '';
        else FCheckEmployeeNames = FCheckEmployeeNames.substring(1, FCheckEmployeeNames.length - 1);
        var url = "itemModify.do";
        var queryString = $("#form1").serialize() + '&FCheckEmployeeNames=' + FCheckEmployeeNames;
        $.ajax({
            url: url,
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                complete(el);
                if (data.message.result != 0) {
                    fail(data.message.errorMsg);
                } else {
                    oTable1.fnReloadAjax();
                    $("#inputDiv").hide();
                    $("#listDiv").show();
                    success('修改成功');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
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
    $(".temp-table .delete").live("click", function () {
        iRow = $(this).attr("iRow");
        deleteConfirm(iRow);
    });
    var deleteConfirm = function (iRow) {
        confirm("是否确认删除,删除后无法还原?", function (result) {
            if (result) {
                var aData = oTable1.fnGetData(iRow);
                var url = "itemDelete.do";
                var queryString = "FItemId=" + aData.FItemId;
                $.ajax({
                    url: url,
                    data: queryString,
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.message.result != 0) {
                            fail(data.message.errorMsg);
                        } else {
                            oTable1.fnReloadAjax();
                            success('删除成功');
                            table1.find('.group-checkable').prop("checked", false);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

                    }
                });
            }
        });
    };

    table1.on('click', '.stop', function (e) {
        e.preventDefault();
        var iRow = $(this).parents('tr')[0];
        stopConfirm(iRow);
    });
    $(".temp-table .stop").live("click", function () {
        iRow = $(this).attr("iRow");
        stopConfirm(iRow);
    });
    var stopConfirm = function (iRow) {
        confirm("是否确认暂停此积分标准?", function (result) {
            if (result) {
                var aData = oTable1.fnGetData(iRow);
                var url = "itemStop.do";
                var queryString = "FItemId=" + aData.FItemId;
                $.ajax({
                    url: url,
                    data: queryString,
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.message.result != 0) {
                            fail(data.message.errorMsg);
                        } else {
                            oTable1.fnReloadAjax();
                            success('暂停成功');
                            table1.find('.group-checkable').prop("checked", false);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

                    }
                });
            }
        });
    };

    $(".batch").on('click', function () {
        var member = [];
        $('#table1 .checkboxes').each(function () {
            var iRow = $(this).parents('tr')[0];
            var aData = oTable1.fnGetData(iRow);
            if ($(this).prop("checked")) {
                member.push(aData.FItemId);
            }
        });
        if (member.length == 0) {
            fail('请至少选择一条标准');
            return;
        }

        confirm("批量撤消选中的标准，请确认?", function (result) {
            if (result) {
                var url = "batch.do";
                var queryString = "FItemIds=" + member.join(',');
                $.ajax({
                    url: url,
                    data: queryString,
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        if (data.message.result != 0) {
                            fail(data.message.errorMsg);
                        } else {
                            oTable1.fnReloadAjax();
                            success('删除成功');
                            table1.find('.group-checkable').prop("checked", false);
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

                    }
                });
            }
        });
    });


    var fnFormatDetails = function (oTable, nTr) {
        var oData = oTable.fnGetData(nTr);
        var FContent = oData.FContent;
        if (FContent === undefined || FContent === null) {
            $.ajax({
                url: 'getItemModel.do',
                data: 'FItemId=' + oData.FItemId,
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.message.result !== 0) {
                        fail(data.message.errorMsg);
                    } else {
                        FContent = data.model.FContent;
                        if (FContent === '') {
                            FContent = "详情为空";
                        }
                        oTable.fnOpen(nTr, FContent, 'details');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
        } else {
            if (FContent === '') {
                FContent = "详情为空";
            }
            oTable.fnOpen(nTr, FContent, 'details');
        }
    }
    $('#table1 tbody').on('click', 'td.details-control', function () {
        var nTr = $(this).closest('tr')[0];
        if (oTable1.fnIsOpen(nTr)) {
            $(this).children('span').addClass("row-details-close").removeClass("row-details-open");
            oTable1.fnClose(nTr);
        }
        else {
            $(this).children('span').addClass("row-details-open").removeClass("row-details-close");
            fnFormatDetails(oTable1, nTr);
        }
    });

    var tempList = function (FItemTemplateTypeId, FItemTemplateTypeName, FItemTemplateTypeColor, FCount) {
        var str = '';
        str += '<div class="col-md-12"><div class="top-news">';
        str += '<a href="itemTemplate.html?FItemTemplateTypeId=' + FItemTemplateTypeId + '" target="_blank" class="btn ' + FItemTemplateTypeColor + '">';
        str += '<span>' + FItemTemplateTypeName + '</span>';
        str += '<em><i class="fa fa-tags"></i>共' + FCount + '条积分标准 </em>';
        str += '<i class="fa fa-flag top-news-icon"></i>';
        str += '</a></div>';
        str += '</div>';
        return str;
    }

	/*$.ajax({
		url:'getItemTemplateTypeList.do',
		data:'',
		dataType:'json',
		type:'POST',
		success: function(data){
			var str = '';
			$.each(data.aaData,function(index,item){
				str += tempList(item.FItemTemplateTypeId, item.FItemTemplateTypeName, item.FItemTemplateTypeColor, item.FCount);
			});
			$("#referenceTemp").append(str);
		},
		error: function(xhr, ajaxOptions, thrownError) {
			
		}
	});*/
    $("#file").change(function () {
        $('#formFile').submit();
    });
    $("#frameFile").load(function () {
        $('#formFile')[0].reset()
        var text = $(window.frames['frameFile'].document.body).text();
        if (text != null) {
            data = eval('(' + text + ')');
            if (data.message.result != 0) {
                if (data.message.result == 2) {
                    parent.window.location = "../login/login.html";
                } else if (data.message.result == 100) {
                    fail("只支持xls文件格式");
                } else if (data.message.result == 101) {
                    fail("文件大小超出500K");
                } else {
                    var errorMsg = data.message.errorMsg;
                    var msg = errorMsg.substring(0, errorMsg.indexOf(":"));
                    var row = errorMsg.substring(errorMsg.indexOf(":") + 1);
                    if (msg == 'column count error') {
                        fail("第" + row + "行格式错误，正常式格是(第1列：序号；第2列：类别；第3列：标题；第4列：分数；第5列：详细内空)");
                    } else if (msg == 'num error') {
                        fail("第" + row + "行，第1列错误，第一列为序号，必须是整数");
                    } else if (msg == 'item type not exists error') {
                        fail("第" + row + "行，第2列错误，不存在的类别");
                    } else if (msg == 'titile empty error') {
                        fail("第" + row + "行，第3列错误，此列是积分标题，不能为空");
                    } else if (msg == 'fen error') {
                        fail("第" + row + "行，第4列错误，分数格式错误");
                    } else if (msg == 'dept error') {
                        fail("第" + row + "行，第5列错误，可见范围错误");
                    } else if (msg == 'limit error') {
                        fail("第" + row + "行，第5列错误，申请频次错误");
                    } else if (msg == 'check error') {
                        fail("第" + row + "行，第5列错误，审核人错误");
                    } else {
                        fail("导入失败，错误未知");
                    }
                }
            } else {
                oTable1.fnReloadAjax();
                success('导入标准成功');
            }
        }
    });
    var employeeLoaded = false;
    var initEmployee = function (FEmployeeIds) {
        if (!employeeLoaded) {
            $.ajax({
                url: 'getEmployeeTreeSelectOptionHtml.do',
                data: '',
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.message.result != 0) {
                        fail(data.message.errorMsg);
                    } else {
                        $(':input[name=FEmployeeIds]').html(data.html);
                        $(':input[name=FEmployeeIds]').val(FEmployeeIds).multipleSelect({
                            selectAll: false,
                            filter: true,
                            multiple: true
                        });
                    }
                }
            });
            //employeeLoaded = true;
        } else {
            if (FEmployeeIds !== undefined) {
                var arr = FEmployeeIds.split(',');
                $(':input[name=FEmployeeIds]').val(arr);
            } else {
                $(':input[name=FEmployeeIds]').val('');
            }
        }
    }
    var checkEmployeeLoaded = false;
    var initCheckEmployee = function (FCheckEmployeeIds) {
        if (!checkEmployeeLoaded) {
            $.ajax({
                url: 'getCheckEmployeeTreeSelectOptionHtml.do',
                data: '',
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.message.result != 0) {
                        fail(data.message.errorMsg);
                    } else {
                        $(':input[name=FCheckEmployeeIds]').select2({
                            allowClear: true
                        });
                        $(':input[name=FCheckEmployeeIds]').append(data.html);
                        if (FCheckEmployeeIds != '') {
                            $.uniform.update($(':input[name=FCheckEmployeeIds]').select2("val", FCheckEmployeeIds.split(',')));
                        }
                    }
                }
            });
            checkEmployeeLoaded = true;
        } else {
            if (FCheckEmployeeIds !== undefined) {
                if (FCheckEmployeeIds != '') {
                    $.uniform.update($(':input[name=FCheckEmployeeIds]').select2("val", FCheckEmployeeIds.split(',')));
                }
            } else {
                $(':input[name=FCheckEmployeeIds]').val('');
            }
        }
    }
    var deptLoaded = false;
    var getDeptIdAndNameList = function (FDeptIds) {
        if (!deptLoaded) {
            $.ajax({
                url: 'getDeptIdAndNameList.do',
                data: '',
                dataType: 'json',
                type: 'POST',
                success: function (data) {
                    if (data.message.result != 0) {
                        fail(data.message.errorMsg);
                    } else {
                        $.each(data.aaData, function (index, item) {
                            $(':input[name=FDeptIds]').append('<option value="' + item.FDeptId + '">' + item.FDeptName + '</option>');
                        });
                        if (FDeptIds !== undefined) {
                            var arr = FDeptIds.split(',');
                            $.uniform.update($(':input[name=FDeptIds]').select2("val", arr));
                        } else {
                            $.uniform.update($(':input[name=FDeptIds]').select2("val", ''));
                        }
                    }
                }
            });
            deptLoaded = true;
        } else {
            if (FDeptIds !== undefined) {
                var arr = FDeptIds.split(',');
                $.uniform.update($(':input[name=FDeptIds]').select2("val", arr));
            } else {
                $.uniform.update($(':input[name=FDeptIds]').select2("val", ''));
            }
        }
    }

    $("#print").on('click', function () {
        var member = [];
        $('#table1 .checkboxes').each(function () {
            var iRow = $(this).parents('tr')[0];
            var aData = oTable1.fnGetData(iRow);
            if ($(this).prop("checked")) {
                member.push(aData.FItemId);
            }
        });
        if (member.length == 0) {
            fail('请至少选择一条标准');
            return;
        }
        window.open('print.do?ids=' + member.join(','));
    });
    $('#FShowType').change(function () {
        if ($('#FShowType').val() == 1) {
            $('#deptIdsDiv').show();
            $("#FDeptIds").rules("add", { required: true, messages: { required: "这是必填字段" } });
            $('#employeeIdsDiv').hide();
            $("#FEmployeeIds").rules("remove");
        } else if ($('#FShowType').val() == 2) {
            $('#deptIdsDiv').hide();
            $("#FDeptIds").rules("remove");
            $('#employeeIdsDiv').show();
            $("#FEmployeeIds").rules("add", { required: true, messages: { required: "这是必填字段" } });
        } else {
            $('#deptIdsDiv').hide();
            $("#FDeptIds").rules("remove");
            $('#employeeIdsDiv').hide();
            $("#FEmployeeIds").rules("remove");
        }
    });
    $('#FLimitType').change(function () {
        if ($('#FLimitType').val() == '0') {
            $('#limitCountDiv').hide();
            $("#FLimitCount").rules("remove");
        } else {
            $('#limitCountDiv').show();
            $("#FLimitCount").rules("add", { required: true, min: 1, messages: { required: "这是必填字段" } });
        }
    });
    $('#FCheckType').change(function () {
        if ($('#FCheckType').val() == 1) {//直接上级审核
            $('#checkEmployeeIdsDiv').hide();
            $('#checkEmployeeDescDiv').show();
            $("#FCheckEmployeeIds").rules("remove");
        } else if ($('#FCheckType').val() == 2) {//指定人审核
            $('#checkEmployeeIdsDiv').show();
            $('#checkEmployeeDescDiv').hide();
            $("#FCheckEmployeeIds").rules("add", { required: true, messages: { required: "这是必填字段" } });
        } else {//申请时灵活选择审核人
            $('#checkEmployeeIdsDiv').hide();
            $('#checkEmployeeDescDiv').hide();
            $("#FCheckEmployeeIds").rules("remove");
        }
    });

    return {
        init: function () {
        }
    };
}();