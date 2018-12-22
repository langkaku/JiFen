jQuery(document).ready(function () {

    /*权限判断
    $('.itemManage').removeClass('bg-blue')
    $('.itemManage').addClass('bg-grey')*/

    $('.fenBaseManage').click(function(){
        window.location.href = 'jcfgl.html'
    });

    $('.itemManage').click(function(){
        window.location.href = 'jfbzgl.html'
    });

    $('.educationManage').click(function(){
        window.location.href = 'xlgl.html'
    });

    $('.titleManage').click(function(){
        window.location.href = 'zcgl.html'
    });

    Metronic.init();
    $('#manageMenu>p').css('font-weight', 'bold');
    $('#manageMenu>i').css('font-weight', 'bold');
    var host = window.location.host;
    var db = host.substring(0, host.indexOf("."));
    if (db == 'hi' || db == 'zh') {
        $('#contact').show();
    }
    var ss = function () {
        $.each($(".tiles"), function (index, item) {
            var sc = 0;
            $.each($(this).find(".tile"), function (index, item) {
                if ($(this).css('display') === 'none') {
                } else {
                    sc++;
                }
            });
            if (sc == 0) {
                $(this).hide();
            }
        });
    }
    $.ajax({
        url: 'getManageInitInfo.do',
        data: '',
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            if (data.message.result != 0) {
                if (data.message.result == 2) {
                    window.location = "../login/login.html";
                }
            } else {
                var FIsAdmin = data.model.FIsAdmin;
                var FPower = "," + data.model.FPower + ",";
                var CLOSE_FUNCTION = data.CLOSE_FUNCTION;
                var TODAY = data.TODAY;
                var YESTODAY = data.YESTODAY;
                var GROUP_TYPE = data.GROUP_TYPE;
                if (data.FAmb == 1) {
                    $('.alert-info').hide();
                    $('#copyright').hide();
                } else {
                    if (db == 'hi' || db == 'zh' || db == 'zrsm' || db == 'xcc' || db == 'fq' || db == 'padz') {
                    } else{
                                //$('#copyright').show();
                            }
                        }
                        if (FIsAdmin == 1) {
                            $('.tile').each(function () {
                                var cls = $(this).attr('class');
                                var name = cls.substring(cls.lastIndexOf(' ') + 1);
                                if (CLOSE_FUNCTION.indexOf(',' + name + ',') != -1) {
                                    $("." + name).hide();
                                }
                            })
                            ss();
                        } else {
                            $('.tile').hide();
                            $.ajax({
                                url: '../common/manage.txt?t=' + Date.parse(new Date()),
                                data: '',
                                dataType: 'json',
                                cache: false,
                                type: 'GET',
                                success: function (data2) {
                                    menu(data2, true, CLOSE_FUNCTION);
                                    ss();
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                }
                            });
                            function menu(modules, isRoot, CLOSE_FUNCTION) {
                                for (var i = 0, l = modules.length; i < l; i++) {
                                    if (modules[i].children == undefined) {
                                        name = modules[i].name;
                                        if (!isRoot) {
                                            if (CLOSE_FUNCTION.indexOf(',' + name + ',') == -1) {
                                                if (FPower.indexOf(',' + name + ',') == -1) {
                                                    $("." + name).removeClass('bg-blue').removeClass('bg-purple').removeClass('bg-green').removeClass('bg-yellow')
                                                    $("." + name).addClass('bg-grey');
                                                }
                                                $("." + name).show();
                                            }
                                        }
                                    } else {
                                        menu(modules[i].children, false, CLOSE_FUNCTION);
                                    }
                                }
                            }
                        }
                        $(".tile").click(function () {
                            var cls = $(this).attr('class');
                            if (cls.indexOf('bg-grey') != -1) {
                                fail('你无此权限，请联系管理员分配');
                                return;
                            }
                            var moduleName = cls.substring(cls.lastIndexOf(" ") + 1);
                            var moduleNameExt = moduleName + ".html";
                            if (data.FSignCount == 6) {
                                if (moduleName == 'workTimeManage' || moduleName == 'signChangeManage') {
                                    moduleNameExt = moduleName + "Ext.html";
                                }
                            }
                            if (data.FGroupType > 0) {
                                if (moduleName == 'stageManage') {
                                    moduleNameExt = moduleName + "Ext.html?TODAY=" + TODAY;
                                }
                            }
                            window.location = "../" + moduleName + "/" + moduleNameExt;
                            parent.scrollTo(0, 0);
                        });



                        var checkPower = function (cls) {
                            if (cls.indexOf('bg-grey') != -1) {
                                fail('你无此权限，请联系管理员分配');
                                return false;
                            } else {
                                return true;
                            }
                        }


                        //积分管理
                        $(".itemManage").unbind();
                        $(".itemManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../itemManage/itemManage-hdip.html?CLOSE_FUNCTION=" + CLOSE_FUNCTION + "&TODAY=" + TODAY;
                        });
                        $(".fenCheck").unbind();
                        $(".fenCheck").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenCheck/fenCheck-hdip.html";
                        });
                        $(".fenCancel").unbind();
                        $(".fenCancel").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenCancel/fenCancel.html?TODAY=" + TODAY;
                        });
                        $(".everyDayFen").unbind();
                        $(".everyDayFen").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../everyDayFen/everyDayFen.html?mobile=1&TODAY=" + TODAY;
                        });
                        $(".fenQuery").unbind();
                        $(".fenQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenQuery/fenQuery.html?TODAY=" + TODAY;
                        });
                        $(".fenCheckTotal").unbind();
                        $(".fenCheckTotal").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenCheckTotal/fenCheckTotal.html?TODAY=" + TODAY;
                        });
                        $(".fenApplyForOtherTotal").unbind();
                        $(".fenApplyForOtherTotal").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenApplyForOtherTotal/fenApplyForOtherTotal.html?TODAY=" + TODAY;
                        });
                        $(".fenAddQuery").unbind();
                        $(".fenAddQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../fenAddQuery/fenAddQuery.html?mobile=1&TODAY=" + TODAY;
                        });
                        $(".reportManage").unbind();
                        $(".reportManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../reportManage/reportManage-hdip.html?GROUP_TYPE=" + GROUP_TYPE + "&TODAY=" + TODAY;
                        });
                        $(".toEvent").unbind();
                        $(".toEvent").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../toEvent/toEvent.html?TODAY=" + TODAY;
                        });

                        //积分应用
                        $(".eventManage").unbind();
                        $(".eventManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../eventManage/eventManage-hdip.html?code=xiaov100&TODAY=" + TODAY;
                        });
                        $(".eventQuery").unbind();
                        $(".eventQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../eventQuery/eventQuery-hdip.html?mobile=1&TODAY=" + TODAY;
                        });
                        $(".targetDayQuery").unbind();
                        $(".targetDayQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../targetDayQuery/targetDayQuery.html?mobile=1";
                        });
                        $(".targetWeekQuery").unbind();
                        $(".targetWeekQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../targetWeekQuery/targetWeekQuery.html?mobile=1";
                        });
                        $(".targetMonthQuery").unbind();
                        $(".targetMonthQuery").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../targetMonthQuery/targetMonthQuery.html?mobile=1";
                        });
                        $(".workLogManage").unbind();
                        $(".workLogManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../workLogManage/workLogManage-hdip.html?TODAY=" + TODAY;
                        });
                        $(".drawManage").unbind();
                        $(".drawManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../drawManage/drawManage.html?TODAY=" + TODAY;
                        });
                        $(".backupManage").unbind();
                        $(".backupManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../backupManage/backupManage-hdip.html?mobile=1";
                        });
                        $(".indexManage").unbind();
                        $(".indexManage").click(function () {
                            if (!checkPower($(this).attr('class'))) return;
                            window.location = "../indexManage/indexManage.html?TODAY=" + TODAY;
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }
            });
});