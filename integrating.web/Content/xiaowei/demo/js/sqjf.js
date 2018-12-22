$(function(){
	//$('.first>li').each(function(index,value){
 //       $('.first>li>i').eq(index).click(function (e) {
 //           //alert(333)
	//		$('.second').eq(index).toggle()
	//		$('.first>li').eq(index).siblings().find('.second').hide()
	//		e.stopPropagation()
	//	})
	//})
	
	//$('.second>li').each(function(index,value){
	//	$('.second>li>i').eq(index).click(function(e){
	//		$('.third').eq(index).toggle()
	//		$('.second>li').eq(index).siblings().find('.third').hide()
	//		e.stopPropagation()
	//	})
	//})
    $('.first>li').each(function (index, value) {
        $('.first>li>i').eq(index).click(function (e) {
            $(this).parent().find('.second').toggle()
            $(this).parent().siblings().find('.second').hide()
            e.stopPropagation()
        })
    })

    $('.second>li').each(function (index, value) {
        $('.second>li>i').eq(index).click(function (e) {
            $(this).parent().find('.third').toggle()
            $(this).parent().siblings().find('.third').hide()
            e.stopPropagation()
        })
    })
	var flag = true
	$('.ms-choice').each(function(index,value){
		$('.ms-choice').eq(index).find('div').click(function(){
			if(flag){
				$('.ms-drop').eq(index).show()
				$(this).addClass('open')
				flag = false
			}else{
				$('.ms-drop').eq(index).hide()
				$(this).removeClass('open')
				flag = true
			}
		})
	})
	
	$('#applyTab').click(function(){
		$('#search').css('display','none')
	})

	$('#applyResult').click(function(){
		$('#search').css('display','none')
	})

	$('.dropdown-menu>li').click(function(){
		$('#search').css('display','block')
	})

    $('#01').click(function () {
        $('#tab2').addClass('active in')
        $('#tab2').siblings().removeClass('active in')
    })

    $('#02').click(function(){
		$('#tab3').addClass('active in')
		$('#tab3').siblings().removeClass('active in')
	})
    $('#03').click(function () {
        $('#tab4').addClass('active in')
        $('#tab4').siblings().removeClass('active in')
    })
    $('#04').click(function () {
        $('#tab5').addClass('active in')
        $('#tab5').siblings().removeClass('active in')
    })
    $('#05').click(function () {
        $('#tab6').addClass('active in')
        $('#tab6').siblings().removeClass('active in')
    })
    $('#06').click(function () {
        $('#tab7').addClass('active in')
        $('#tab7').siblings().removeClass('active in')
    })


	//无限滚动加载
	var page = 1, pageSize = 10;
    $('#J_List').infiniteScroll({
        pageSize: pageSize,
        initLoad: true,
        backposition: true,
        jumpLink: '.J_Link',
        loadListFn: function () {
            var def = $.Deferred();
            $.ajax({
                url: '/请求数据方法',
                dataType: 'json',
                data: { page: page, pagesize: pageSize },
                success: function (ret) {
                    var html = ret.list + '将数据拼接成html';
                    /* 特别注意：拼接后的HTML每条数据应包含.J_Link和当前的页面标记data-page，例： */
                    /* <a href="跳转链接" class="J_Link" data-page="' + page + '">内容内容内容</a> */
                    $('#J_ListContent').append(html);

                    def.resolve(ret.list);

                    ++page;
                }
            });

            return def.promise();
        },
        /**
         * 当前从详情页返回列表页时调用此方法
         * @param listData 该次所需加载的数据集合
         * @param retPage 该次加载的页码
         */
        loadStorageListFn: function (listData, retPage) {
            var def = $.Deferred();

            page = retPage;

            var html = '';
            listData.forEach(function (val) {
                html += (val.list + '将数据拼接成html，格式同loadListFn方法一致');
            });
            $('#J_ListContent').append(html);

            def.resolve();
            return def.promise();
        }
    });
	
})