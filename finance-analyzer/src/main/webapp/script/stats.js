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
    // 2. Absolute loss for this month
    // 3. Absolute income - loss
    // 4. Percentage income-loss compared to last month
    // 5. Percentage for unimportant things out of all

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