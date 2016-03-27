$(document).ready(function() {
    "use strict";

    var TRANSACTIONS_ENDPOINT = "http://localhost:3000/transactions";
    // var TRANSACTIONS_ENDPOINT = "http://localhost:8080/finance-analyzer/rest/transactions";

    function getTransactionsFromServer() {
        return $.ajax(TRANSACTIONS_ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }

    // TODO:
    // 1. Absolute income for this month - DONE
    // 2. Absolute loss for this month DONE
    // 3. Absolute income - loss DONE
    // 4. Percentage income-loss compared to last month DONE
    // 5. Percentage for unimportant things out of all

    var balanceThisMonthDeferred = $.Deferred(),
        balanceLastMonthDeferred = $.Deferred();

    getTransactions(fromThisMonth).then(function(transactions) {
        // var absoluteIncomeForThisMonth = $.Deferred(),
        //     absoluteLossForThisMonth = $.Deferred();
        var absoluteIncomeForThisMonth = absoluteIncome(transactions);
        var absoluteLossForThisMonth = absoluteLoss(transactions);
        dashboardContentContainer.append("Absolute income for this month: " + absoluteIncomeForThisMonth);
        dashboardContentContainer.append("<br>");
        dashboardContentContainer.append("Absolute loss for this month: " + absoluteLossForThisMonth);
        dashboardContentContainer.append("<br>");
        var balance = absoluteIncomeForThisMonth + absoluteLossForThisMonth;
        dashboardContentContainer.append("Balance (absolute income - loss) for this month: " + balance);
        balanceThisMonthDeferred.resolve(balance);
        dashboardContentContainer.append("<br>");
        var notImportant = transactions.filter(function(_, t) { console.log(t.important == false); return t.important == false; });
        var notImportantExpensesToImportantRatio = absoluteLoss(notImportant) / absoluteLossForThisMonth * 100;
        dashboardContentContainer.append("Absolute not important for this month: " + notImportantExpensesToImportantRatio);
    });

    getTransactions(fromLastMonth).then(function(transactions) {
        var absoluteIncomeForLastMonth = absoluteIncome(transactions);
        var absoluteLossForLastMonth = absoluteLoss(transactions);
        dashboardContentContainer.append("<br>");
        dashboardContentContainer.append("Absolute income for last month: " + absoluteIncomeForLastMonth);
        dashboardContentContainer.append("<br>");
        dashboardContentContainer.append("Absolute loss for last month: " + absoluteLossForLastMonth);
        dashboardContentContainer.append("<br>");
        var balance = absoluteIncomeForLastMonth + absoluteLossForLastMonth;
        dashboardContentContainer.append("Balance (absolute income - loss) for this month: " + balance);
        balanceLastMonthDeferred.resolve(balance);
    });

    $.when(
        balanceThisMonthDeferred,
        balanceLastMonthDeferred
    ).then(function(balanceThisMonth, balanceLastMonth) {
        dashboardContentContainer.append("<br>");
        var balanceComparedToLastMonthInPercents = balanceThisMonth / balanceLastMonth * 100;
        dashboardContentContainer.append("Balance compared to last month: " + balanceComparedToLastMonthInPercents + "%");
    });

    // getTransactions(notImportantFromThisMonth).then(function(transactions) {
    //     dashboardContentContainer.append("<br>");
    //     dashboardContentContainer.append("Absolute not important for this month: " + absoluteLoss(transactions));
    // });

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

    function notImportantFromThisMonth(transaction) {
        return !transaction.important && fromThisMonth(transaction);
    }

    var dashboardContentContainer = $("#dashboard-panel .page-content");
    

    // var absIncomeThisMonth = absoluteIncome(transactionsdateIsFromThisMonth());
    // var absLossThisMonth = absoluteLoss(transactionsdateIsFromThisMonth);
    // var verdict = absIncomeThisMonth - absLossThisMonth;
    // var absIncomeLastMonth = absoluteIncome(transactionsFromLastMonth);
    // var absLossLastMonth = absoluteLoss(transactionsFromLastMonth);
    // var verdictLastMonth = absIncomeLastMonth - absLossLastMonth;
    // var comparedToLastMonthInPercents = verdict / verdictLastMonth * 100;
    // var unimportantTransactionsThisMonth = getUnimportantTransactions();
    // var unimportantToImportantRatioInPercents = ...;

});