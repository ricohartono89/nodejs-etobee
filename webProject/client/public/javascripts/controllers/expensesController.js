expenses.controller('mainController',function($scope,$http,$timeout
                                                                /*getAllExpenses*/ /*addExpense, deleteExpense*/){
    $scope.formData={};
    $scope.expenseData={};
    $scope.edit={};
    $scope.add={};
    $scope.getExpenses = function(){
      $http.get('/api/common/expense').success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.expenseData=data;
        if(Object.keys(data).length!==0&&data.constructor!==Object){
          $scope.showChart($scope.expenseData);
        }
        console.log(data);
      }).error(function(error){
        console.log('Error: '+error);
      });
    };
    $scope.getExpenses();
    $scope.addExpense = function(){
      $http.post('/api/common/expense',$scope.add).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.add={};
        $scope.expenseData=data;
        $scope.showChart($scope.expenseData);
        console.log(data);
        $("#addModal").modal('hide');
      }).error(function(error){
        console.log('Error: '+error);
      });
    };
    $scope.deleteExpense=function(expense_id){
      $http.delete('/api/common/expense/'+expense_id).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.add={};
        $scope.expenseData=data;
        console.log(data);
      }).error(function(error){
        console.log('Error: '+error);
      });
    };

    $scope.editExpense = function(expense_id){
      $http.put('/api/common/expense/'+expense_id,$scope.edit).success(function(data){
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD MMMM YYYY');
        }
        $scope.edit={};
        $scope.expenseData=data;
        $scope.showChart($scope.expenseData);
        console.log(data);
        $("#editModal").modal('hide');
      }).error(function(error){
        console.log('Error: '+error);
      });
    };


    $scope.openEditPopUp = function(id){
      $http.get('/api/common/expense/'+id).success(function(data){
        console.log($scope.edit);
        for (var i = 0; i < data.length; i++) {
          data[i].transactiondate = moment(data[i].transactiondate).format('DD/MM/YYYY');
        }
        $scope.edit=angular.copy(data[0]);
        console.log(data[0]);
        $("#editModal").modal('show');
      }).error(function(error){
        console.log('Error: '+error);
      })
    };
  $scope.showChart=function(expensesData){

    $scope.labels = [];
    $scope.data=[];
    $scope.amountList=[];
    $scope.series = ['Series A'];
    for (var i = 0; i < expensesData.length; i++) {
      var date = expensesData[i].transactiondate;
      var amount = expensesData[i].amount
      console.log(amount);
      $scope.labels.push(date);
      $scope.data.push(amount);
    };
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };

};

  $scope.$on('chart-create', function (evt, chart) {
    chart.scales["y-axis-0"].min=0;
  });

});

expenses.controller('pdfGeneratorController',function($scope,$http){

    $scope.createPdf=function(data){

      var setDataRow=[];
      for (var i = 0; i < data.length; i++) {
        var dataRow=[];
        dataRow.push(data[i].name);
        dataRow.push(data[i].amount.toString());
        dataRow.push(data[i].transactiondate);
        setDataRow.push(dataRow);
      }
      var tableHeader = ['Name','Amount','Date'];
      var tableBody=[];
      tableBody.push(tableHeader);
      for (var i = 0; i < setDataRow.length; i++) {
        tableBody.push(setDataRow[i]);
      }
      console.log(tableBody);
      var docDefinition={
        content: [

         // using a { text: '...' } object lets you set styling properties
         { text: 'Report Daily Expenses',
           style:'header',
           fontSize: 15,
           alignment:'center'},
         {
           style:'tableExample',
           table:{
             body:tableBody
           },
           alignment:'center'
         }
       ],
       defaultStyle: {
		 alignment: 'center'
	}
     };
     pdfMake.createPdf(docDefinition).download('report.pdf');
    }


});
