 jQuery(document).ready(function () {

    $('#usertype').selectpicker({});

    Metronic.init(); // init metronic core components
    Module.init();
    var host = window.location.host.replace('-', '_');
    var db = host.substring(0, host.indexOf("."));
    if (db == 'being' || db == 'h' || db == 'jhsys') {
        $('#percentDiv').show();
        $('h3').hide();
        $('#referenceTemp').hide();
    }
    var TODAY = getParam(window.location.href, 'TODAY');
    if (TODAY == undefined) {
        TODAY = $(window.parent.document).find("#TODAY").val();
    }
    $('#zd').attr('href', '/templates/reportManage/custom.html?FDb=&FCustomId=195000&TODAY=' + TODAY);
});