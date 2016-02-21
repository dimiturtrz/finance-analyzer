$(document).ready(function() {
    "use strict";

    function showPanel(panelName) {
        var ALL_PANELS = ["dashboard-panel", "transactions-panel", "challenges-panel", "users-panel"];
        var panels = $("div[class=page-panel]");
        var target = panels.filter("[id=" + panelName + "]");
        panels.hide();
        target.show();
    }

    var sidemenu_items = $("ul#side-menu li");

    function capitalize(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    function switchPanel(hash_url_value) {
        showPanel(hash_url_value + "-panel");

        sidemenu_items.removeClass("active");
        sidemenu_items.filter(function() {
            return $(this).find('span.menu-title').text() === capitalize(hash_url_value);
        }).addClass("active");
    }

    function extractHashFromURL() {
        return window.location.hash.replace('#', '');
    }

    $(window).on('hashchange', function() {
        switchPanel(extractHashFromURL());
    });

    (function() {
        if(window.location.hash) {
            switchPanel(extractHashFromURL());
        } else {
            showPanel("dashboard-panel");
        }
    })();
});
