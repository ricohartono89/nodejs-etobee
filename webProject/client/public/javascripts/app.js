var expenses = angular.module('expenses',['chart.js']);

expenses.config(['ChartJsProvider',function(ChartJsProvider){
  ChartJsProvider.setOptions({
    chartColors:['#FF5252', '#FF8A80'],
    responsive: false
  });
  ChartJsProvider.setOptions('line',{
    datasetFill:false
  });
  ChartJsProvider.setOptions('bar',{
    beginAtZero: true
  });

}])
