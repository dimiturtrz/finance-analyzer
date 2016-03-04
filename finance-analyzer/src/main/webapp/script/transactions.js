$(document).ready(function() {
    "use strict";

    var add_transaction_button = $("button#add-transaction-button");
    var transaction_panel = $("#transaction-form-panel");
    var transaction_submit_button = $("#transaction-submit");

    var transaction_panel_close = $("#transaction-panel-close");
    transaction_panel_close.on('click', function() {
        add_transaction_button.show();
        transaction_panel.hide();
        clearInputs();
    });

    function clearInputs() {
        description_input.val("");
        value_input.val("");
        date_input.val("");
        important_input.val("");
    }
    
    transaction_panel.hide();

    add_transaction_button.on('click', function() {
        transaction_panel.show();
        add_transaction_button.hide();
    });

    transaction_submit_button.on('click', function() {
        var btn_text = transaction_submit_button.text();
        if(btn_text === "Add") {
            create_transaction();
            add_transaction_button.show();
            transaction_panel.hide();
        } else if(btn_text === "Save") {
            updateTransaction(transaction_panel.attr("data-id"));
            transaction_panel.hide();
            add_transaction_button.show();
        }
    });

    var ENDPOINT = "http://localhost:8080/finance-analyzer/rest/transactions";

    var description_input = $("#transaction-description-input");
    var value_input = $("#transaction-value-input");
    var date_input = $("#transaction-date-input");
    var important_input = $("#transaction-important-input");

    date_input.datepicker();

    function buildTransactionFromInputs() {
        return {
            description: description_input.val(),
            value: value_input.val(),
            date: date_input.val(),
            important: important_input.parent().hasClass('checked')
        };
    }

    function create_transaction() {
        $.ajax(ENDPOINT, {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(buildTransactionFromInputs()),
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
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-primary transaction-edit-btn\">Edit</button>")))
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-danger transaction-delete-btn\">Delete</button>").attr("data-id", transaction.id)))
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

    function readTransaction(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "GET",
            dataType: "json"
        });
    }

    function updateTransaction(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(buildTransactionFromInputs()),
            dataType: "json"
        });
    }

    function editTransaction(id) {
        add_transaction_button.hide();
        transaction_panel.attr("data-id", id);
        transaction_panel.show();
        transaction_panel.find('.panel-heading').text("Edit transaction");
        transaction_panel.find('#transaction-submit').text("Save");

        readTransaction(id).then(function(response) {
            description_input.val(response.description);
            value_input.val(response.value);
            date_input.val(response.date);
            if(response.important == true || response.important == "on") {
                important_input.parent().addClass('checked');
            } else {
                important_input.parent().removeClass('checked');
            }
        });
    }

    $("tbody").on('click', '.transaction-edit-btn', function() {
        editTransaction($(this).closest('tr').children('td').first().text())
    })

    function deleteTransaction(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "DELETE"
        });
    }

    $("tbody").on('click', '.transaction-delete-btn', function() {
        if(window.confirm("Are you sure? This action cannot be undone!")) {
            deleteTransaction($(this).attr("data-id")).then(function(response) {
                displayTransactions();
            });
        }
    });
});
