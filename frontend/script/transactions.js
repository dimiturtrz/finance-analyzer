$(document).ready(function() {
    "use strict";

    var add_transaction_button = $("button#add-transaction-button");
    var add_transaction_panel = $("#add-transaction-form-panel");
    var transaction_submit_button = $("#transaction-submit");

    var add_transaction_close = $("#add-transaction-close");
    add_transaction_close.on('click', function() {
        add_transaction_button.show();
        add_transaction_panel.hide();
    });
    
    add_transaction_panel.hide();

    add_transaction_button.on('click', function() {
        add_transaction_panel.show();
        add_transaction_button.hide();
    });

    transaction_submit_button.on('click', function() {
        create_transaction();
        add_transaction_button.show();
        add_transaction_panel.hide();
    });

    var ENDPOINT = "http://localhost:3000/transactions";

    var description_input = $("#transaction-description-input");
    var value_input = $("#transaction-value-input");
    var date_input = $("#transaction-date-input");
    var important_input = $("#transaction-important-input");

    date_input.datepicker();

    function create_transaction() {
        var transaction = {
            description: description_input.val(),
            value: value_input.val(),
            date: date_input.val(),
            important: important_input.val()
        };

        $.ajax(ENDPOINT, {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(transaction),
            dataType: "json"
        }).then(function(response) {
            displayTransactions();
        });
    }

    function listTransactions() {
        return $.ajax(ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }

    var transactions_table = $("#transactions-table");

    function clearTable() {
        transactions_table.children('tbody').empty();
    }

    function addTransactionToTable(transaction) {
        transactions_table.children('tbody').append(
            $("<tr></tr>")
                .append($("<td></td>").text(transaction.id))
                .append($("<td></td>").text(transaction.value))
                .append($("<td></td>").text(transaction.description))
                .append($("<td></td>").text(transaction.date))
                .append($("<td></td>").text(transaction.important))
        );
    }

    function displayTransactions() {
        listTransactions().then(function(response) {
            clearTable();
            $(response).each(function(index, obj) {
                addTransactionToTable(obj);
            });
        });
        
    }

    displayTransactions();
});
