////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

/*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload() {
    window.magicSortLoadMetrics = {
        startedAt: window.performance ? window.performance.now() : 0,
        criticalReadyMs: null,
        gameplayReadyMs: null
    };
    toggleLoader(true);
    updateLoaderProgress(0, 'Opening Magic Sort...');

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
    updateLoaderProgress(Math.round(loader.progress * 100), 'Opening Magic Sort...');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
    if (window.magicSortLoadMetrics) {
        window.magicSortLoadMetrics.criticalReadyMs = Math.round((window.performance ? window.performance.now() : 0) - window.magicSortLoadMetrics.startedAt);
    }
    toggleLoader(false);
    initMain();
    armLazyAudioLoad();
    startDeferredGameplayLoad();
    if (window.parent && window.parent !== window) {
        window.parent.postMessage({
            type: 'magic-sort-ready'
        }, window.location.origin);
    }
};

function updateLoaderProgress(percent, label) {
    $('#mainLoaderProgress').text(percent + '%');
    $('#mainLoaderLabel').text(label);
}

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
