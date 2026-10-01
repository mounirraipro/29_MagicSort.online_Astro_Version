(function (window) {
    "use strict";

    function fitCanvas(width, height, stageWidth, stageHeight) {
        var scale = Math.min(width / stageWidth, height / stageHeight);
        return {
            scale: scale,
            width: stageWidth * scale,
            height: stageHeight * scale,
            left: (width - stageWidth * scale) / 2,
            top: (height - stageHeight * scale) / 2,
        };
    }

    function fitInterface(width, height) {
        var interfaceWidth = Math.max(300, width);
        var scale = width / interfaceWidth;
        return { width: interfaceWidth, height: height / scale, scale: scale };
    }

    function fitBoard(bounds, width, height) {
        // Reserve room for the lifted vial and its tilted pour, not only resting tubes.
        var scale = Math.min(
            1.35,
            bounds.width / (width + 100),
            bounds.height / (height + 120),
        );
        return {
            x: bounds.x + bounds.width / 2,
            y: bounds.y + bounds.height / 2 + 24 * scale,
            scale: scale,
        };
    }

    function positionBoard(
        container,
        width,
        height,
        canvasWidth,
        canvasHeight,
    ) {
        var board = document.getElementById("htmlBoardSpace");
        var canvas = document.getElementById("gameCanvas");
        if (!board || !canvas) return null;
        var boardRect = board.getBoundingClientRect();
        var canvasRect = canvas.getBoundingClientRect();
        if (!canvasRect.width || !canvasRect.height) return null;
        var layout = fitBoard(
            {
                x:
                    ((boardRect.left - canvasRect.left) * canvasWidth) /
                    canvasRect.width,
                y:
                    ((boardRect.top - canvasRect.top) * canvasHeight) /
                    canvasRect.height,
                width: (boardRect.width * canvasWidth) / canvasRect.width,
                height: (boardRect.height * canvasHeight) / canvasRect.height,
            },
            width,
            height,
        );
        container.x = layout.x;
        container.y = layout.y;
        container.scaleX = container.scaleY = layout.scale;
        return layout;
    }

    window.GameplayLayout = {
        fitCanvas: fitCanvas,
        fitInterface: fitInterface,
        fitBoard: fitBoard,
        positionBoard: positionBoard,
    };
})(window);
