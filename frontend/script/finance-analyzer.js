$(document).ready(function() {
    "use strict";

    function showPanel(panelName) {
        var ALL_PANELS = ["dashboard-panel", "transactions-panel", "challenges-panel", "users-panel"];
        var panels = $("div[class=page-panel]");
        var target = panels.filter("[id=" + panelName + "]");
        panels.hide();
        target.show();
    }

    showPanel("dashboard-panel");

    var sidemenu_items = $("ul#side-menu li");

    sidemenu_items.on('click', function() {
        var clicked = $(this).find("span.menu-title").text();
        var panelName = clicked.toLowerCase() + "-panel";
        showPanel(panelName);

        sidemenu_items.removeClass("active");
        $(this).addClass("active");
    });

    $("ul#side-menu li").on('hover', function() {
        $(this).css('cursor', 'pointer');
    });
});
