var Calendar = function() {
	var el = $('body');
	var initCalendar = function() {

        if (!jQuery().fullCalendar) {
            return;
        }

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var h = {
					right: 'today,next'   //month,agendaWeek,agendaDay
				};
        $('#calendar').fullCalendar('destroy'); // destroy the calendar
        $('#calendar').fullCalendar({ //re-initialize the calendar
            header:  h,
            defaultView: 'month', // change default view with available options from https://arshaw.com/fullcalendar/docs/views/Available_Views/ 
            slotMinutes: 15,
            editable: false,
            monthNames : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            buttonText:{today:'当月',next:'下月'},
            droppable: true, // this allows things to be dropped onto the calendar !!!
            timeFormat: 'H:mm',
			axisFormat: 'H:mm',
			aspectRatio: 1.85,
            drop: function(date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');
                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;
                copiedEventObject.className = $(this).attr("data-class");

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (https://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            events: function() {
            	wait(el);  
            	$("#calendar").fullCalendar('removeEvents'); //清空上次加载的日程
		        $.ajax({
		            url: 'getMyWorkTimeList.do',
		            data:'',
		            dataType: 'json',
		            type:'POST',
		            success: function(data) {
		            	if( data.message.result!=0 ){
                            if (data.message.result == 2) {
                                parent.window.location = "../login/login.html";
                            } else {                        
                                fail(data.message.errorMsg);
                            }
                        } else {
			            	$.each(data.aaData,function(index,item){
								var obj = new Object();  
								obj.title = item.FWorkTime;
								obj.start = item.FDate;
	                            obj.backgroundColor = item.color;							
								$("#calendar").fullCalendar('renderEvent',obj,true);//把从后台取出的数据进行封装以后在页面上以fullCalendar的方式进行显示  
			            	});
			            	complete(el);
                        }
		            },
					error:function (){
					}
		        });
		    },
            eventMouseover: function(calEvent, jsEvent, view) {
                $(this).attr("title",calEvent.info);
            },
			eventAfterRender:function( event, element, view ) {
				
			}
        });

    }

    $.getJSON("getMySignList.do",'', function(data) {
    	if( data.message.result!=0 ){
			if (data.message.result == 2) {
				parent.window.location = "../login/login.html";
			} else {						
				fail(data.message.errorMsg);
			}
		} else {
        	$.each(data.aaData, function(index, item) {
				$('#portlet_tab_1').append(oneSign(item));
			});
		}
    });
    var oneSign = function(item) {
    	var FFen1 = '';
		if (item.FFen1 == undefined ) {
			FFen1 = '-';
		}else{
			if (item.FFen1>0) {
				FFen1 = '<span class="label label-success">'+item.FFen1+'</span>';
			}else if (item.FFen1<0) {
				FFen1 = '<span class="label label-danger">'+item.FFen1+'</span>';
			}else{
				FFen1 = item.FFen1;
			}
		};
    	var FFen2 = '';
		if (item.FFen2 == undefined ) {
			FFen2 = '-';
		}else{
			if (item.FFen2>0) {
				FFen2 = '<span class="label label-success">'+item.FFen2+'</span>';
			}else if (item.FFen2<0) {
				FFen2 = '<span class="label label-danger">'+item.FFen2+'</span>';
			}else{
				FFen2 = item.FFen2;
			}
		};
    	var workTime = item.workTime;
    	if (workTime == '') workTime = '无';
    	var str = '';
    	str += '<table width="100%">';
    	str += '<tr>';
    	str += '<td class="bigfont">' + item.FSignDate + '&nbsp;' + item.dayOfWeek + '</td>';
    	str += '<td class="bigfont" align="right">排班：' + workTime + '</td>';
    	str += '</tr>';
    	str += '</table>';
    	str += '<table class="table table-bordered" width="100%">';
    	str += '<tr>';
    	str += '<td rowspan="3" width="15%" align="center">上<br/>班<br/>卡</td>';
    	str += '<td width="30%">打卡时间</td>';
    	str += '<td width="55%">' + item.FSignTime1 + '</td>';
    	str += '</tr>';
    	str += '<tr>';
    	str += '<td>得分</td>';
    	str += '<td>' + FFen1 + '</td>';
    	str += '</tr>';
    	str += '<tr>';
    	str += '<td>备注</td>';
    	str += '<td>' + item.FRemark1 + '</td>';
    	str += '</tr>';
    	str += '<tr>';
    	str += '<td rowspan="3" align="center">下<br/>班<br/>卡</td>';
    	str += '<td>打卡时间</td>';
    	str += '<td>' + item.FSignTime2 + '</td>';
    	str += '</tr>';
    	str += '<tr>';
    	str += '<td>得分</td>';
    	str += '<td>' + FFen2 + '</td>';
    	str += '</tr>';
    	str += '<tr>';
    	str += '<td>备注</td>';
    	str += '<td>' + item.FRemark2 + '</td>';
    	str += '</tr>';
    	str += '</table>';
    	return str;
    }
	var loaded = false;
    $("#workTimeList").on('shown.bs.tab',function(e) {  
    	$('.tools').hide();
        if(!loaded){         	
            $("#calendar").fullCalendar('render');
            loaded = true;  
        }  
    });  
    $("#signOkList").on('shown.bs.tab',function(e) {  
    	$('.tools').show();
    });  
    return {
        //main function to initiate the module
        init: function() {
        	$('#signQuery').attr('href', 'signQuery.html?TODAY=' + getParam(window.location.href, 'TODAY'));
        	initCalendar();
        }

    };

}();