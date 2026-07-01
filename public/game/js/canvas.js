////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW = 0;
var canvasH = 0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w, h) {
    var gameCanvas = document.getElementById("gameCanvas");
    gameCanvas.width = w;
    gameCanvas.height = h;

    canvasW = w;
    canvasH = h;
    stage = new createjs.Stage("gameCanvas");

    createjs.Touch.enable(stage);
    stage.enableMouseOver(20);
    stage.mouseMoveOutside = true;

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}

var guide = false;
var canvasContainer, mainContainer, gameContainer, resultContainer, confirmContainer;
var guideline, bg, logo, buttonOk, result, shadowResult, buttonReplay, buttonFacebook, buttonTwitter, buttonWhatsapp, buttonFullscreen, buttonSoundOn, buttonSoundOff;
var bgP, logoP, themeBackdrop, themeBackgroundBitmap, themeShade, themeGlowLeft, themeGlowRight, bgDecor, heroPanel, buttonPanel, titleUnderline, startButtonCard, levelsButtonCard, startButtonLabel, levelsButtonLabel, startButtonSub, levelsButtonSub, cozyTitleTxt, resultCard, confirmCard;

$.tubes = {};
$.level = {};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas() {
    canvasContainer = new createjs.Container();
    mainContainer = new createjs.Container();
    levelContainer = new createjs.Container();
    selectContainer = new createjs.Container();
    editContainer = new createjs.Container();
    editAllContainer = new createjs.Container();
    gameContainer = new createjs.Container();
    levelDisplayContainer = new createjs.Container();
    timerContainer = new createjs.Container();
    statusContainer = new createjs.Container();
    waterContainer = new createjs.Container();
    resultContainer = new createjs.Container();
    confirmContainer = new createjs.Container();


    bg = new createjs.Shape();
    bgP = new createjs.Shape();

    logo = new createjs.Container();
    logoP = new createjs.Container();

    themeBackdrop = new createjs.Shape();
    themeBackgroundBitmap = new createjs.Bitmap(loader.getResult('magicTableBg'));
    themeShade = new createjs.Shape();
    themeGlowLeft = new createjs.Shape();
    themeGlowRight = new createjs.Shape();
    bgDecor = new createjs.Container();
    heroPanel = new createjs.Shape();
    buttonPanel = new createjs.Shape();
    titleUnderline = new createjs.Shape();
    startButtonCard = new createjs.Shape();
    levelsButtonCard = new createjs.Shape();
    resultCard = new createjs.Shape();
    confirmCard = new createjs.Shape();
    resultCard.visible = false;
    confirmCard.visible = false;

    cozyTitleTxt = new createjs.Text();
    cozyTitleTxt.font = "78px comicyregular";
    cozyTitleTxt.color = '#34205C';
    cozyTitleTxt.textAlign = "center";
    cozyTitleTxt.textBaseline = 'alphabetic';
    cozyTitleTxt.text = 'Magic Sort';

    buttonStart = createActionButton('Start Game', 'Begin a calm color run', 184, 74, '#F6EEFF', '#A855F7');
    buttonLevels = createActionButton('Level Select', 'Pick any unlocked stage', 184, 74, '#EEE2FF', '#C084FC');
    heroPanel.visible = false;
    buttonPanel.visible = false;
    titleUnderline.visible = false;
    buttonStart.visible = false;
    buttonLevels.visible = false;
    cozyTitleTxt.visible = false;

    //levels
    //level
    var levelData = {
        sX: 0,
        sY: 0,
        x: 0,
        y: 0,
        space: 5,
        size: 80,
        count: 0
    };
    var totalW = (selectData.column - 1) * levelData.size;
    totalW += (selectData.column - 1) * levelData.space;
    var totalH = (selectData.row - 1) * levelData.size;
    totalH += (selectData.row - 1) * levelData.space;

    levelData.sX = -(totalW / 2);
    levelData.sY = -(totalH / 2);
    levelData.y = levelData.sY;

    for (var r = 0; r < selectData.row; r++) {
        levelData.x = levelData.sX;
        for (var c = 0; c < selectData.column; c++) {
            $.level[r + '_' + c] = createLevelTile(false);
            $.level[r + '_' + c].x = levelData.x;
            $.level[r + '_' + c].y = levelData.y;

            $.level[r + '_unlock_' + c] = createLevelTile(true);
            $.level[r + '_unlock_' + c].x = levelData.x;
            $.level[r + '_unlock_' + c].y = levelData.y;

            $.level[r + '_text_' + c] = $.level[r + '_unlock_' + c].text;

            levelContainer.addChild($.level[r + '_' + c], $.level[r + '_unlock_' + c]);

            levelData.x += levelData.size + levelData.space;
            levelData.count++;
        }
        levelData.y += levelData.size + levelData.space;
    }

    selectLevelTitleTxt = new createjs.Text();
    selectLevelTitleTxt.font = "45px comicyregular";
    selectLevelTitleTxt.color = '#34205C';
    selectLevelTitleTxt.textAlign = "center";
    selectLevelTitleTxt.textBaseline = 'alphabetic';
    selectLevelTitleTxt.text = textDisplay.selectLevel;
    selectLevelTitleTxt.visible = false;

    buttonLevelArrowL = createMiniButton('<', 58, 52, '#F0E7FF', '#C084FC');
    buttonLevelArrowR = createMiniButton('>', 58, 52, '#F0E7FF', '#C084FC');
    buttonBack = createActionButton('Back', 'Return home', 152, 62, '#F4EAFF', '#A78BFA');
    buttonLevelArrowL.visible = false;
    buttonLevelArrowR.visible = false;
    buttonBack.visible = false;

    levelContainer.addChild(selectLevelTitleTxt, buttonLevelArrowL, buttonLevelArrowR, buttonBack);

    //select
    selectTubeTitleTxt = new createjs.Text();
    selectTubeTitleTxt.font = "45px comicyregular";
    selectTubeTitleTxt.color = '#34205C';
    selectTubeTitleTxt.textAlign = "center";
    selectTubeTitleTxt.textBaseline = 'alphabetic';
    selectTubeTitleTxt.text = textDisplay.selectTube;
    selectTubeTitleTxt.visible = false;

    buttonSelect = createActionButton('Play Stage', 'Use this tube set', 184, 74, '#F6EEFF', '#A855F7');
    buttonArrowL = createMiniButton('<', 58, 52, '#F0E7FF', '#C084FC');
    buttonArrowR = createMiniButton('>', 58, 52, '#F0E7FF', '#C084FC');
    buttonSelect.visible = false;
    buttonArrowL.visible = false;
    buttonArrowR.visible = false;

    selectContainer.addChild(selectTubeTitleTxt, buttonSelect, buttonArrowL, buttonArrowR);

    //game
    timerShapeBg = new createjs.Shape();
    timerShape = new createjs.Shape();
    timerContainer.addChild(timerShapeBg, timerShape);

    levelTxt = new createjs.Text();
    levelTxt.font = "35px comicyregular";
    levelTxt.color = '#34205C';
    levelTxt.textAlign = "center";
    levelTxt.textBaseline = 'alphabetic';
    levelTxt.text = '00:00';
    levelTxt.y = 20;

    levelDisplayContainer.addChild(levelTxt);

    statusTxt = new createjs.Text();
    statusTxt.font = "45px comicyregular";
    statusTxt.color = '#D946EF';
    statusTxt.textAlign = "center";
    statusTxt.textBaseline = 'alphabetic';

    statusContainer.addChild(statusTxt);

    //result
    itemResult = new createjs.Shape();
    itemResultP = new createjs.Shape();

    buttonContinue = createActionButton('Continue', 'Keep sorting', 176, 70, '#F6EEFF', '#A855F7');
    buttonContinue.visible = false;

    resultShareTxt = new createjs.Text();
    resultShareTxt.font = "20px comicyregular";
    resultShareTxt.color = '#735C9E';
    resultShareTxt.textAlign = "center";
    resultShareTxt.textBaseline = 'alphabetic';
    resultShareTxt.text = textDisplay.share;
    resultShareTxt.visible = false;

    resultTitleTxt = new createjs.Text();
    resultTitleTxt.font = "45px comicyregular";
    resultTitleTxt.color = '#34205C';
    resultTitleTxt.textAlign = "center";
    resultTitleTxt.textBaseline = 'alphabetic';
    resultTitleTxt.text = textDisplay.resultTitle;
    resultTitleTxt.visible = false;

    resultlevelTxt = new createjs.Text();
    resultlevelTxt.font = "30px comicyregular";
    resultlevelTxt.color = '#735C9E';
    resultlevelTxt.textAlign = "center";
    resultlevelTxt.textBaseline = 'alphabetic';
    resultlevelTxt.text = '';

    resultDescTxt = new createjs.Text();
    resultDescTxt.font = "60px comicyregular";
    resultDescTxt.color = '#D946EF';
    resultDescTxt.textAlign = "center";
    resultDescTxt.textBaseline = 'alphabetic';
    resultDescTxt.text = '';
    resultDescTxt.visible = false;


    buttonFacebook = createShareButton('f', '#F0E7FF', '#C084FC');
    buttonTwitter = createShareButton('X', '#F0E7FF', '#C084FC');
    buttonWhatsapp = createShareButton('WA', '#F0E7FF', '#C084FC');

    buttonFullscreen = createMiniButton('FULL', 64, 48, '#F6EEFF', '#C084FC');
    buttonSoundOn = createMiniButton('SFX', 64, 48, '#E7DDFF', '#9B8AC5');
    buttonSoundOff = createMiniButton('MUTE', 64, 48, '#F6EEFF', '#FF4FB3');
    buttonSoundOn.visible = false;
    buttonMusicOn = createMiniButton('MUS', 64, 48, '#E7DDFF', '#9B8AC5');
    buttonMusicOff = createMiniButton('OFF', 64, 48, '#F6EEFF', '#FF4FB3');
    buttonMusicOn.visible = false;

    buttonExit = createMiniButton('QUIT', 64, 48, '#F6EEFF', '#FF4FB3');
    buttonSettings = createMiniButton('SET', 58, 44, '#F6EEFF', '#C084FC');
    buttonFullscreen.visible = false;
    buttonSoundOn.visible = false;
    buttonSoundOff.visible = false;
    buttonMusicOn.visible = false;
    buttonMusicOff.visible = false;
    buttonExit.visible = false;
    buttonSettings.visible = false;

    optionsContainer = new createjs.Container();
    optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
    optionsContainer.visible = false;

    //exit
    itemExit = new createjs.Shape();
    itemExitP = new createjs.Shape();

    buttonConfirm = createActionButton('Confirm', 'Leave this run', 172, 70, '#F6EEFF', '#FF4FB3');
    buttonCancel = createActionButton('Stay', 'Keep playing', 172, 70, '#EEE2FF', '#9B8AC5');
    buttonConfirm.visible = false;
    buttonCancel.visible = false;

    popTitleTxt = new createjs.Text();
    popTitleTxt.font = "45px comicyregular";
    popTitleTxt.color = "#34205C";
    popTitleTxt.textAlign = "center";
    popTitleTxt.textBaseline = 'alphabetic';
    popTitleTxt.text = textDisplay.exitTitle;
    popTitleTxt.visible = false;

    popDescTxt = new createjs.Text();
    popDescTxt.font = "30px comicyregular";
    popDescTxt.lineHeight = 35;
    popDescTxt.color = "#735C9E";
    popDescTxt.textAlign = "center";
    popDescTxt.textBaseline = 'alphabetic';
    popDescTxt.text = textDisplay.exitMessage;
    popDescTxt.visible = false;

    mainContainer.addChild(heroPanel, titleUnderline, buttonPanel, cozyTitleTxt, buttonStart, buttonLevels);
    confirmContainer.addChild(confirmCard, itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer.visible = false;

    if (guide) {
        guideline = new createjs.Shape();
        guideline.graphics.setStrokeStyle(2).beginStroke('red').drawRect((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }

    gameContainer.addChild(editContainer, levelDisplayContainer, timerContainer, statusContainer);
    resultContainer.addChild(resultCard, itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);

    if (shareEnable) {
        resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
    }

    canvasContainer.addChild(themeBackdrop, themeBackgroundBitmap, themeShade, themeGlowLeft, themeGlowRight, bgDecor, bg, bgP, mainContainer, levelContainer, waterContainer, selectContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage.addChild(canvasContainer);

    changeViewport(viewport.isLandscape);
    resizeGameFunc();
}

function drawCozyTheme() {
    var glowRadius = viewport.isLandscape ? 190 : 150;
    var heroW = viewport.isLandscape ? 560 : 408;
    var heroH = viewport.isLandscape ? 150 : 132;
    var heroX = (canvasW - heroW) / 2;
    var heroY = viewport.isLandscape ? 62 : 88;
    var buttonW = viewport.isLandscape ? 420 : 270;
    var buttonH = viewport.isLandscape ? 96 : 168;
    var buttonX = (canvasW - buttonW) / 2;
    var buttonY = viewport.isLandscape ? canvasH * .7 : canvasH * .62;
    var cardW = viewport.isLandscape ? 470 : 410;
    var cardH = viewport.isLandscape ? 250 : 280;
    var cardX = (canvasW - cardW) / 2;
    var resultY = viewport.isLandscape ? canvasH * .28 : canvasH * .32;
    var confirmY = viewport.isLandscape ? canvasH * .28 : canvasH * .32;

    themeBackdrop.graphics.clear();
    themeBackdrop.graphics.beginLinearGradientFill(["#2B063E", "#661278", "#DA8B12"], [0, .62, 1], 0, 0, 0, canvasH).drawRect(0, 0, canvasW, canvasH);

    coverThemeBackground();

    themeShade.graphics.clear();
    themeShade.graphics.beginLinearGradientFill(["rgba(23,5,35,0.34)", "rgba(23,5,35,0.05)", "rgba(255,184,44,0.1)"], [0, .55, 1], 0, 0, 0, canvasH).drawRect(0, 0, canvasW, canvasH);

    themeGlowLeft.graphics.clear();
    themeGlowLeft.graphics.beginRadialGradientFill(["rgba(255,212,91,0.42)", "rgba(255,212,91,0)"], [0, 1], 0, 0, 0, 0, 0, glowRadius).drawCircle(0, 0, glowRadius);
    themeGlowLeft.x = canvasW * .22;
    themeGlowLeft.y = canvasH * .78;

    themeGlowRight.graphics.clear();
    themeGlowRight.graphics.beginRadialGradientFill(["rgba(255,79,179,0.3)", "rgba(255,79,179,0)"], [0, 1], 0, 0, 0, 0, 0, glowRadius).drawCircle(0, 0, glowRadius);
    themeGlowRight.x = canvasW * .78;
    themeGlowRight.y = canvasH * .2;

    bgDecor.removeAllChildren();
    addDecorativeSpark(canvasW * .23, canvasH * .25, 10, "rgba(255, 224, 128, 0.55)");
    addDecorativeSpark(canvasW * .78, canvasH * .22, 9, "rgba(255, 224, 128, 0.5)");
    addDecorativeStar(canvasW * .5, canvasH * .14, 9, "rgba(255, 250, 255, 0.62)");

    heroPanel.graphics.clear();
    heroPanel.graphics.beginFill("rgba(43,6,62,0.68)").drawRoundRect(0, 0, heroW, heroH, 18);
    heroPanel.graphics.beginStroke("rgba(255,206,81,0.78)").setStrokeStyle(2).drawRoundRect(0, 0, heroW, heroH, 18);
    heroPanel.x = heroX;
    heroPanel.y = heroY;
    heroPanel.shadow = new createjs.Shadow("rgba(13,3,22,0.36)", 0, 12, 24);

    titleUnderline.graphics.clear();
    titleUnderline.graphics.setStrokeStyle(4, 'round').beginStroke("rgba(255,206,81,0.92)");
    titleUnderline.graphics.moveTo(-90, 0).quadraticCurveTo(0, viewport.isLandscape ? 20 : 16, 90, 0);
    titleUnderline.x = canvasW / 2;
    titleUnderline.y = heroY + (viewport.isLandscape ? 108 : 98);

    buttonPanel.graphics.clear();
    buttonPanel.graphics.beginFill("rgba(43,6,62,0.62)").drawRoundRect(0, 0, buttonW, buttonH, 18);
    buttonPanel.graphics.beginStroke("rgba(255,206,81,0.66)").setStrokeStyle(2).drawRoundRect(0, 0, buttonW, buttonH, 18);
    buttonPanel.x = buttonX;
    buttonPanel.y = buttonY;
    buttonPanel.shadow = new createjs.Shadow("rgba(13,3,22,0.28)", 0, 12, 22);

    cozyTitleTxt.font = viewport.isLandscape ? "82px comicyregular" : "58px comicyregular";
    cozyTitleTxt.color = "#FFEEC6";
    cozyTitleTxt.x = canvasW / 2;
    cozyTitleTxt.y = heroY + (viewport.isLandscape ? 90 : 80);
    cozyTitleTxt.shadow = new createjs.Shadow("rgba(43,6,62,0.72)", 0, 3, 5);

    resultCard.graphics.clear();
    resultCard.graphics.beginFill("rgba(43,6,62,0.72)").drawRoundRect(0, 0, cardW, cardH, 18);
    resultCard.graphics.beginStroke("rgba(255,206,81,0.7)").setStrokeStyle(2).drawRoundRect(0, 0, cardW, cardH, 18);
    resultCard.x = cardX;
    resultCard.y = resultY;
    resultCard.shadow = new createjs.Shadow("rgba(13,3,22,0.32)", 0, 10, 22);

    confirmCard.graphics.clear();
    confirmCard.graphics.beginFill("rgba(43,6,62,0.76)").drawRoundRect(0, 0, cardW, cardH, 18);
    confirmCard.graphics.beginStroke("rgba(255,206,81,0.7)").setStrokeStyle(2).drawRoundRect(0, 0, cardW, cardH, 18);
    confirmCard.x = cardX;
    confirmCard.y = confirmY;
    confirmCard.shadow = new createjs.Shadow("rgba(13,3,22,0.32)", 0, 10, 22);
}

function coverThemeBackground() {
    if (!themeBackgroundBitmap || !themeBackgroundBitmap.image) {
        return;
    }

    var imageW = themeBackgroundBitmap.image.width || themeBackgroundBitmap.image.naturalWidth;
    var imageH = themeBackgroundBitmap.image.height || themeBackgroundBitmap.image.naturalHeight;
    var scale = Math.max(canvasW / imageW, canvasH / imageH);

    themeBackgroundBitmap.scaleX = scale;
    themeBackgroundBitmap.scaleY = scale;
    themeBackgroundBitmap.x = (canvasW - (imageW * scale)) / 2;
    themeBackgroundBitmap.y = (canvasH - (imageH * scale)) / 2;
}

function addDecorativeBubble(x, y, radius, color) {
    var bubble = new createjs.Shape();
    bubble.graphics.beginFill(color).drawCircle(0, 0, radius);
    bubble.shadow = new createjs.Shadow("rgba(124, 58, 237, 0.12)", 0, 8, 14);
    bubble.x = x;
    bubble.y = y;
    bgDecor.addChild(bubble);
}

function addDecorativeSpark(x, y, size, color) {
    var spark = new createjs.Shape();
    spark.graphics.setStrokeStyle(3, 'round').beginStroke(color);
    spark.graphics.moveTo(-size, 0).lineTo(size, 0);
    spark.graphics.moveTo(0, -size).lineTo(0, size);
    spark.alpha = .7;
    spark.x = x;
    spark.y = y;
    bgDecor.addChild(spark);
}

function addDecorativeStar(x, y, size, color) {
    var star = new createjs.Shape();
    star.graphics.beginFill(color).drawPolyStar(0, 0, size, 4, .42, 45);
    star.alpha = .9;
    star.x = x;
    star.y = y;
    bgDecor.addChild(star);
}

function addDecorativeTube(x, y, scale, liquidTop, liquidBottom) {
    var tube = new createjs.Container();
    var glass = new createjs.Shape();
    var liquid = new createjs.Shape();
    var shine = new createjs.Shape();

    glass.graphics.setStrokeStyle(4, 'round', 'round').beginStroke("rgba(139, 92, 246, 0.82)").beginFill("rgba(255, 255, 255, 0.35)").drawRoundRect(-24, -90, 48, 120, 24);
    liquid.graphics.beginLinearGradientFill([liquidTop, liquidBottom], [0, 1], 0, -15, 0, 35).drawRoundRect(-18, -12, 36, 46, 16);
    shine.graphics.beginFill("rgba(255,255,255,0.45)").drawRoundRect(-12, -72, 8, 50, 5);

    tube.addChild(glass, liquid, shine);
    tube.scaleX = tube.scaleY = scale;
    tube.rotation = x < canvasW / 2 ? -8 : 9;
    tube.x = x;
    tube.y = y;
    tube.alpha = .8;
    tube.shadow = new createjs.Shadow("rgba(91, 33, 182, 0.12)", 0, 10, 18);
    bgDecor.addChild(tube);
}

function createActionButton(title, subtitle, width, height, fillColor, accentColor) {
    var button = new createjs.Container();
    var bg = new createjs.Shape();
    var stripe = new createjs.Shape();
    var titleTxt = new createjs.Text();
    var subTxt = new createjs.Text();

    bg.graphics.beginLinearGradientFill([fillColor, "#FFD76C"], [0, 1], 0, 0, 0, height).drawRoundRect(0, 0, width, height, 18);
    bg.graphics.beginStroke("rgba(255,238,198,0.88)").setStrokeStyle(2).drawRoundRect(0, 0, width, height, 18);
    stripe.graphics.beginFill(accentColor).drawRoundRect(12, 10, 10, height - 20, 5);

    titleTxt.font = (height <= 70 ? "27px comicyregular" : "31px comicyregular");
    titleTxt.color = '#3B113E';
    titleTxt.textAlign = 'center';
    titleTxt.textBaseline = 'alphabetic';
    titleTxt.text = title;
    titleTxt.x = width / 2 + 4;
    titleTxt.y = height <= 70 ? height / 2 - 2 : height / 2 - 4;

    subTxt.font = (height <= 70 ? "13px Arial" : "15px Arial");
    subTxt.color = '#6D3A12';
    subTxt.textAlign = 'center';
    subTxt.textBaseline = 'alphabetic';
    subTxt.text = subtitle;
    subTxt.x = width / 2 + 4;
    subTxt.y = height <= 70 ? height / 2 + 15 : height / 2 + 19;

    button.addChild(bg, stripe, titleTxt, subTxt);
    button.shadow = new createjs.Shadow("rgba(13,3,22,0.24)", 0, 6, 12);
    button.mouseChildren = false;
    button.cursor = 'pointer';
    button.setBounds(0, 0, width, height);
    button.regX = width / 2;
    button.regY = height / 2;
    button.label = titleTxt;
    button.subLabel = subTxt;
    return button;
}

function createMiniButton(label, width, height, fillColor, accentColor) {
    var button = new createjs.Container();
    var bg = new createjs.Shape();
    var dot = new createjs.Shape();
    var labelTxt = new createjs.Text();

    bg.graphics.beginFill(fillColor).drawRoundRect(0, 0, width, height, 14);
    bg.graphics.beginStroke("rgba(255,206,81,0.76)").setStrokeStyle(2).drawRoundRect(0, 0, width, height, 14);
    dot.graphics.beginFill(accentColor).drawCircle(0, 0, width > 60 ? 5 : 4);
    dot.x = width > 60 ? 14 : 11;
    dot.y = height / 2;

    labelTxt.font = width > 60 ? "14px comicyregular" : "24px comicyregular";
    labelTxt.color = '#3B113E';
    labelTxt.textAlign = 'center';
    labelTxt.textBaseline = 'middle';
    labelTxt.text = label;
    labelTxt.x = width / 2 + (width > 60 ? 5 : 0);
    labelTxt.y = height / 2;

    button.addChild(bg, dot, labelTxt);
    button.shadow = new createjs.Shadow("rgba(13,3,22,0.22)", 0, 4, 8);
    button.mouseChildren = false;
    button.cursor = 'pointer';
    button.setBounds(0, 0, width, height);
    button.regX = width / 2;
    button.regY = height / 2;
    button.label = labelTxt;
    return button;
}

function createShareButton(label, fillColor, accentColor) {
    var button = createMiniButton(label, 62, 52, fillColor, accentColor);
    button.label.font = label.length > 1 ? '16px comicyregular' : '24px comicyregular';
    button.label.x = label.length > 1 ? 35 : 31;
    return button;
}

function createLevelTile(unlocked) {
    var tile = new createjs.Container();
    var bg = new createjs.Shape();
    var glow = new createjs.Shape();
    var labelTxt = new createjs.Text();
    var width = 74;
    var height = 74;
    var fillColor = unlocked ? '#F6EEFF' : '#E5D9F8';
    var accentColor = unlocked ? '#A855F7' : '#BBA7E6';

    bg.graphics.beginFill(fillColor).drawRoundRect(0, 0, width, height, 12);
    bg.graphics.beginStroke("rgba(255,206,81,0.72)").setStrokeStyle(2).drawRoundRect(0, 0, width, height, 12);
    glow.graphics.beginFill(accentColor).drawRoundRect(12, 10, 10, height - 20, 5);

    labelTxt.font = '28px comicyregular';
    labelTxt.color = unlocked ? '#34205C' : '#8C78AC';
    labelTxt.textAlign = 'center';
    labelTxt.textBaseline = 'middle';
    labelTxt.text = '';
    labelTxt.x = width / 2 + 6;
    labelTxt.y = height / 2 + 2;

    tile.addChild(bg, glow, labelTxt);
    tile.shadow = unlocked ? new createjs.Shadow("rgba(124,58,237,0.12)", 0, 6, 12) : null;
    tile.mouseChildren = false;
    tile.setBounds(0, 0, width, height);
    tile.regX = width / 2;
    tile.regY = height / 2;
    tile.text = labelTxt;
    return tile;
}

function drawMenuButtonCard(shape, x, y, w, h, fillColor, accentColor) {
    shape.graphics.clear();
    shape.graphics.beginFill(fillColor).drawRoundRect(0, 0, w, h, 28);
    shape.graphics.beginStroke("rgba(139,92,246,0.88)").setStrokeStyle(2).drawRoundRect(0, 0, w, h, 28);
    shape.graphics.beginFill(accentColor).drawRoundRect(16, 14, 18, h - 28, 9);
    shape.x = x;
    shape.y = y;
    shape.cardW = w;
    shape.cardH = h;
    shape.shadow = new createjs.Shadow("rgba(124,58,237,0.12)", 0, 8, 16);
    shape.mouseEnabled = false;
}

function setMenuButtonHitArea(button, card) {
    if (!card.cardW || !card.cardH) {
        return;
    }
    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRoundRect(card.x - button.x, card.y - button.y, card.cardW, card.cardH, 28);
    button.hitArea = hit;
}

function changeViewport(isLandscape) {
    if (isLandscape) {
        //landscape
        stageW = landscapeSize.w;
        stageH = landscapeSize.h;
        contentW = landscapeSize.cW;
        contentH = landscapeSize.cH;
    } else {
        //portrait
        stageW = portraitSize.w;
        stageH = portraitSize.h;
        contentW = portraitSize.cW;
        contentH = portraitSize.cH;
    }

    gameCanvas.width = stageW;
    gameCanvas.height = stageH;

    canvasW = stageW;
    canvasH = stageH;

    changeCanvasViewport();
}

function changeCanvasViewport() {
    if (canvasContainer != undefined) {
        drawCozyTheme();

        if (viewport.isLandscape) {
            bg.visible = false;
            bgP.visible = false;
            logo.visible = false;
            logoP.visible = false;

            buttonStart.x = canvasW / 2 - 102;
            buttonStart.y = canvasH / 100 * 74;

            buttonLevels.x = canvasW / 2 + 102;
            buttonLevels.y = canvasH / 100 * 74;

            //select
            selectTubeTitleTxt.x = canvasW / 2;
            selectTubeTitleTxt.y = canvasH / 100 * 25;

            buttonSelect.x = canvasW / 2;
            buttonSelect.y = canvasH / 100 * 74;

            buttonArrowL.x = canvasW / 2 - 132;
            buttonArrowL.y = canvasH / 100 * 74;

            buttonArrowR.x = canvasW / 2 + 132;
            buttonArrowR.y = canvasH / 100 * 74;

            //game

            //result
            itemResult.visible = false;
            itemResultP.visible = false;

            buttonFacebook.x = canvasW / 100 * 45;
            buttonFacebook.y = canvasH / 100 * 57;
            buttonTwitter.x = canvasW / 2;
            buttonTwitter.y = canvasH / 100 * 57;
            buttonWhatsapp.x = canvasW / 100 * 55;
            buttonWhatsapp.y = canvasH / 100 * 57;

            buttonContinue.x = canvasW / 2;
            buttonContinue.y = canvasH / 100 * 67;

            resultShareTxt.x = canvasW / 2;
            resultShareTxt.y = canvasH / 100 * 53;

            resultTitleTxt.x = canvasW / 2;
            resultTitleTxt.y = canvasH / 100 * 40;

            resultDescTxt.x = canvasW / 2;
            resultDescTxt.y = canvasH / 100 * 49;

            //exit
            itemExit.visible = false;
            itemExitP.visible = false;

            buttonConfirm.x = (canvasW / 2) - 98;
            buttonConfirm.y = (canvasH / 100 * 66);

            buttonCancel.x = (canvasW / 2) + 98;
            buttonCancel.y = (canvasH / 100 * 66);

            popTitleTxt.x = canvasW / 2;
            popTitleTxt.y = canvasH / 100 * 40;

            popDescTxt.x = canvasW / 2;
            popDescTxt.y = canvasH / 100 * 46;

        } else {
            bg.visible = false;
            bgP.visible = false;
            logo.visible = false;
            logoP.visible = false;

            buttonStart.x = canvasW / 2;
            buttonStart.y = canvasH / 100 * 61;

            buttonLevels.x = canvasW / 2;
            buttonLevels.y = canvasH / 100 * 72;

            //select
            selectTubeTitleTxt.x = canvasW / 2;
            selectTubeTitleTxt.y = canvasH / 100 * 25;

            buttonSelect.x = canvasW / 2;
            buttonSelect.y = canvasH / 100 * 73;

            buttonArrowL.x = canvasW / 2 - 126;
            buttonArrowL.y = canvasH / 100 * 73;

            buttonArrowR.x = canvasW / 2 + 126;
            buttonArrowR.y = canvasH / 100 * 73;

            //game

            //result
            itemResult.visible = false;
            itemResultP.visible = false;

            buttonFacebook.x = canvasW / 100 * 40;
            buttonFacebook.y = canvasH / 100 * 55;
            buttonTwitter.x = canvasW / 2;
            buttonTwitter.y = canvasH / 100 * 55;
            buttonWhatsapp.x = canvasW / 100 * 60;
            buttonWhatsapp.y = canvasH / 100 * 55;

            buttonContinue.x = canvasW / 2;
            buttonContinue.y = canvasH / 100 * 63;

            resultShareTxt.x = canvasW / 2;
            resultShareTxt.y = canvasH / 100 * 55;

            resultTitleTxt.x = canvasW / 2;
            resultTitleTxt.y = canvasH / 100 * 43;

            resultDescTxt.x = canvasW / 2;
            resultDescTxt.y = canvasH / 100 * 50;

            //exit
            itemExit.visible = false;
            itemExitP.visible = false;

            buttonConfirm.x = (canvasW / 2);
            buttonConfirm.y = (canvasH / 100 * 59);

            buttonCancel.x = (canvasW / 2);
            buttonCancel.y = (canvasH / 100 * 69);

            popTitleTxt.x = canvasW / 2;
            popTitleTxt.y = canvasH / 100 * 43;

            popDescTxt.x = canvasW / 2;
            popDescTxt.y = canvasH / 100 * 48;
        }
    }
}



/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas() {
    if (canvasContainer != undefined) {
        drawCozyTheme();

        buttonSettings.x = (canvasW - offset.x) - 38;
        buttonSettings.y = offset.y + 34;

        var distanceNum = 48;
        var nextCount = 0;
        if (curPage != 'game') {
            buttonExit.visible = false;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

            if (typeof buttonMusicOn != "undefined") {
                buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
                buttonMusicOn.x = buttonMusicOff.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
                nextCount = 2;
            } else {
                nextCount = 1;
            }

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * (nextCount + 1));
        } else {
            buttonExit.visible = true;
            buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;
            buttonSoundOn.x = buttonSoundOff.x;
            buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + distanceNum;

            if (typeof buttonMusicOn != "undefined") {
                buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
                buttonMusicOn.x = buttonMusicOff.x;
                buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + (distanceNum * 2);
                nextCount = 2;
            } else {
                nextCount = 1;
            }

            buttonFullscreen.x = buttonSettings.x;
            buttonFullscreen.y = buttonSettings.y + (distanceNum * (nextCount + 1));

            buttonExit.x = buttonSettings.x;
            buttonExit.y = buttonSettings.y + (distanceNum * (nextCount + 2));
        }

        resizeGameUI();
    }
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
function removeGameCanvas() {
    stage.autoClear = true;
    stage.removeAllChildren();
    stage.update();
    createjs.Ticker.removeEventListener("tick", tick);
    createjs.Ticker.removeEventListener("tick", stage);
}

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */
function tick(event) {
    updateGame();
    stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj) {
    obj.regX = obj.image.naturalWidth / 2;
    obj.regY = obj.image.naturalHeight / 2;
}

function createHitarea(obj) {
    obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));
}

function applySoftButtonStyle(obj) {
    obj.shadow = new createjs.Shadow("rgba(198, 162, 135, 0.18)", 0, 8, 18);
    obj.alpha = .98;
}
