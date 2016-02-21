$(document).ready(function() {
    "use strict";

    var ENDPOINT = "http://localhost:3000/users";

    function listUsers() {
        return $.ajax(ENDPOINT, {
            method: "GET",
            dataType: "json"
        });
    }

    var users_table = $("#users-table");

    function clearTable() {
        users_table.children('tbody').empty();
    }

    function addUserToTable(user) {
        users_table.children('tbody').append(
            $("<tr></tr>")
                .append($("<td></td>").text(user.id))
                .append($("<td></td>").text(user.username))
                .append($("<td></td>").text(user.email))
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-primary view-profile-btn\">View profile</button>").attr("data-id", user.id)))
                .append($("<td></td>")
                                    .append($("<button class=\"btn btn-danger user-delete-btn\">Delete</button>").attr("data-id", user.id)))
        );
    }

    function displayUsers() {
        listUsers().then(function(response) {
            clearTable();
            $(response).each(function(index, obj) {
                addUserToTable(obj);
            });
        });
    }

    displayUsers();

    function readUser(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "GET",
            dataType: "json"
        });
    }

    function deleteUser(id) {
        return $.ajax(ENDPOINT + "/" + id, {
            method: "DELETE"
        });
    }

    $("tbody").on('click', '.user-delete-btn', function() {
        if(window.confirm("Are you sure? This action cannot be undone!")) {
            deleteUser($(this).attr("data-id")).then(function(response) {
                displayUsers();
            });
        }
    });

    $("tbody").on('click', '.view-profile-btn', function() {
        // alert("http://localhost:");
        // window.location.replace("file:///home/stamaniorec/repos/finance-analyzer/frontend/page.html#dashboard"); 
        alert("Redirect to user profile page with id " + $(this).attr("data-id"));
    });
});
