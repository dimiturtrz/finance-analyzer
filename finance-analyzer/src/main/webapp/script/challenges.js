$(document).ready(function() {
    "use strict";

    var add_challenge_button = $("button#add-challenge-button");
    var challenge_panel = $("#challenge-form-panel");
    var challenge_submit_button = $("#challenge-submit");

    var challenge_panel_close = $("#challenge-panel-close");
    challenge_panel_close.on('click', function() {
        add_challenge_button.show();
        challenge_panel.hide();
        clearInputs();
    });

    function clearInputs() {
        declaration_input.val("");
        since_input.val("");
        deadline_input.val("");
        value_input.val("");
        lessThanInput.val("");
    }
    
    challenge_panel.hide();

    add_challenge_button.on('click', function() {
        challenge_panel.show();
        add_challenge_button.hide();
        challenge_panel.find('.panel-heading').text("Add challenge");
    });

    challenge_submit_button.on('click', function() {
        var btn_text = challenge_submit_button.text();
        if(btn_text === "Add") {
            create_challenge();
            add_challenge_button.show();
            challenge_panel.hide();
        } else if(btn_text === "Save") {
            updateChallenge(challenge_panel.attr("data-id"));
            challenge_panel.hide();
            add_challenge_button.show();
        }
    });

    var ENDPOINT = "http://localhost:8080/finance-analyzer/rest/challenges";
    // var ENDPOINT = "http://localhost:3000/challenges";

    var declaration_input = $("#challenge-declaration-input");
    var since_input = $("#challenge-since-input");
    var deadline_input = $("#challenge-deadline-input");
    var value_input = $("#challenge-value-input");
    var lessThanInput = $("#challenge-less-than-input");

    since_input.datepicker();
    deadline_input.datepicker();

    function getLessThanValue() {
        var value = $("#challenge-less-than-input").find('input[type=radio]:checked').attr('value');
        if(value == "less-than")
            return true;
        else
            return false;
    }

    function buildChallengeFromInputs() {
        return {
            declaration: declaration_input.val(),
            since: since_input.val(),
            deadline: deadline_input.val(),
            challengeParameter: {
                less_than: getLessThanValue(),
                value: value_input.val()
            }
        };
    }

    function create_challenge() {
        var challenge = buildChallengeFromInputs();
        challenge.status = "in-progress";
        challenge.progress = 0.0;

        $.ajax(ENDPOINT, {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(challenge),
            dataType: "json"
        }).then(function(response) {
            displayChallenges();
        });
    }

    function listChallenges() {
        return $.ajax(ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }

    var challenges_table = $("#challenges-table");

    function clearTable() {
        challenges_table.children('tbody').empty();
    }

    function addChallengeToTable(challenge) {
        challenges_table.children('tbody').append(
            $("<tr></tr>")
                .append($("<td></td>").text(challenge.id))
                .append($("<td></td>").text(challenge.declaration))
                .append($("<td></td>").text(challenge.challengeParameter.value))
                .append($("<td></td>").text(challenge.challengeParameter.lessThan))
                .append($("<td></td>").text(challenge.since))
                .append($("<td></td>").text(challenge.deadline))
                .append($("<td></td>").text(challenge.status))
                .append($("<td></td>").text(challenge.progress))
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-primary challenge-edit-btn\">Edit</button>")))
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-danger challenge-delete-btn\">Delete</button>").attr("data-id", challenge.id)))
        );
    }

    function displayChallenges() {
        listChallenges().then(function(response) {
            clearTable();
            $(response).each(function(index, obj) {
                addChallengeToTable(obj);
            });
        });
    }

    displayChallenges();

    function readChallenge(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "GET",
            dataType: "json"
        });
    }

    function updateChallenge(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(buildChallengeFromInputs()),
            dataType: "json"
        });
    }

    function editChallenge(id) {
        add_challenge_button.hide();
        challenge_panel.attr("data-id", id);
        challenge_panel.show();
        challenge_panel.find('.panel-heading').text("Edit challenge");
        challenge_panel.find('#challenge-submit').text("Save");

        readChallenge(id).then(function(response) {
            declaration_input.val(response.declaration);
            since_input.val(response.since);
            deadline_input.val(response.deadline);
            value_input.val(response.challengeParameter.value);
            if(response.challengeParameter.lessThan == true) {
                $("#challenge-less-than-input").find('input[type=radio][value=less-than]').parent().addClass("checked");
                $("#challenge-less-than-input").find('input[type=radio][value=more-than]').parent().removeClass("checked");
            } else {
                $("#challenge-less-than-input").find('input[type=radio][value=less-than]').parent().removeClass("checked");
                $("#challenge-less-than-input").find('input[type=radio][value=more-than]').parent().addClass("checked");
            }
        });
    }

    $("tbody").on('click', '.challenge-edit-btn', function() {
        editChallenge($(this).closest('tr').children('td').first().text())
    })

    function deleteChallenge(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "DELETE"
        });
    }

    $("tbody").on('click', '.challenge-delete-btn', function() {
        if(window.confirm("Are you sure? This action cannot be undone!")) {
            deleteChallenge($(this).attr("data-id")).then(function(response) {
                displayChallenges();
            });
        }
    });
});
