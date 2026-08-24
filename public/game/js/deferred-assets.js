////////////////////////////////////////////////////////////
// DEFERRED GAMEPLAY VISUALS
////////////////////////////////////////////////////////////
var gameplayAssetLoad = {
    queue: null,
    loading: false,
    loaded: false,
    blocking: false,
    callbacks: []
};

function getGameAssetResult(assetId) {
    var criticalResult = loader && loader.getResult(assetId);
    if (criticalResult) {
        return criticalResult;
    }

    return gameplayAssetLoad.queue ? gameplayAssetLoad.queue.getResult(assetId) : null;
}

function areGameplayAssetsReady() {
    return gameplayAssetLoad.loaded;
}

function startDeferredGameplayLoad() {
    var startLoad = function() {
        loadGameplayAssets();
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startLoad, { timeout: 500 });
    } else {
        window.setTimeout(startLoad, 0);
    }
}

function ensureGameplayAssets(callback) {
    if (gameplayAssetLoad.loaded) {
        callback();
        return;
    }

    gameplayAssetLoad.callbacks.push(callback);
    gameplayAssetLoad.blocking = true;
    updateGameplayAssetStatus(true, 0);
    loadGameplayAssets();
}

function loadGameplayAssets() {
    if (gameplayAssetLoad.loading || gameplayAssetLoad.loaded) {
        return;
    }

    gameplayAssetLoad.loading = true;
    gameplayAssetLoad.queue = new createjs.LoadQueue(false);
    gameplayAssetLoad.queue.addEventListener('complete', handleGameplayAssetsComplete);
    gameplayAssetLoad.queue.addEventListener('error', handleGameplayAssetError);
    gameplayAssetLoad.queue.on('progress', handleGameplayAssetProgress, this);
    gameplayAssetLoad.queue.loadManifest(buildGameplayAssetManifest());
}

function handleGameplayAssetProgress(event) {
    if (!gameplayAssetLoad.blocking) {
        return;
    }

    updateGameplayAssetStatus(true, Math.round(event.progress * 100));
}

function handleGameplayAssetsComplete() {
    gameplayAssetLoad.loading = false;
    gameplayAssetLoad.loaded = true;
    gameplayAssetLoad.blocking = false;
    updateGameplayAssetStatus(false, 100);
    if (window.magicSortLoadMetrics) {
        window.magicSortLoadMetrics.gameplayReadyMs = Math.round((window.performance ? window.performance.now() : 0) - window.magicSortLoadMetrics.startedAt);
    }
    MagicSortTelemetry.gameplayAssetsReady({
        gameplay_ready_ms: window.magicSortLoadMetrics ? window.magicSortLoadMetrics.gameplayReadyMs : 0
    });

    while (gameplayAssetLoad.callbacks.length) {
        gameplayAssetLoad.callbacks.shift()();
    }
    if (typeof resumePendingMusicLoop == 'function') {
        resumePendingMusicLoop();
    }
}

function handleGameplayAssetError(event) {
    console.error('Deferred gameplay asset failed to load:', event.item && event.item.src);
    MagicSortTelemetry.error('gameplay_asset', event.item && event.item.src);
}

function updateGameplayAssetStatus(visible, progress) {
    $('#htmlAssetStatus')
        .toggleClass('is-hidden', !visible)
        .css('--asset-angle', (progress * 3.6) + 'deg')
        .attr('aria-label', visible ? 'Preparing game pieces' : 'Game pieces ready');
}
