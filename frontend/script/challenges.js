$(document).ready(function() {
    "use strict";

    var add_challenge_button = $("button#add-challenge-button");
    var challenge_panel = $("#challenge-form-panel");
    var challenge_submit_button = $("#challenge-submit");

    var challenge_panel_close = $("#challenge-panel-close");
    challenge_panel_close.on('click', function() {
        add_challenge_button.show();
        challenge_panel.hide();
    });
    
    challenge_panel.hide();

    add_challenge_button.on('click', function() {
        challenge_panel.show();
        add_challenge_button.hide();
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

    var ENDPOINT = "http://localhost:3000/challenges";

    var declaration_input = $("#challenge-declaration-input");

    function buildChallengeFromInputs() {
        return {
            declaration: declaration_input.val()
        };
    }

    function create_challenge() {
        $.ajax(ENDPOINT, {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(buildChallengeFromInputs()),
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
