var Module = function () {
    var order = getParam(window.location.href, 'order');
    if (order == undefined) order = '';
    var myDate = new Date();
    var FBeginDate = getParam(window.location.href, 'FBeginDate');
    var FEndDate = getParam(window.location.href, 'FEndDate');
    var getRankLists = function (item) {
        var str = '';
        str += '<table class="table table-bordered table-striped temp-table" FDestEmployeeId="' + item.FDestEmployeeId + '"><tbody>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">排名</td><td>' + item.orderNum + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">姓名</td><td>' + item.FDestEmployeeName + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">部门</td><td>' + item.FDestDeptName + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">职位</td><td>' + item.FPositionName + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">奖积分</td><td>' + item.FFenAdd + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="">扣积分</td><td>' + item.FFenDec + '</td></tr>';
        str += '<tr><td style="font-size:14px; font-weight:bold; background-color:#eee" width="5%" nowrap="" class="FFenName">总得分</td><td>' + item.FFen + '</td></tr>';
        str += '</tbody></table>';
        return str;
    }

    var getRanks = function (queryString) {
        $.ajax({
            url: 'getFenTotal.do',
            data: queryString,
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data.message.result != 0) {
                    if (data.message.result == 2) {
                        parent.window.location = "../login/login.html";
                    } else {
                        failM(data.message.errorMsg);
                    }
                } else {
                    if (data.topDisplayDeptOnly !== undefined && data.topDisplayDeptOnly == 1) {
                        $('#FDeptName').hide();
                    }
                    if (data.aaData.length === 0) {
                        $("#FContent").empty().append("<tr><td>暂无数据</td></tr>");
                    } else {
                        var str = '';
                        $.each(data.aaData, function (index, item) {
                            str += getRankLists(item)
                        });
                        $("#FContent").empty().append(str);
                        $('.table').click(function () {
                            var FDestEmployeeId = $(this).attr("FDestEmployeeId");
                            if (FBeginDate != undefined && FEndDate != undefined) {
                                window.location = '../fenQuery/fenQuery.html?FEmployeeId=' + FDestEmployeeId + '&FBeginDate=' + FBeginDate + '&FEndDate=' + FEndDate;
                            } else {
                                window.location = '../fenQuery/fenQuery.html?FEmployeeId=' + FDestEmployeeId + '&FBeginDate=&FEndDate=&TODAY=' + getParam(window.location.href, 'TODAY');
                            }
                        });
                        if (FBeginDate != undefined && FEndDate != undefined) {
                            $(".tableName").html('阶段排名');
                            $(".FFenName").html('阶段得分');
                            $(".date").show();
                        } else {
                            $(".tableName").html('总排名');
                            $(".FFenName").html('总得分');
                        };
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { }
        });
    }

    $.ajax({
        url: 'getDeptIdAndNameList.do',
        data: '',
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if (data.message.result != 0) {
                if (data.message.result == 2) {
                    parent.window.location = "../login/login.html";
                } else {
                    failM(data.message.errorMsg);
                }
            } else {
                $.each(data.aaData, function (index, item) {
                    $("#FDeptList").append('<li class="inbox' + item.FDeptId + '"><a href="javascript:;" class="btn" FDeptId="' + item.FDeptId + '">' + item.FDeptName + '</a><b></b></li>')
                });
                $("#FDeptList > li > a").eq(0).click();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            failM('操作失败');
        }
    });

    $("#FDeptList").on("click", "a", function () {
        $("#FDeptName").html($(this).html() + '<b class="caret"></b>');
        var FDeptId = $(this).attr("FDeptId");
        $("#FDeptId").val(FDeptId);
        var s = '';
        if (FBeginDate != undefined && FEndDate != undefined) {
            var FDate = $("#defaultrange input").val().split('/');
            s = "&FBeginDate=" + $.trim(FDate[0]) + "&FEndDate=" + $.trim(FDate[1]);
        };
        getRanks("FDeptId=" + FDeptId + s + "&order=" + order);
    });
    return {
        init: function () {
            $("#defaultrange input").val(getParam(window.location.search, "FBeginDate") + '/' + getParam(window.location.search, "FEndDate"));
            if (!jQuery().daterangepicker) return;
            $('#defaultrange').daterangepicker({
                opens: (Metronic.isRTL() ? 'left' : 'right'),
                format: 'YYYY-MM-DD',
                separator: ' to ',
                startDate: getParam(window.location.search, "FBeginDate"),
                endDate: getParam(window.location.search, "FEndDate"),
                minDate: '2012-01-01',
                maxDate: '2038-12-31'
            },
                function (start, end) {
                    $('#defaultrange input').val(start.format('YYYY-MM-DD') + ' / ' + end.format('YYYY-MM-DD'));
                    getRanks("FDeptId=" + $("#FDeptId").val() + "&FBeginDate=" + start.format('YYYY-MM-DD') + "&FEndDate=" + end.format('YYYY-MM-DD') + "&order=" + order);
                }
            );

        }
    };
}();