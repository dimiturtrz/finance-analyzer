$(document).ready(function() {
    "use strict";
    
    var ENDPOINT = "http://localhost:8080/finance-analyzer/rest/users";

    var editBtn = $("#edit-btn");
    var updateBtn = $("#update-btn");
    var cancelBtn = $("#cancel-btn");

    var username = $(".topbar-user").find("span.hidden-xs");

    var CURRENT_USER_URL = "http://localhost:8080/finance-analyzer/rest/auth/current-user";

    function getCurrentUser() {
        return $.ajax(CURRENT_USER_URL, {
            method: "GET",
            dataType: "json"
        });
    };

    (function() {
        displayShow();
    })();

    function displayShow() {
        editBtn.show();
        updateBtn.hide();
        cancelBtn.hide();

        initUserShowInfo();
    }

    function initUserShowInfo() {
        getCurrentUser().then(function(user) {
            $("#username-value").text(user.username);
            $("#email-value").text(user.email);
            username.text(user.username);
        });
    }

    function displayEdit() {
        editBtn.hide();
        updateBtn.show();
        cancelBtn.show();

        initUserEditInfo();
    }

    function initUserEditInfo() {
        getCurrentUser().then(function(user) {
            $("#username-value").val(user.username);
            $("#email-value").val(user.email);
        });
    }

    editBtn.on('click', function() {
        replaceSpansWithInputs();
        displayEdit();
    });

    function replaceSpansWithInputs() {
        $(".value-container").each(function(index, container) {
            $(container).html(getInputs()[index]);
        });
    }

    var inputs = [];
    function getInputs() {
        if(inputs.length == 0) {
            inputs.push($("<input>", {id: 'username-value', class: 'form-control'}));
            inputs.push($("<input>", {id: 'email-value', class: 'form-control'}));
        }

        return inputs;
    }

    cancelBtn.on('click', function() {
        replaceInputsWithSpans();
        displayShow();
    });

    function replaceInputsWithSpans() {
        $(".value-container").each(function(index, container) {
            $(container).html(spanContainers[index]);
        });
    }

    var spanContainers = $(".value-container").clone().map(function() {
        return $(this).html();
    });

    updateBtn.on('click', function() {
        var user = {
            username: $("#username-value").val(),
            email: $("#email-value").val()
        };

        updateUser(user).then(function() {
            replaceInputsWithSpans();
            displayShow();
        });
    });

    function updateUser(user) {
        getCurrentUser().then(function(user) {
            var id = user.id;
            return $.ajax(ENDPOINT + "/" + id, {
                method: "PUT",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(user),
                dataType: "json"
            });
        });
    }

    var LOGOUT_URL = "http://localhost:8080/finance-analyzer/rest/auth/logout";
    var LOGOUT_REDIRECT = "http://localhost:8080/finance-analyzer/landing-page/index.html"

    function logout() {
        return $.ajax(LOGOUT_URL, {
            method: "DELETE"
        });
    }

    $("#logout-button").on('click', function() {
        logout().then(function() {
            window.location.replace(LOGOUT_REDIRECT);
        });
    });
});