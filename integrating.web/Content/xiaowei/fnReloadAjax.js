﻿jQuery.fn.dataTableExt.oApi.fnReloadAjax = function (F, A, C, G) { if (jQuery.fn.dataTable.versionCheck) { var H = new jQuery.fn.dataTable.Api(F); if (A) { H.ajax.url(A).load(C, !G) } else { H.ajax.reload(C, !G) } return } if (A !== undefined && A !== null) { F.sAjaxSource = A } if (F.oFeatures.bServerSide) { this.fnDraw(); return } this.oApi._fnProcessingDisplay(F, true); var E = this; var B = F._iDisplayStart; var D = []; this.oApi._fnServerParams(F, D); F.fnServerData.call(F.oInstance, F.sAjaxSource, D, function (J) { E.oApi._fnClearTable(F); var K = (F.sAjaxDataProp !== "") ? E.oApi._fnGetObjectDataFn(F.sAjaxDataProp)(J) : J; for (var I = 0; I < K.length; I++) { E.oApi._fnAddData(F, K[I]) } F.aiDisplay = F.aiDisplayMaster.slice(); E.fnDraw(); if (G === true) { F._iDisplayStart = B; E.oApi._fnCalculateEnd(F); E.fnDraw(false) } E.oApi._fnProcessingDisplay(F, false); if (typeof C == "function" && C !== null) { C(F) } }, F) };