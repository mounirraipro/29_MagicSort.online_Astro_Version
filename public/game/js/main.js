////////////////////////////////////////////////////////////
// MAIN
////////////////////////////////////////////////////////////
var stageW = 900;
var stageH = 1200;
var contentW = stageW;
var contentH = stageH;

var viewport = {
    isLandscape: false
};
var landscapeSize = {
    w: 1280,
    h: 768,
    cW: 1024,
    cH: 576
};
var portraitSize = {
    w: 900,
    h: 1200,
    cW: 900,
    cH: 1200
};

/*!
 * 
 * START BUILD GAME - This is the function that runs build game
 * 
 */
function initMain() {
    if (!$.browser.mobile || !isTablet) {
        $('#canvasHolder').show();
    }

    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    if (typeof buildScoreBoardCanvas == 'function') {
        buildScoreBoardCanvas();
    }

    if ($.editor.enable) {
        loadEditPage();
        goPage('game');
    } else {
        retrieveLevelData();
        var incomingChallenge = FriendChallenge.loadFromLocation(levelSettings.length);
        if (incomingChallenge) {
            DailyChallenge.deactivate();
            gameData.type = 'friend';
            gameData.levelNum = incomingChallenge.levelIndex;
            goPage('game');
        } else {
            goPage('main');
        }
    }

    checkMobileOrientation();
    resizeCanvas();
}

var windowW = windowH = 0;
var scalePercent = 0;
var offset = {
    x: 0,
    y: 0,
    left: 0,
    top: 0
};

/*!
 * 
 * GAME RESIZE - This is the function that runs to resize and centralize the game
 * 
 */
function resizeGameFunc() {
    setTimeout(function() {
        if (!$.editor.enable) {
            var holder = document.getElementById('mainHolder');
            var layout = GameplayLayout.fitCanvas(holder.clientWidth, holder.clientHeight, stageW, stageH);
            windowW = holder.clientWidth;
            windowH = holder.clientHeight;
            scalePercent = layout.scale;
            offset.x = offset.y = 0;
            offset.left = layout.left * 2;
            offset.top = layout.top * 2;
            $('#gameCanvas').css({ width: layout.width, height: layout.height, left: layout.left, top: layout.top });
            var interfaceLayout = GameplayLayout.fitInterface(windowW, windowH);
            $('#uiLayer').css({ width: interfaceLayout.width, height: interfaceLayout.height, transform: 'scale(' + interfaceLayout.scale + ')', transformOrigin: 'top left' });
            resizeCanvas();
            return;
        }
        $('.mobileRotate').css('left', checkContentWidth($('.mobileRotate')));
        $('.mobileRotate').css('top', checkContentHeight($('.mobileRotate')));

        windowW = window.innerWidth;
        windowH = window.innerHeight;

        scalePercent = windowW / contentW;
        if ((contentH * scalePercent) > windowH) {
            scalePercent = windowH / contentH;
        }

        scalePercent = scalePercent > 1 ? 1 : scalePercent;

        if (windowW > stageW && windowH > stageH) {
            if (windowW > stageW) {
                scalePercent = windowW / stageW;
                if ((stageH * scalePercent) > windowH) {
                    scalePercent = windowH / stageH;
                }
            }
        }

        var newCanvasW = ((stageW) * scalePercent);
        var newCanvasH = ((stageH) * scalePercent);

        offset.left = 0;
        offset.top = 0;

        if (newCanvasW > windowW) {
            offset.left = -((newCanvasW) - windowW);
        } else {
            offset.left = windowW - (newCanvasW);
        }

        if (newCanvasH > windowH) {
            offset.top = -((newCanvasH) - windowH);
        } else {
            offset.top = windowH - (newCanvasH);
        }

        offset.x = 0;
        offset.y = 0;

        if (offset.left < 0) {
            offset.x = Math.abs((offset.left / scalePercent) / 2);
        }
        if (offset.top < 0) {
            offset.y = Math.abs((offset.top / scalePercent) / 2);
        }

        $('canvas').css('width', newCanvasW);
        $('canvas').css('height', newCanvasH);

        $('canvas').css('left', (offset.left / 2));
        $('canvas').css('top', (offset.top / 2));

        $(window).scrollTop(0);

        resizeCanvas();
        if (typeof resizeScore == 'function') {
            resizeScore();
        }
    }, 100);
}
