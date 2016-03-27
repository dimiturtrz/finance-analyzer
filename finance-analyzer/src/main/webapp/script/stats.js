$(document).ready(function() {
    "use strict";

    var TRANSACTIONS_ENDPOINT = "http://localhost:3000/transactions";
    // var TRANSACTIONS_ENDPOINT = "http://localhost:8080/finance-analyzer/rest/transactions";

    var dashboardContentContainer = $("#dashboard-panel .page-content");

    function getTransactionsFromServer() {
        return $.ajax(TRANSACTIONS_ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }

    var balanceThisMonthDeferred = $.Deferred(),
        balanceLastMonthDeferred = $.Deferred(),
        expensesThisMonthDeferred = $.Deferred(),
        notImportantExpensesThisMonthDeferred = $.Deferred();

    getTransactions(fromThisMonth).then(function(transactions) {
        var absoluteIncomeForThisMonth = absoluteIncome(transactions);
        var absoluteLossForThisMonth = absoluteLoss(transactions);
        var balance = absoluteIncomeForThisMonth + absoluteLossForThisMonth;
        var notImportant = transactions.filter(function(_, t) { return !t.important; });
        var notImportantExpensesToImportantRatio = absoluteLoss(notImportant) / absoluteLossForThisMonth * 100;

        dashboardContentContainer.append("Absolute income for this month: " + absoluteIncomeForThisMonth + "<br>");
        dashboardContentContainer.append("Absolute loss for this month: " + absoluteLossForThisMonth + "<br>");
        expensesThisMonthDeferred.resolve(absoluteLossForThisMonth);
        dashboardContentContainer.append("Balance (absolute income - loss) for this month: " + balance + "<br>");
        balanceThisMonthDeferred.resolve(balance);
        dashboardContentContainer.append("Unimportant/important ratio: " + notImportantExpensesToImportantRatio + "<br>");
        notImportantExpensesThisMonthDeferred.resolve(notImportantExpensesToImportantRatio);
    });

    getTransactions(fromLastMonth).then(function(transactions) {
        var absoluteIncomeForLastMonth = absoluteIncome(transactions);
        var absoluteLossForLastMonth = absoluteLoss(transactions);
        var balance = absoluteIncomeForLastMonth + absoluteLossForLastMonth;

        dashboardContentContainer.append("Absolute income for last month: " + absoluteIncomeForLastMonth + "<br>");
        dashboardContentContainer.append("Absolute loss for last month: " + absoluteLossForLastMonth + "<br>");
        dashboardContentContainer.append("Balance (absolute income - loss) for this month: " + balance + "<br>");
        balanceLastMonthDeferred.resolve(balance);
    });

    $.when(
        balanceThisMonthDeferred,
        balanceLastMonthDeferred
    ).then(function(balanceThisMonth, balanceLastMonth) {
        var balanceComparedToLastMonthInPercents = balanceThisMonth / balanceLastMonth * 100;
        dashboardContentContainer.append("Balance compared to last month: " + balanceComparedToLastMonthInPercents + "%");
    });

    function getTransactions(filter) {
        var transactions = $.Deferred();

        getTransactionsFromServer().done(function(response) {
            transactions.resolve($(response).filter(function(index, transaction) {
                return filter(transaction);
            }));
        }).fail(function() {
            transactions.resolve($([]));
        });

        return transactions.promise();
    }

    function fromThisMonth(transaction) {
        var curMonth = (new Date()).getMonth();
        var curYear = (new Date()).getYear();

        return new Date(Date.parse(transaction.date)).getMonth() == curMonth &&
               new Date(Date.parse(transaction.date)).getYear() == curYear;
    }

    function absoluteIncome(transactions) {
        return $(transactions).toArray().reduce(function(absoluteIncome, transaction) {
            if(transaction.value > 0)
                return absoluteIncome + transaction.value;
            else
                return absoluteIncome;
        }, 0);
    }

    function absoluteLoss(transactions) {
        return $(transactions).toArray().reduce(function(absoluteLoss, transaction) {
            if(transaction.value < 0)
                return absoluteLoss + transaction.value;
            else
                return absoluteLoss;
        }, 0);
    }

    function fromLastMonth(transaction) {
        var curMonth = (new Date()).getMonth();
        var curYear = (new Date()).getYear();

        var transactionMonth = new Date(Date.parse(transaction.date)).getMonth();
        var transactionYear = new Date(Date.parse(transaction.date)).getYear();

        if((curMonth == 0 && transactionMonth == 11) && (curYear - transactionYear == 1))
            return true;
        
        return (curMonth == transactionMonth + 1) && (curYear == transactionYear);
    }

    $.when(
        notImportantExpensesThisMonthDeferred
    ).then(function(notImportantInPercents) {
        var notImportant = [notImportantInPercents];
        var important = [100-notImportantInPercents];

        $.plot('#pie-chart', [{
            data: notImportant,
            label: "Not important transactions",
            color: "#3DB9D3"
        },
        {
            data: important,
            label: "Important transactions",
            color: "#ffce54"
        }], {
        series: {
            pie: {
                show: true,
                radius: 1,
                label: {
                    show: true,
                    radius: 3/4,
                    background: {
                        opacity: 0.5,
                        color: '#000'
                    }
                }
            }
        }
        });
    });
});