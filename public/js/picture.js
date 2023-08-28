/*global window, Sketchpad, WebSocket, Colorpalette*/

function initSketchpad() {
    "use strict";


    var sketchpad = new Sketchpad({
        containerEl: document.getElementById("sketchpad"),
        createPageConfig: {
            no: 1,
	        backgroundImage: "https://ci.incrediquest.com/sketchpad-client/images/CodeBreaker.png",
            //foregroundImage: "https://ci.incrediquest.com/sketchpad-client/images/CodeBreaker-fg.png",
            //backgroundImage: "https://ci.incrediquest.com/sketchpad-client/images/background.jpg",
            //foregroundImage: "https://ci.incrediquest.com/sketchpad-client/images/foreground.png"
        }
    });

    // avaliable tools `src/sketchpad.tool.*.js`, ex. "pen", "colouring", "line", "rect", "circ"...
    var toolId = "custom";
    var tool = sketchpad.setTool(toolId).getCurrentTool();
    console.log("Selected tool:", tool);

    //color
    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) {
        sketchpad.setTool(toolId).getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    }).setColor(tool.setColor(255, 0, 0, 1).getColor());

    //size
    document.getElementById("size").addEventListener("change", function (e) {
        sketchpad.getCurrentTool().setSize(e.target.value);
    });
    document.getElementById("size").value = tool.setSize(2).getSize();

    //rubber
    document.getElementById('eraser').addEventListener("click", function () {
        sketchpad.setTool("eraser");
    });

    document.getElementById("clearButton").addEventListener("click", function(e) {
      sketchpad.reset();
      sketchpad.clearCanvas();
    });

    //objects visible in developer console
    window.sketchpad = sketchpad;
    window.colorpalette = colorpalette;
    window.tool = tool;

}
initSketchpad();


