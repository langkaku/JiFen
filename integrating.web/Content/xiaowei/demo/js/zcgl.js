jQuery(document).ready(function() {       
	Metronic.init(); // init metronic core components
	Module.init();
	if (getParam(window.location.search,"open") == 'true') {
		$('.modal').on('show.bs.modal', function () {
			if (IsPC()) {
				$(".modal").css( "top", 0);
			}
		})
	}
});