$(document).ready(function() {
    "use strict";

    var TRANSACTIONS_ENDPOINT = "http://localhost:8080/finance-analyzer/rest/transactions";

    function listTransactions() {
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

    transactionsFromThisMonth().then(function(transactions) {
        dashboardContentContainer.append("Absolute income for this month: " + absoluteIncome(transactions));
    });

    function fromThisMonth(dateString) {
        var curMonth = (new Date()).getMonth();
        var curYear = (new Date()).getYear();

        return new Date(Date.parse(dateString)).getMonth() == curMonth &&
               new Date(Date.parse(dateString)).getYear() == curYear;
    }

    function absoluteIncome(transactions) {
        var absIncome = 0;
        $(transactions).each(function(index, transaction) {
            if(transaction.value > 0) {
                absIncome += transaction.value;
            }
        });
        return absIncome;
    }

    function transactionsFromThisMonth() {
        var dfd = $.Deferred();

        listTransactions().done(function(response) {
            dfd.resolve($(response).filter(function(index, transaction) {
                return fromThisMonth(transaction.date) == true;
            }));
        }).fail(function() {
            dfd.resolve($([]));
        });

        return dfd.promise();
    }

    var dashboardContentContainer = $("#dashboard-panel .page-content");
    

    // var absIncomeThisMonth = absoluteIncome(transactionsFromThisMonth());
    // var absLossThisMonth = absoluteLoss(transactionsFromThisMonth);
    // var verdict = absIncomeThisMonth - absLossThisMonth;
    // var absIncomeLastMonth = absoluteIncome(transactionsFromLastMonth);
    // var absLossLastMonth = absoluteLoss(transactionsFromLastMonth);
    // var verdictLastMonth = absIncomeLastMonth - absLossLastMonth;
    // var comparedToLastMonthInPercents = verdict / verdictLastMonth * 100;
    // var unimportantTransactionsThisMonth = getUnimportantTransactions();
    // var unimportantToImportantRatioInPercents = ...;

});