
var db = new Dexie("BEI");
db.version(1).stores({ cashflow: "++id,amount,description,date,cflow" });
db.open();

function add_flow (amount, description, date, cflow) {
  db.cashflow.add({
    amount: amount, 
    description: description,
    date: date,
    cflow: cflow
  }).then(function(){
    location.reload();
  });
}


$('#add_income_add').click(function(){
  add_flow(
    $('#income_add_form #amount').val(),
    $('#income_add_form #description').val(),
    $('#income_add_form #date').val(),
    "income"
  );
});

$('#add_expense_add').click(function(){
  add_flow(
    $('#expense_add_form #amount').val(),
    $('#expense_add_form #description').val(),
    $('#expense_add_form #date').val(),
    "expense"
  );
});

$('a.delete_this').click(function(){
  alert();
})

function delete_cf(item){
  db.cashflow.where("id").equals($(item).data("id")).delete();
  location.reload();
}



function expenseController($scope) {
  var expenses = []
  $scope.reloadRoute = function() {
     $route.reload();
  }
  db.cashflow.where("cflow").equalsIgnoreCase("expense").each(function(expense){
    expenses.push(expense);
    
  }).then(function(){
    $scope.$apply(function(){
      $scope.expenses = expenses;
    });
    $( "#expense_list_view" ).listview( "refresh" );
  });
}
function incomeController($scope) {
  var incomes = []
  $scope.reloadRoute = function() {
     $route.reload();
  }
  db.cashflow.where("cflow").equalsIgnoreCase("income").each(function(income){
    incomes.push(income);
    
  }).then(function(){
    $scope.$apply(function(){
      $scope.incomes = incomes;
    });
    $( "#income_list_view" ).listview( "refresh" );
  });
}

function balanceController($scope) {
  var expenses = 0;
  var incomes = 0;

  db.cashflow.where("cflow").equalsIgnoreCase("income").each(function(income){
    incomes = ((incomes*1) + (income.amount*1))*1;
    
  }).then(function(){
    $scope.$apply(function(){
      $scope.incomes = incomes;
    });
  });

  db.cashflow.where("cflow").equalsIgnoreCase("expense").each(function(expense){
    expenses = ((expenses*1) + (expense.amount*1))*1;
    
  }).then(function(){
    $scope.$apply(function(){
      $scope.expenses = expenses;
    });
  });

}