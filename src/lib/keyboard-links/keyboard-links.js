/*  Keyboard links - Start */
var KBIntervalID = 0;
$(document).on(":passagerender", function (ev) {
    clearInterval(KBIntervalID);
    UpdateLinks(ev.content);
    // Search passages for links every 300ms, just in case they get updated, and marks them for key clicks
    KBIntervalID = setInterval(UpdateLinks, 300);
});
// Adds key shortcut indicators to links in passage if there are less than 11 links in the passsage.
function UpdateLinks(Container) {
    // Enables keyboard shortcuts on passages that do not have the "DisableKeyLinks" tag
    if (!tags().includes("DisableKeyLinks")) {
        var Links, i;
        if (typeof Container === "undefined") {
            Container = document;
            Links = $("#passages a").toArray();
        } else {
            Links = $(Container).find("a").toArray();
        }
        if (Links.length > 0) {
            for (i = 0; i < Links.length; i++) {
                if ((Links[i].getAttribute("data-nokey") === "true") || (Links[i].parentElement.getAttribute("data-nokey") === "true")) {
                    Links.deleteAt(i);
                    i--;
                }
            }
        }
        var n = 1;
        for (i = 0; i < Links.length; i++) {
            if (!Links[i].id.includes("Link")) {
                while ($(Container).find("#Link" + n).length) {
                    ++n;
                    if (n > 10) {
                        break;
                    }
                }
                if (n < 10) {
                    $("<sup>" + n + "</sup>").appendTo(Links[i]);
                    Links[i].id = "Link" + n;
                } else if (n === 10) {
                    $("<sup>[0]</sup>").appendTo(Links[i]);
                    Links[i].id = "Link0";
                    break;
                } else {
                    break;
                }
            }
        }
    }
};
$(document).on("keyup", function (e) {
    // Enables keyboard shortcuts on passages that do not have the "DisableKeyLinks" tag
    if (!tags().includes("DisableKeyLinks")) {
        // Trigger next link click on right arrow key or "1" (normal and numpad)
        if (((e.key === "ArrowRight") || (e.keyCode === 49) || (e.keyCode === 97)) && $("#NextLink")) {
            if ((!tags().includes("IgnoreArrowKeys")) || ((e.key != "ArrowRight"))) {
                e.preventDefault();
                $("#NextLink").click();
            }
        }
        // Trigger link click on keys "0" through "9"
        if ((e.keyCode > 47) && (e.keyCode < 58)) {
            if ($("#Link" + (e.keyCode - 48))) {
                e.preventDefault();
                $("#Link" + (e.keyCode - 48)).click();
            }
        }
        // Trigger link click on numpad keys "0" through "9"
        if ((e.keyCode > 95) && (e.keyCode < 106)) {
            if ($("#Link" + (e.keyCode - 96))) {
                e.preventDefault();
                $("#Link" + (e.keyCode - 96)).click();
            }
        }
        // Trigger random click on "." key
        if (e.key === ".") {
            e.preventDefault();
            var Links = $("#passages a");
            if (Links.length > 0) {
                Links[Math.floor(Math.random() * Links.length)].click();
            }
        }
        // Trigger back click on left arrow key or backquote
        if ((e.key === "ArrowLeft") || (e.keyCode === 192)) {
            if ((!tags().includes("IgnoreArrowKeys")) || ((e.key != "ArrowLeft"))) {
                e.preventDefault();
                Engine.backward();
            }
        }
    }
});
/* Keyboard links - End */