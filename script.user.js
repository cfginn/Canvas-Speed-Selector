// ==UserScript==
// @name         Speed Selector for Canvas
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Caleb Ginn
// @match        https://iad.scorm.canvaslms.com/RusticiEngine/defaultui/player/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        GM_addStyle
// @run-at document-end
// ==/UserScript==

/*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/
var zNode = document.createElement ('div');
zNode.innerHTML = '<select id="speeds">'
                + '<option value="1">1</option>'
                + '<option value="1.25">1.25</option>'
                + '<option value="1.5">1.5</option>'
                + '<option value="1.75">1.75</option>'
                + '<option value="2">2</option>'
                + '<option value="0.5">0.5</option>'
                + '<option value="0.75">0.75</option>'
                + '</select>;'
                + '<button id="myButton" type="button">'
                + 'Set Speed</button>'
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    let speed = document.getElementById("speeds");
    let value = speed.value

    for (const iframe of document.getElementsByTagName("iframe")) {
        try {
            iframe.contentDocument.getElementsByTagName("video")[0].playbackRate = value
        }
        catch {
        }
    }

    for (const video of document.getElementsByTagName("video")) {
        try {
            video.playbackRate = value
        }
        catch {
        }
    }
}
//--- Style our newly added elements using CSS.
GM_addStyle ( `
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              14px;
        background:             maroon;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                1100;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
` );
