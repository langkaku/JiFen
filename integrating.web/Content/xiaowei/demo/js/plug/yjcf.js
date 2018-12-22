$(function(){
	$.ajax({
		url: '',
		success: function(res){

		}
	})
	var chart = Highcharts.chart('chart', {
		chart: {
			polar: true,
			type: 'line'
		},
		title: {
            text: null
        },
		credits: {
            enabled: false
        },
		pane: {
			size: '80%'
		},
		xAxis: {
			categories: ['打卡分','资格证书分', '学历分','职称分', '工龄分','值班分'],
			tickmarkPlacement: 'on',
			lineWidth: 0
		},
		yAxis: {
			gridLineInterpolation: 'polygon',
			lineWidth: 0,
			min: 0
		},
		tooltip: {
			shared: true,
			pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}分</b><br/>'
		},
		legend: {
			align: 'right',
			verticalAlign: 'top',
			y: 70,
			layout: 'vertical'
		},
		series: [{
			showInLegend: false,
			data: [400, 200, 500, 300, 200,300],
			pointPlacement: 'on'
		}]
	});
})