var Status = { 'AwardTypeStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '无限制', 'day': 2, 'dayName': '每日', 'week': 3, 'weekName': '每周', 'month': 4, 'monthName': '每月', 'never': 5, 'neverName': '永不' }, 'CodexImportantStatus': { 'common': 0, 'commonName': '普通', 'important': 1, 'importantName': '重要' }, 'DailyLogStatus': { 'init': 0, 'initName': '待审核', 'passed': 1, 'passedName': '已通过', 'failed': 2, 'failedName': '未通过' }, 'EmployeeStatus': { 'unknow': 0, 'unknowName': '-', 'normal': 1, 'normalName': '在职', 'leaved': 2, 'leavedName': '已离职' }, 'EventCheckResultStatus': { 'init': 0, 'initName': '待审核', 'good': 1, 'goodName': '好评', 'common': 2, 'commonName': '中评', 'bad': 3, 'badName': '差评', 'no': 4, 'noName': '任务未完成' }, 'ExceptionStatus': { 'myException': 1, 'myExceptionName': '普通异常', 'noLoginException': 2, 'noLoginExceptionName': '未登录', 'noPowerException': 3, 'noPowerExceptionName': '没有权限' }, 'FenLogFlagStatus': { 'unknow': 0, 'unknowName': '-', 'base': 10, 'baseName': '每月基础分', 'other': 2, 'otherName': '申请类积分', 'target': 20, 'targetName': '部门任务分', 'daily': 21, 'dailyName': '每日任务分', 'task': 3, 'taskName': '悬赏分', 'job': 4, 'jobName': '兼职分', 'sign': 5, 'signName': '考勤分', 'log': 7, 'logName': '写日志分', 'logComment': 8, 'logCommentName': '日志评价分', 'know': 16, 'knowName': '分享工作知识分', 'readKnow': 17, 'readKnowName': '学习工作知识分', 'readCodex': 13, 'readCodexName': '阅读制度分', 'project': 14, 'projectName': '项目分', 'suggest': 9, 'suggestName': '建议建言分', 'wish': 19, 'wishName': '许愿分', 'draw': 6, 'drawName': '惊喜分', 'plan': 15, 'planName': '周报月报分', 'diy': 18, 'diyName': '外部系统分' }, 'FenLogStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '待审核', 'sharing': 2, 'sharingName': '共享中', 'passed': 3, 'passedName': '已通过', 'failed': 4, 'failedName': '已驳回' }, 'FenRangeStatus': { 'min': -100000, 'minName': '最小分', 'max': 100000, 'maxName': '最大分' }, 'ItemRuleStatus': { 'init': 0, 'initName': '固定分', 'step': 1, 'stepName': '阶梯分', 'countable': 2, 'countableName': '计件分', 'uncertain': 3, 'uncertainName': '不定分' }, 'JobReachStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '待审核', 'pass': 2, 'passName': '已聘用', 'dismiss': 3, 'dismissName': '已解聘' }, 'JobStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '正在招聘中', 'complete': 2, 'completeName': '招聘已结束' }, 'KnowCommentTypeStatus': { 'unknow': 0, 'unknowName': '-', 'useful': 1, 'usefulName': '有帮助', 'useless': 2, 'uselessName': '没有帮助' }, 'NotifyTypeStatus': { 'unknow': 0, 'unknowName': '-', 'all': 1, 'allName': '全员通知', 'dept': 2, 'deptName': '部门通知', 'employees': 3, 'employeesName': '个人通知' }, 'ProjectJoinStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '未审核', 'pass': 2, 'passName': '达标', 'fail': 3, 'failName': '未达标' }, 'ProjectStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '项目进行中', 'complete': 2, 'completeName': '项目已结束' }, 'SexStatus': { 'unknow': 0, 'unknowName': '-', 'male': 1, 'maleName': '男', 'female': 2, 'femaleName': '女' }, 'SignFlagStatus': { 'unknow': 0, 'unknowName': '-', 'normal': 1, 'normalName': '正常', 'comeLate': 2, 'comeLateName': '迟到', 'leaveEarly': 3, 'leaveEarlyName': '早退', 'workOvertime': 4, 'workOvertimeName': '加班' }, 'SignTypeStatus': { 'unknow': 0, 'unknowName': '-', 'startWorkSign': 1, 'startWorkSignName': '打上班卡', 'comeOffWorkSign': 2, 'comeOffWorkSignName': '打下班卡' }, 'StageTypeStatus': { 'unknow': 0, 'unknowName': '-', 'byTotal': 1, 'byTotalName': '按成员分数总和PK', 'byAver': 2, 'byAverName': '按成员分数求平均PK' }, 'SuggestStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '初始状态', 'readed': 2, 'readedName': '已查阅', 'replayed': 3, 'replayedName': '已回复' }, 'TargetLogCheckResultStatus': { 'init': 0, 'initName': '待审核', 'good': 1, 'goodName': '好评', 'common': 2, 'commonName': '中评', 'bad': 3, 'badName': '差评', 'no': 4, 'noName': '任务未完成', 'less': 5, 'lessName': '未达目标', 'equal': 6, 'equalName': '完成目标', 'more': 7, 'moreName': '超额完成' }, 'TargetPeriodStatus': { 'unknow': 0, 'unknowName': '-', 'day': 1, 'dayName': '每日任务', 'week': 2, 'weekName': '每周任务', 'month': 3, 'monthName': '每月任务' }, 'TaskReachStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '任务待完成', 'pass': 2, 'passName': '任务已完成，并且已得到任务分' }, 'TaskStatus': { 'unknow': 0, 'unknowName': '-', 'init': 1, 'initName': '接收认领中', 'complete': 2, 'completeName': '已关闭认领' }, 'WorkCommentStatus': { 'unknow': 0, 'unknowName': '-', 'good': 1, 'goodName': '好', 'common': 2, 'commonName': '一般', 'bad': 3, 'badName': '差' }, 'WorkPlanTypeStatus': { 'unknow': 0, 'unknowName': '-', 'day': 1, 'dayName': '日', 'week': 2, 'weekName': '周', 'month': 3, 'monthName': '月', 'quar': 4, 'quarName': '季' } };
//日期加天数的方法
//dataStr日期字符串
//dayCount 要增加的天数
//return 增加n天后的日期字符串
function dateAddDays(dataStr, dayCount) {
    var strdate = dataStr; //日期字符串
    var isdate = new Date(strdate.replace(/-/g, "/"));  //把日期字符串转换成日期格式
    isdate = new Date((isdate / 1000 + (86400 * dayCount)) * 1000);  //日期加1天
    var month = (isdate.getMonth() + 1);
    if (month < 10) month = '0' + month;
    var day = (isdate.getDate());
    if (day < 10) day = '0' + day;
    var pdate = isdate.getFullYear() + "-" + month + "-" + day;   //把日期格式转换成字符串
    return pdate;
}
function removeCookie(name) {
    /* -1 天后过期即删除 */
    setCookie(name, 1, -1);
}
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays === null) ? ";path=/;" : ";path=/;expires=" + exdate.toGMTString());
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) { c_end = document.cookie.length; }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

var getStatusName = function (StatusArr, statusValue) {
    var status = '';
    for (var item in StatusArr) {
        if (StatusArr[item] == statusValue) {
            status = item;
        }
    }
    var statusName = status + 'Name';
    return StatusArr[statusName];
};

/**
 * 积分输入框相关函数 begin
 */
var formatFen = function (el) {
    if ($(el).val().indexOf(".") != -1) {
        $(el).val($(el).val().substr(0, $(el).val().indexOf(".")));
    }
}
var downFen = function (el) {
    if ($(el).val() === '') {
        $(el).val(-1 * 1);
    } else {
        $(el).val($(el).val() - 1);
    }
}
var upFen = function (el) {
    if ($(el).val() === '') {
        $(el).val(1);
    } else {
        $(el).val($(el).val() - 0 + 1);
    }
}
/**
 * 积分输入框相关函数 end
 */

/**
 * bootbox begin
 */
!function (a, b) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], b) : "object" == typeof exports ? module.exports = b(require("jquery")) : a.bootbox = b(a.jQuery) }(this, function a(b, c) { "use strict"; function d(a) { var b = q[o.locale]; return b ? b[a] : q.en[a] } function e(a, c, d) { a.stopPropagation(), a.preventDefault(); var e = b.isFunction(d) && d.call(c, a) === !1; e || c.modal("hide") } function f(a) { var b, c = 0; for (b in a) c++; return c } function g(a, c) { var d = 0; b.each(a, function (a, b) { c(a, b, d++) }) } function h(a) { var c, d; if ("object" != typeof a) throw new Error("Please supply an object of options"); if (!a.message) throw new Error("Please specify a message"); return a = b.extend({}, o, a), a.buttons || (a.buttons = {}), c = a.buttons, d = f(c), g(c, function (a, e, f) { if (b.isFunction(e) && (e = c[a] = { callback: e }), "object" !== b.type(e)) throw new Error("button with key " + a + " must be an object"); e.label || (e.label = a), e.className || (e.className = 2 >= d && f === d - 1 ? "btn-primary" : "btn-default") }), a } function i(a, b) { var c = a.length, d = {}; if (1 > c || c > 2) throw new Error("Invalid argument length"); return 2 === c || "string" == typeof a[0] ? (d[b[0]] = a[0], d[b[1]] = a[1]) : d = a[0], d } function j(a, c, d) { return b.extend(!0, {}, a, i(c, d)) } function k(a, b, c, d) { var e = { className: "bootbox-" + a, buttons: l.apply(null, b) }; return m(j(e, d, c), b) } function l() { for (var a = {}, b = 0, c = arguments.length; c > b; b++) { var e = arguments[b], f = e.toLowerCase(), g = e.toUpperCase(); a[f] = { label: d(g) } } return a } function m(a, b) { var d = {}; return g(b, function (a, b) { d[b] = !0 }), g(a.buttons, function (a) { if (d[a] === c) throw new Error("button key " + a + " is not allowed (options are " + b.join("\n") + ")") }), a } var n = { dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>", header: "<div class='modal-header'><h4 class='modal-title'></h4></div>", footer: "<div class='modal-footer'></div>", closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>", form: "<form class='bootbox-form'></form>", inputs: { text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />", textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>", email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />", select: "<select class='bootbox-input bootbox-input-select form-control'></select>", checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>", date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />", time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />", number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />", password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />" } }, o = { locale: "en", backdrop: "static", animate: !0, className: null, closeButton: !0, show: !0, container: "body" }, p = {}; p.alert = function () { var a; if (a = k("alert", ["ok"], ["message", "callback"], arguments), a.callback && !b.isFunction(a.callback)) throw new Error("alert requires callback property to be a function when provided"); return a.buttons.ok.callback = a.onEscape = function () { return b.isFunction(a.callback) ? a.callback.call(this) : !0 }, p.dialog(a) }, p.confirm = function () { var a; if (a = k("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), a.buttons.cancel.callback = a.onEscape = function () { return a.callback.call(this, !1) }, a.buttons.confirm.callback = function () { return a.callback.call(this, !0) }, !b.isFunction(a.callback)) throw new Error("confirm requires a callback"); return p.dialog(a) }, p.prompt = function () { var a, d, e, f, h, i, k; if (f = b(n.form), d = { className: "bootbox-prompt", buttons: l("cancel", "confirm"), value: "", inputType: "text" }, a = m(j(d, arguments, ["title", "callback"]), ["cancel", "confirm"]), i = a.show === c ? !0 : a.show, a.message = f, a.buttons.cancel.callback = a.onEscape = function () { return a.callback.call(this, null) }, a.buttons.confirm.callback = function () { var c; switch (a.inputType) { case "text": case "textarea": case "email": case "select": case "date": case "time": case "number": case "password": c = h.val(); break; case "checkbox": var d = h.find("input:checked"); c = [], g(d, function (a, d) { c.push(b(d).val()) }) }return a.callback.call(this, c) }, a.show = !1, !a.title) throw new Error("prompt requires a title"); if (!b.isFunction(a.callback)) throw new Error("prompt requires a callback"); if (!n.inputs[a.inputType]) throw new Error("invalid prompt type"); switch (h = b(n.inputs[a.inputType]), a.inputType) { case "text": case "textarea": case "email": case "date": case "time": case "number": case "password": h.val(a.value); break; case "select": var o = {}; if (k = a.inputOptions || [], !b.isArray(k)) throw new Error("Please pass an array of input options"); if (!k.length) throw new Error("prompt with select requires options"); g(k, function (a, d) { var e = h; if (d.value === c || d.text === c) throw new Error("given options in wrong format"); d.group && (o[d.group] || (o[d.group] = b("<optgroup/>").attr("label", d.group)), e = o[d.group]), e.append("<option value='" + d.value + "'>" + d.text + "</option>") }), g(o, function (a, b) { h.append(b) }), h.val(a.value); break; case "checkbox": var q = b.isArray(a.value) ? a.value : [a.value]; if (k = a.inputOptions || [], !k.length) throw new Error("prompt with checkbox requires options"); if (!k[0].value || !k[0].text) throw new Error("given options in wrong format"); h = b("<div/>"), g(k, function (c, d) { var e = b(n.inputs[a.inputType]); e.find("input").attr("value", d.value), e.find("label").append(d.text), g(q, function (a, b) { b === d.value && e.find("input").prop("checked", !0) }), h.append(e) }) }return a.placeholder && h.attr("placeholder", a.placeholder), a.pattern && h.attr("pattern", a.pattern), a.maxlength && h.attr("maxlength", a.maxlength), f.append(h), f.on("submit", function (a) { a.preventDefault(), a.stopPropagation(), e.find(".btn-primary").click() }), e = p.dialog(a), e.off("shown.bs.modal"), e.on("shown.bs.modal", function () { h.focus() }), i === !0 && e.modal("show"), e }, p.dialog = function (a) { a = h(a); var d = b(n.dialog), f = d.find(".modal-dialog"), i = d.find(".modal-body"), j = a.buttons, k = "", l = { onEscape: a.onEscape }; if (b.fn.modal === c) throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/javascript/ for more details."); if (g(j, function (a, b) { k += "<button data-bb-handler='" + a + "' type='button' class='btn " + b.className + "'>" + b.label + "</button>", l[a] = b.callback }), i.find(".bootbox-body").html(a.message), a.animate === !0 && d.addClass("fade"), a.className && d.addClass(a.className), "large" === a.size ? f.addClass("modal-lg") : "small" === a.size && f.addClass("modal-sm"), a.title && i.before(n.header), a.closeButton) { var m = b(n.closeButton); a.title ? d.find(".modal-header").prepend(m) : m.css("margin-top", "-10px").prependTo(i) } return a.title && d.find(".modal-title").html(a.title), k.length && (i.after(n.footer), d.find(".modal-footer").html(k)), d.on("hidden.bs.modal", function (a) { a.target === this && d.remove() }), d.on("shown.bs.modal", function () { d.find(".btn-primary:first").focus() }), "static" !== a.backdrop && d.on("click.dismiss.bs.modal", function (a) { d.children(".modal-backdrop").length && (a.currentTarget = d.children(".modal-backdrop").get(0)), a.target === a.currentTarget && d.trigger("escape.close.bb") }), d.on("escape.close.bb", function (a) { l.onEscape && e(a, d, l.onEscape) }), d.on("click", ".modal-footer button", function (a) { var c = b(this).data("bb-handler"); e(a, d, l[c]) }), d.on("click", ".bootbox-close-button", function (a) { e(a, d, l.onEscape) }), d.on("keyup", function (a) { 27 === a.which && d.trigger("escape.close.bb") }), b(a.container).append(d), d.modal({ backdrop: a.backdrop ? "static" : !1, keyboard: !1, show: !1 }), a.show && d.modal("show"), d }, p.setDefaults = function () { var a = {}; 2 === arguments.length ? a[arguments[0]] = arguments[1] : a = arguments[0], b.extend(o, a) }, p.hideAll = function () { return b(".bootbox").modal("hide"), p }; var q = { bg_BG: { OK: "Ок", CANCEL: "Отказ", CONFIRM: "Потвърждавам" }, br: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim" }, cs: { OK: "OK", CANCEL: "Zru?it", CONFIRM: "Potvrdit" }, da: { OK: "OK", CANCEL: "Annuller", CONFIRM: "Accepter" }, de: { OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren" }, el: { OK: "Εντ?ξει", CANCEL: "Ακ?ρωση", CONFIRM: "Επιβεβα?ωση" }, en: { OK: "确定", CANCEL: "取消", CONFIRM: "确定" }, es: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar" }, et: { OK: "OK", CANCEL: "Katkesta", CONFIRM: "OK" }, fa: { OK: "????", CANCEL: "???", CONFIRM: "?????" }, fi: { OK: "OK", CANCEL: "Peruuta", CONFIRM: "OK" }, fr: { OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord" }, he: { OK: "?????", CANCEL: "?????", CONFIRM: "?????" }, hu: { OK: "OK", CANCEL: "Mégsem", CONFIRM: "Meger?sít" }, hr: { OK: "OK", CANCEL: "Odustani", CONFIRM: "Potvrdi" }, id: { OK: "OK", CANCEL: "Batal", CONFIRM: "OK" }, it: { OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma" }, ja: { OK: "OK", CANCEL: "キャンセル", CONFIRM: "確認" }, lt: { OK: "Gerai", CANCEL: "At?aukti", CONFIRM: "Patvirtinti" }, lv: { OK: "Labi", CANCEL: "Atcelt", CONFIRM: "Apstiprināt" }, nl: { OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren" }, no: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, pl: { OK: "OK", CANCEL: "Anuluj", CONFIRM: "Potwierd?" }, pt: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Confirmar" }, ru: { OK: "OK", CANCEL: "Отмена", CONFIRM: "Применить" }, sq: { OK: "OK", CANCEL: "Anulo", CONFIRM: "Prano" }, sv: { OK: "OK", CANCEL: "Avbryt", CONFIRM: "OK" }, th: { OK: "????", CANCEL: "??????", CONFIRM: "??????" }, tr: { OK: "Tamam", CANCEL: "?ptal", CONFIRM: "Onayla" }, zh_CN: { OK: "OK", CANCEL: "取消", CONFIRM: "确定" }, zh_TW: { OK: "OK", CANCEL: "取消", CONFIRM: "確認" } }; return p.addLocale = function (a, c) { return b.each(["OK", "CANCEL", "CONFIRM"], function (a, b) { if (!c[b]) throw new Error("Please supply a translation for '" + b + "'") }), q[a] = { OK: c.OK, CANCEL: c.CANCEL, CONFIRM: c.CONFIRM }, p }, p.removeLocale = function (a) { return delete q[a], p }, p.setLocale = function (a) { return p.setDefaults("locale", a) }, p.init = function (c) { return a(c || b) }, p });
var confirm = function (msg, fn) {
    bootbox.setLocale("zh_CN");
    bootbox.confirm('<h3 style="font-weight:bold">' + msg + '</h3>', fn);
    if (IsPC()) {
        $(".modal").css("top", parent.pageYOffset);
    }
}
var myprompt = function (msg, fn) {
    bootbox.setLocale("zh_CN");
    bootbox.prompt('<h3 style="font-weight:bold">' + msg + '</h3>', fn);
    if (IsPC()) {
        $(".modal").css("top", parent.pageYOffset);
    }
}
//var confirm = function(msg, fn) {
//	window.parent.confirm(msg, fn);
//}
/**
 * bootbox end
 */

/**
 * toastr begin
 */
//parent.window.document.body
var fail = function (msg) {
    window.parent.failM(msg);
}
var success = function (msg) {
    window.parent.successM(msg);
}
var warn = function (msg) {
    window.parent.warnM(msg);
}
!function (a) { a(["jquery"], function (a) { return function () { function b(a, b, c) { return o({ type: u.error, iconClass: p().iconClasses.error, message: a, optionsOverride: c, title: b }) } function c(b, c) { return b || (b = p()), r = a("#" + b.containerId), r.length ? r : (c && (r = l(b)), r) } function d(a, b, c) { return o({ type: u.info, iconClass: p().iconClasses.info, message: a, optionsOverride: c, title: b }) } function e(a) { s = a } function f(a, b, c) { return o({ type: u.success, iconClass: p().iconClasses.success, message: a, optionsOverride: c, title: b }) } function g(a, b, c) { return o({ type: u.warning, iconClass: p().iconClasses.warning, message: a, optionsOverride: c, title: b }) } function h(a) { var b = p(); r || c(b), k(a, b) || j(b) } function i(b) { var d = p(); return r || c(d), b && 0 === a(":focus", b).length ? void q(b) : void (r.children().length && r.remove()) } function j(b) { for (var c = r.children(), d = c.length - 1; d >= 0; d--)k(a(c[d]), b) } function k(b, c) { return b && 0 === a(":focus", b).length ? (b[c.hideMethod]({ duration: c.hideDuration, easing: c.hideEasing, complete: function () { q(b) } }), !0) : !1 } function l(b) { return r = a("<div/>").attr("id", b.containerId).addClass(b.positionClass).attr("aria-live", "polite").attr("role", "alert"), r.appendTo(a(b.target)), r } function m() { return { tapToDismiss: !0, toastClass: "toast", containerId: "toast-container", debug: !1, showMethod: "fadeIn", showDuration: 300, showEasing: "swing", onShown: void 0, hideMethod: "fadeOut", hideDuration: 1e3, hideEasing: "swing", onHidden: void 0, extendedTimeOut: 1e3, iconClasses: { error: "toast-error", info: "toast-info", success: "toast-success", warning: "toast-warning" }, iconClass: "toast-info", positionClass: "toast-top-right", timeOut: 5e3, titleClass: "toast-title", messageClass: "toast-message", target: "body", closeHtml: "<button>&times;</button>", newestOnTop: !0 } } function n(a) { s && s(a) } function o(b) { function d(b) { return !a(":focus", j).length || b ? j[g.hideMethod]({ duration: g.hideDuration, easing: g.hideEasing, complete: function () { q(j), g.onHidden && "hidden" !== o.state && g.onHidden(), o.state = "hidden", o.endTime = new Date, n(o) } }) : void 0 } function e() { (g.timeOut > 0 || g.extendedTimeOut > 0) && (i = setTimeout(d, g.extendedTimeOut)) } function f() { clearTimeout(i), j.stop(!0, !0)[g.showMethod]({ duration: g.showDuration, easing: g.showEasing }) } var g = p(), h = b.iconClass || g.iconClass; "undefined" != typeof b.optionsOverride && (g = a.extend(g, b.optionsOverride), h = b.optionsOverride.iconClass || h), t++ , r = c(g, !0); var i = null, j = a("<div/>"), k = a("<div/>"), l = a("<div/>"), m = a(g.closeHtml), o = { toastId: t, state: "visible", startTime: new Date, options: g, map: b }; return b.iconClass && j.addClass(g.toastClass).addClass(h), b.title && (k.append(b.title).addClass(g.titleClass), j.append(k)), b.message && (l.append(b.message).addClass(g.messageClass), j.append(l)), g.closeButton && (m.addClass("toast-close-button").attr("role", "button"), j.prepend(m)), j.hide(), g.newestOnTop ? r.prepend(j) : r.append(j), j[g.showMethod]({ duration: g.showDuration, easing: g.showEasing, complete: g.onShown }), g.timeOut > 0 && (i = setTimeout(d, g.timeOut)), j.hover(f, e), !g.onclick && g.tapToDismiss && j.click(d), g.closeButton && m && m.click(function (a) { a.stopPropagation ? a.stopPropagation() : void 0 !== a.cancelBubble && a.cancelBubble !== !0 && (a.cancelBubble = !0), d(!0) }), g.onclick && j.click(function () { g.onclick(), d() }), n(o), g.debug && console && console.log(o), j } function p() { return a.extend({}, m(), v.options) } function q(a) { r || (r = c()), a.is(":visible") || (a.remove(), a = null, 0 === r.children().length && r.remove()) } var r, s, t = 0, u = { error: "error", info: "info", success: "success", warning: "warning" }, v = { clear: h, remove: i, error: b, getContainer: c, info: d, options: {}, subscribe: e, success: f, version: "2.0.3", warning: g }; return v }() }) }("function" == typeof define && define.amd ? define : function (a, b) { "undefined" != typeof module && module.exports ? module.exports = b(require("jquery")) : window.toastr = b(window.jQuery) });
var failM = function (msg) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.error(msg);
}
var successM = function (msg) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.success(msg);
}
var warnM = function (msg) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr.warning(msg);
}
/**
 * toastr end
 */


/**
 * metronic相关 begin
 */
var errorTip = function (msg, container) {
    Metronic.alert({
        container: container, // alerts parent container(by default placed after the page breadcrumbs)
        place: 'prepend', // append or prepent in container 
        type: 'danger',  // alert's type
        message: msg,  // alert's message
        close: false, // make alert closable
        reset: true, // close all previouse alerts first
        focus: true, // auto scroll to the alert after shown
        closeInSeconds: 0, // auto close after defined seconds
        icon: 'warning' // put icon before the message
    });
}
var wait = function (el) {
    Metronic.blockUI({
        target: el,
        animate: true,
        overlayColor: 'none'
    });
}
var waitWithMessage = function (el, message) {
    Metronic.blockUI({
        target: el,
        boxed: true,
        overlayColor: 'none',
        message: message
    });
}
var complete = function (el) {
    Metronic.unblockUI(el);
}
/**
 * metronic相关 end
 */

//ajax构建select组件
var selectInit = function (url, controlName, valueField, textField, defaultValue) {
    if ($(':input[name=' + controlName + '] option').length == 0) {
        $.ajax({
            url: url,
            data: '',
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if ($(':input[name=' + controlName + ']').attr("multiple") == undefined) {
                    $(':input[name=' + controlName + ']').append('<option value=""></option>');
                };
                $.each(data.aaData, function (index, item) {
                    $(':input[name=' + controlName + ']').append('<option value="' + item[valueField] + '">' + item[textField] + '</option>');
                });
                if (defaultValue === undefined) {
                    if (data['defaultValue'] !== undefined) {
                        $.uniform.update($(':input[name=' + controlName + ']').select2("val", data['defaultValue']));
                    }
                } else {
                    $.uniform.update($(':input[name=' + controlName + ']').select2("val", defaultValue));
                }
            }
        });
    } else {
        $.uniform.update($(':input[name=' + controlName + ']').select2("val", defaultValue));
    }
}
var selectInit2 = function (url, controlName, valueField, textField, defaultValue) {
    if ($(':input[name=' + controlName + '] option').length == 0) {
        $.ajax({
            url: url,
            data: '',
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                $.each(data.aaData, function (index, item) {
                    $(':input[name=' + controlName + ']').append('<option value="' + item[valueField] + '">' + item[textField] + '</option>');
                });
                if (defaultValue === undefined) {
                    if (data['defaultValue'] !== undefined) {
                        $.uniform.update($(':input[name=' + controlName + ']').select2("val", data['defaultValue']));
                    }
                } else {
                    $.uniform.update($(':input[name=' + controlName + ']').select2("val", defaultValue));
                }
            }
        });
    } else {
        $.uniform.update($(':input[name=' + controlName + ']').select2("val", defaultValue));
    }
}

//取url中某个参数的值
var getParam = function (url, paramName) {
    url = '' + url;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(url.indexOf("?") + 1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest[paramName];
};

/*
*取当天时间
*/
var Today = function () {
    var date = new Date();
    return date.getFullYear() + "-" + getNowFormatDate((date.getMonth() + 1)) + "-" + getNowFormatDate(date.getDate());
}
//取当月日期
function getNowFormatDate(s) { return s < 10 ? '0' + s : s; }
var FormatDate = function (strTime, AddDayCount, i) {
    if (myBrowser() == 'Safari') {
        var date = new Date(strTime.replace(/-/g, "/"));
    } else {
        var date = new Date(strTime);
    };
    if (i != undefined) {
        date.setDate(date.getDate() - AddDayCount);
    } else {
        if (AddDayCount != undefined) {
            date.setDate(AddDayCount);
        };
    };
    return date.getFullYear() + "-" + getNowFormatDate((date.getMonth() + 1)) + "-" + getNowFormatDate(date.getDate());
}
/*
*判断浏览器
*/
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

//FFEN AND ICON
var icon = function (i) {
    return '<a href="/templates/common/level.html" target="_blank">' + getIconImg(i) + '</a>';
}
var getIconImg = function (i) {
    if (i < 4) return '';
    if (i >= 4 && i <= 10) return '<img src="../images/star.png"/>';
    if (i >= 11 && i <= 40) return '<img src="../images/star.png"/><img src="../images/star.png"/>';
    if (i >= 41 && i <= 90) return '<img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/>';
    if (i >= 91 && i <= 150) return '<img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/>';
    if (i >= 151 && i <= 250) return '<img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/><img src="../images/star.png"/>';
    if (i >= 251 && i <= 500) return '<img src="../images/z.gif"/>';
    if (i >= 501 && i <= 1000) return '<img src="../images/z.gif"/><img src="../images/z.gif"/>';
    if (i >= 1001 && i <= 2000) return '<img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/>';
    if (i >= 2001 && i <= 5000) return '<img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/>';
    if (i >= 5001 && i <= 10000) return '<img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/><img src="../images/z.gif"/>';
    if (i >= 10001 && i <= 20000) return '<img src="../images/g.gif"/>';
    if (i >= 20001 && i <= 50000) return '<img src="../images/g.gif"/><img src="../images/g.gif"/>';
    if (i >= 50001 && i <= 100000) return '<img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/>';
    if (i >= 100001 && i <= 200000) {
        return '<img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/>';
    } else {
        return '<img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/><img src="../images/g.gif"/>';
    }
}
var getHead = function (db, head) {
    if (head == undefined || head == '') {
        return "../images/head-default.jpg";
    } else {
        return "/upload/head/" + db + '/' + head + "?t=" + Date.parse(new Date());
    };
}
var getPhoto = function (db, photo) {
    if (photo == undefined || photo == '') {
        return "../images/photo-default.jpg";
    } else {
        return "/upload/photo/" + db + '/' + photo;//*******图片每次下载耗流量，不加时间戳了
    };
}
var random = function (n, m) {
    var str = Math.floor(Math.random() * (m - n + 1) + n);
    if (str == 1) {
        return 'red';
    } else if (str == 2) {
        return 'green';
    } else if (str == 3) {
        return 'blue';
    } else if (str == 4) {
        return 'yellow';
    } else {
        return 'purple';
    };
}

/*
*toggleDisabled
*/
$.fn.toggleDisabled = function () {
    return this.each(function () {
        var $this = $(this);
        if ($this.prop('disabled')) {
            $this.prop('disabled', false);
        } else {
            $this.prop('disabled', true);
        }
    });
};
/*
*判断是否是电脑登录
*/
function IsPC() {
    var flag = false;
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        flag = true;
    }
    return flag;
}



$('.modal').on('show.bs.modal', function () {
    if (IsPC()) {
        $(".modal").css("top", parent.pageYOffset);
    }
})
var DB = window.location.host.substring(0, window.location.host.indexOf(".")).replace('-', '_');