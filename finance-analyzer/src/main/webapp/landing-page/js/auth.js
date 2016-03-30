$(document).ready(function() {
    "use strict";

    var LOGIN_REDIRECT = "http://localhost:8080/finance-analyzer/page.html#dashboard"
    
    var modal_register = $("#modal-register");
    var register_submit = modal_register.find('button[type="submit"]');
    register_submit.on('click', function(e) {
        var user = {
            username: $("#form-register-username").val(),
            email: $("#form-register-email").val(),
            password: $("#form-register-password").val()
        };
        registerUser(user);
        e.preventDefault();
    });

    var ENDPOINT = "http://localhost:8080/finance-analyzer/rest/users/";

    function registerUser(user) {
        $.ajax(ENDPOINT + "register", {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
            dataType: "json"
        }).then(function(response) {
            window.location.replace(LOGIN_REDIRECT);
        });
    }

    // Log in below

    var modal_login = $("#modal-login");
    var login_submit = modal_login.find('button[type="submit"]');
    login_submit.on('click', function(e) {
        var user = {
            username: $("#form-login-username").val(),
            email: $("#form-login-email").val(),
            password: $("#form-login-password").val()
        };
        logInUser(user);
        e.preventDefault();
    });

    //var ENDPOINT = "http://localhost:8080/finance-analyzer/rest/users/authenticate"; // to be implemented

    function logInUser(user) {
    	authenticateUser(user)
        if(true) { // TODO if successfully authenticated
            //window.location.replace(LOGIN_REDIRECT);
        }
    }
    
    function authenticateUser(user) {
        $.ajax(ENDPOINT + "/authenticate", {
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
            dataType: "json"
        }).then(function(response) {
            window.location.replace(LOGIN_REDIRECT);
        });
    }
});
