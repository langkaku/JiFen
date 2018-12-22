var chart = Highcharts.chart('chart1', {
  chart: {
    type: 'column'
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: ['计划财务部','人力资源部','战略发展部','安全保卫部','企业文化部','风险管理部','公司业务部','银行卡部','科技信息部','运营管理部'],
  },
  yAxis: {
    title: {
      text: null
    }
  },
  series: [{
    name: '基础类',
    data: [120,85,94,112,135,95,105,116,124,89]
  },{
    name: '非基础类',
    data: [125,92,86,105,108,114,110,99,135,75]
  }],
  legend: {
    layout: 'horizontal',
    align: 'center',
    horizontalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      }
    }
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
        maxHeight: 300
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
})
var chart = Highcharts.chart('chart2', {
  chart: {
    type: 'area'
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: ['计划财务部','人力资源部','战略发展部','安全保卫部','企业文化部','风险管理部','公司业务部','银行卡部','科技信息部','运营管理部'],
  },
  yAxis: {
    title: {
      text: null
    }
  },
  tooltip: {
    pointFormat: '{series.name} 平均 <b>{point.y:,.0f}</b>积分'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      }
    }
  },
  series: [{
    showInLegend: false,
    data: [53,78,92,66,68,75,83,69,85,99]
  }]
})
var chart = Highcharts.chart('chart3', {
  chart: {
    type: 'column'
  },
  title: {
    text: null
  },
  credits: {
    enabled: false
  },
  xAxis: {
    categories: ['计划财务部','人力资源部','战略发展部','安全保卫部','企业文化部','风险管理部','公司业务部','银行卡部','科技信息部','运营管理部'],
  },
  yAxis: {
    title: {
      text: null
    }
  },
  series: [{
    showInLegend: false,
    data: [125,92,86,105,108,114,110,99,135,75]
  }],
  legend: {
    layout: 'horizontal',
    align: 'center',
    horizontalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      }
    }
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
        maxHeight: 300
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
})
