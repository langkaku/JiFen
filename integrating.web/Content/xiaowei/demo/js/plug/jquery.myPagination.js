
(function($) {

        $.fn.myPagination = function(param) {
          //初始化对象
          init(param, $(this));
          //返回当前对象，方便级联调用
          return $(this);
        };

        function init(param, obj) {
          // 判断用户是否传的是对象
          if (param && param instanceof Object) {
            //配置参数
            var options;
            // 当前页
            var currPage;
            // 总页数
            var pageCount;
            // 显示页数
            var pageSize;
            // 中间数
            var tempPage;
            // 默认配置
            var defaults = new Object({
              currPage: 3,
              pageCount: 10,
              pageSize: 5,
              ajax: {
                on: false,
                pageCountId: 'pageResult.pageCount',
                param: {
                  on: false,
                  page: 1 
                },
                ajaxStart: function() {
                  return false;
                }
              },
              info: {
                first: '首页', 
                last: '尾页',
                next: '后一页',
                prev: '前一页',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true,
                link: '#',
                msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                text: {
                  width: '22px'
                }
              }
            });

            // 得到当前页

            function getCurrPage() {
              if (options.info && options.info.cookie_currPageKey && options.info.cookie_currPage) {
                var cookie_currPage = $.cookie(options.info.cookie_currPageKey + "_currPage");
                if (cookie_currPage != "" && cookie_currPage != null) {
                  return cookie_currPage;
                }
              }
              if (options.currPage) {
                return options.currPage;
              }
              else {
                return defaults.currPage;
              }
            }

            // 得到总页数

            function getPageCount() {
              if (options.pageCount) {
                return options.pageCount;
              }
              else {
                return defaults.pageCount;
              }
            }

            // 得到显示数量

            function getPageSize() {
              if (options.pageSize) {
                return options.pageSize;
              }
              else {
                return defaults.pageSize;
              }
            }

            // 得到Css样式

            function getCssStyle() {
              if (options.cssStyle) {
                return options.cssStyle;
              }
              else {
                return defaults.cssStyle;
              }
            }

            //得到Ajax

            function getAjax() {
              if (options.ajax && options.ajax.on) {
                return options.ajax;
              }
              else {
                return defaults.ajax;
              }
            }

            //得到 Param

            function getParam() {
				if (options.ajax.param && options.ajax.param.on && options.ajax.param.form) {
                options.ajax.param.page = currPage;
				var param = "page="+options.ajax.param.page+"&" + options.ajax.param.formData;
                return param;
              }
              if (options.ajax.param && options.ajax.param.on) {
                options.ajax.param.page = currPage;
                return options.ajax.param;
              }
              else {
                defaults.ajax.param.page = currPage;
                return defaults.ajax.param;
              }
            }

            // 得到首页

            function getFirst() {
              if (options.info && options.info.first_on == false) {
                return "";
              }
              if (options.info && options.info.first_on && options.info.first) {
                var str = "<a href='" + getLink() + "' title='1'>" + options.info.first + "</a>";
                return str;
              }
              else {
                var str = "<a href='" + getLink() + "' title='1'>" + defaults.info.first + "</a>";
                return str;
              }
            }

            // 得到尾页

            function getLast(pageCount) {
              if (options.info && options.info.last_on == false) {
                return "";
              }
              if (options.info && options.info.last_on && options.info.last) {
                var str = "<a href='" + getLink() + "' title='" + pageCount + "'>" + options.info.last + "</a>";
                return str;
              }
              else {
                var str = "<a href='" + getLink() + "' title='" + pageCount + "'>" + defaults.info.last + "</a>";
                return str;
              }
            }

            // 得到上一页

            function getPrev() {
              if (options.info && options.info.prev_on == false) {
                return "";
              }
              if (options.info && options.info.prev) {
                return options.info.prev;
              }
              else {
                return defaults.info.prev;
              }
            }

            // 得到下一页

            function getNext() {
              if (options.info && options.info.next_on == false) {
                return "";
              }
              if (options.info && options.info.next) {
                return options.info.next;
              }
              else {
                return defaults.info.next;
              }
            }

            //得到 link符号

            function getLink() {
              if (options.info && options.info.link) {
                return options.info.link;
              }
              else {
                return defaults.info.link;
              }
            }

            // 得到消息

            function getMsg() {
              var input = "<input type='text' value='" + currPage + "' >";
              if (options.info && options.info.msg_on == false) {
                return false;
              }
              if (options.info && options.info.msg) {
                var str = options.info.msg;
                str = str.replace("{currText}", input);
                str = str.replace("{currPage}", currPage);
                str = str.replace("{sumPage}", pageCount);
                return str;
              }
              else {
                var str = defaults.info.msg;
                str = str.replace("{currText}", input);
                str = str.replace("{currPage}", currPage);
                str = str.replace("{sumPage}", pageCount);
                return str;
              }
            }

            //得到文本框

            function getText() {
              //转化 Jquery 对象
              var msg = getMsg();
              if (msg) {
                msg = $(msg);
              }
              else {
                return "";
              }
              //从 Jquery 对象中 查找 text 文本框
              var input = msg.children(":text");
              if (options.info && options.info.text) {
                var css = options.info.text;
                for (temp in css) {
                  var val = eval("css." + temp);
                  input.css(temp, val);
                }
                return msg.html();
              }
              else {
                var css = defaults.info.text;
                for (temp in css) {
                  var val = eval("css." + temp);
                  input.css(temp, val);
                }
                return msg.html();
              }
            }

            //得到隐藏域Id

            function getPageCountId() {
              if (options.ajax && options.ajax.pageCountId) {
                return options.ajax.pageCountId;
              }
              else {
                return defaults.ajax.pageCountId;
              }
            }

            //得到动态加载信息

            function getAjaxStart() {
              if (options.ajax && options.ajax.ajaxStart) {
                options.ajax.ajaxStart();
              }
              else {
                defaults.ajax.ajaxStart;
              }
            }

            //保存当前页数

            function saveCurrPage(page) {
              if (options.info && options.info.cookie_currPageKey && options.info.cookie_currPage) {
				var key = options.info.cookie_currPageKey + "_currPage";
                $.cookie(key, page);
              }
            }

            // 数字转换

            function getInt(val) {
              return parseInt(val);
            }

            //验证数字

            function isCode(val) {
              if (val < 1) {
                alert("输入值不能小于1");
                return false;
              }
              var patrn = /^[0-9]{1,8}$/;
              if (!patrn.exec(val)) {
                alert("请输入正确的数字");
                return false;
              }
              if (val > pageCount) {
                alert("输入值不能大于总页数");
                return false;
              }
              return true;
            }

            // 更新视图

            function updateView() {
              //数字转换
              currPage = getInt(currPage);
              pageCount = getInt(pageCount);
              var link = getLink();

              // 开始页和最后页			  
              var firstPage = lastPage = 1;
              // 当前页 - 中间数 > 0，则开始页 = 当前页 - 中间数，否则 开始页 = 1
              if (currPage - tempPage > 0) {
                firstPage = currPage - tempPage;
              }
              else {
                firstPage = 1;
              }
              // 开始页 + 显示页数 > 总页数，则 最后页 = 最后页 +1，开始页 = 最后页 - 显示页，否则 最后页 = 开始页 +
              // 显示页
              if (firstPage + pageSize > pageCount) {
                lastPage = pageCount + 1;
                firstPage = lastPage - pageSize;
              }
              else {
                lastPage = firstPage + pageSize;
              }

              var content = "";

              //首页
              content += getFirst();

              // 上一页
              if (currPage == 1) {
                content += "<span class=\"disabled\" title=\"" + getPrev() + "\">" + getPrev() + " </span>";
              }
              else {
                content += "<a href='" + link + "' title='" + (currPage - 1) + "'>" + getPrev() + " </a>";
              }

              //防止开始页数低于1
              if (firstPage <= 0) {
                firstPage = 1;
              }
              // 链接
              for (firstPage; firstPage < lastPage; firstPage++) {
                if (firstPage == currPage) {
                  content += "<span class=\"current\" title=\"" + firstPage + "\">" + firstPage + "</span>";;
                }
                else {
                  content += "<a href='" + link + "' title='" + firstPage + "'>" + firstPage + "</a>";
                }
              }

              // 下一页
              if (currPage == pageCount) {
                content += "<span class=\"disabled\" title=\"" + getNext() + "\">" + getNext() + " </span>";
              }
              else {
                content += "<a href='" + link + "' title='" + (currPage + 1) + "'>" + getNext() + " </a>";
              }

              // 尾页
              content += getLast(pageCount);

              //得到文本框内容
              content += getText();

              // 填充对象
              obj.html(content);

              //文本框增加事件
              obj.children(":text").keypress(function(event) {
                var keycode = event.which;
                if (keycode == 13) {
                  var page = $(this).val();
                  //验证输入值
                  if (isCode(page)) {
                    //回车事件时，去除其他 a 标签的 click 事件
                    obj.children("a").unbind("click"); // 去除 所有 a 标签 click
                    //再次绑定click 事件
                    obj.children("a").each(function() {
                      $(this).click(function() {
                        return false;
                      });
                    });
                    //创建视图
                    createView(page);
                  }
                }
              });

              // 增加事件
              obj.children("a").each(function(i) {
                //得到当前页数，以 title 属性为容器存放
                var page = this.title;
                //给与每个a 标签 增加 单击事件
                $(this).click(function() {
                  //单击某一个 a  标签时，去除其他 a 标签的 click 事件
                  obj.children("a").unbind("click"); // 去除 所有 a 标签 click
                  //再次绑定click 事件
                  obj.children("a").each(function() {
                    $(this).click(function() {
                      return false;
                    });
                  });
                  //创建视图
                  createView(page);
                  $(this).focus();
                  return false;
                }); // click
              });
            };

            // 创建视图

            function createView(page) {
              //当前页 赋值
              currPage = page;
              //保存当前页数
              saveCurrPage(page);
              // 判断是否开启回调函数
              var ajax = getAjax();
              if (ajax.on) {
                //动态加载
                getAjaxStart();
                // ajax param
                var varUrl = ajax.url;
                // 请求参数
                var param = getParam();
                // ajax
                $.ajax({
                  url: varUrl,
                  // 请求Url地址
                  type: 'POST',
                  // 提交数据方式
                  data: param,
                  // 参数
                  contentType: "application/x-www-form-urlencoded;utf-8",
                  // 发送信息给服务器编码类型
                  async: true,
                  // 异步
                  cache: false,
                  // 不缓存
                  timeout: 60000,
                  // 超时时间
                  error: function() {
                    // alert("访问服务器超时，请重试，谢谢！");
                  },
                  success: function(data) {
                    // 加载总页数
                    loadPageCount({
                      dataType: ajax.dataType,
                      callback: ajax.callback,
                      data: data
                    });
                    updateView();
                  }
                });
              } // end callback
              else {
                //如没有开启，ajax 则 更新样式
                updateView();
              }
            }

            // 检测参数

            function checkParam() {
              if (currPage < 1) {
                alert("配置参数错误\n错误代码:-1");
                return false;
              }
              if (currPage > pageCount) {
                alert("配置参数错误\n错误代码:-2");
                return false;
              }              
              return true;
            }

            // 加载总页数

            function loadPageCount(options) {
              //判断数据类型是否存在
              if (options.dataType) {
                //取出数据
                var data = options.data;
                // 返回总页数
                var resultPageCount = false;
                //是否继续，用于区分 Html 与 Xml 和 Json 数据
                var isB = true;
                //得到 自定义 pageCountId
                var pageCountId = getPageCountId();
                //判断数据类型
                switch (options.dataType) {
                case "json":
                  data = eval("(" + data + ")"); // 转换为json对象				  
                  resultPageCount = eval("data." + pageCountId);
                  break;
                case "xml":
                  resultPageCount = $(data).find(pageCountId).text();
                  break;
                default:
                  isB = false;
                  var callback = options.callback + "(data)";
                  eval(callback);
                  resultPageCount = $("#" + pageCountId).val();
                  break;
                }
                //判断是否取得总页数
                if (resultPageCount) {
                  pageCount = resultPageCount;
                }
                //判断是否继续，用于区分 Html 与 Xml 和 Json 数据
                if (isB) {
                  //执行 function
                  var callback = options.callback + "(data)";
                  eval(callback);
                }
              }
            }
            //得到当前参数
            options = param;
            // 得到当前页
            currPage = getCurrPage();
            // 得到总页数
            pageCount = getPageCount();
            // 得到显示页数
            pageSize = getPageSize();
            // 中间数
            tempPage = getInt(pageSize / 2);
            // 得到Css样式
            var cssStyle = getCssStyle();
            // 添加样式
            obj.addClass(cssStyle);
            // 检测参数
            if (checkParam()) {
              // 更新视图
              updateView();
              // 创建视图
              createView(currPage);
              //返回当前对象，以便可以级联的执行其他方法              
            }
          }
        }
      })(jQuery);