////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload() {
    toggleLoader(true);

    checkMobileEvent();

    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMobileOrientation, 1000);
    });
    resizeGameFunc();

    soundOn = getGameSoundEnabled();

    loader = new createjs.LoadQueue(false);
    manifest = buildCriticalAssetManifest();

    if (typeof addScoreboardAssets == 'function') {
        addScoreboardAssets();
    }

    installSoundPlugin(loader);
    loader.addEventListener("complete", handleComplete);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.on("progress", handleProgress, this);
    loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
    var item = evt.item;
    //console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
    console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
    $('#mainLoader span').html(Math.round(loader.progress / 1 * 100) + '%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
    toggleLoader(false);
    initMain();
    scheduleLazyMusicLoad();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con) {
    if (con) {
        $('#mainLoader').show();
    } else {
        $('#mainLoader').hide();
    }
}
