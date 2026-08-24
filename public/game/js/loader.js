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
    updateLoaderProgress(0);

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
    MagicSortTelemetry.error('critical_asset', evt.item && evt.item.src);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
    updateLoaderProgress(Math.round(loader.progress * 100));
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
    MagicSortTelemetry.gameLoaded({
        critical_ready_ms: window.magicSortLoadMetrics ? window.magicSortLoadMetrics.criticalReadyMs : 0
    });
};

function updateLoaderProgress(percent) {
    var progress = Math.max(0, Math.min(100, percent));
    $('#mainLoader')
        .css('--loader-fill', (16 + (progress * .68)) + '%')
        .css('--loader-angle', (progress * 3.6) + 'deg')
        .attr('aria-valuenow', progress);
    $('#mainLoaderProgress').text(progress + '%');
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
