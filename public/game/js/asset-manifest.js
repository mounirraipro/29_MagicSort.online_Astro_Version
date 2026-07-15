////////////////////////////////////////////////////////////
// VISUAL ASSET MANIFESTS
////////////////////////////////////////////////////////////
var GAME_ASSET_VERSION = '20260715-gameplay1';

function versionGameAsset(path) {
    return path + (path.indexOf('?') == -1 ? '?' : '&') + 'v=' + GAME_ASSET_VERSION;
}

// Only the background is required to render the first interactive menu.
function buildCriticalAssetManifest() {
    return [{
        src: versionGameAsset('assets/magic-sort-table-bg.webp'),
        id: 'magicTableBg'
    }];
}

function buildGameplayAssetManifest() {
    var gameplayManifest = [{
        src: versionGameAsset('assets/alchemy-symbols.svg'),
        id: 'alchemySymbols'
    }];

    for (var tubeIndex = 0; tubeIndex < tubes_arr.length; tubeIndex++) {
        gameplayManifest.push({
            src: versionGameAsset(tubes_arr[tubeIndex].imageBack),
            id: 'tubeBack' + tubeIndex
        });
        gameplayManifest.push({
            src: versionGameAsset(tubes_arr[tubeIndex].imageFront),
            id: 'tubeFront' + tubeIndex
        });
    }

    for (var bubbleIndex = 0; bubbleIndex < bubbles_arr.length; bubbleIndex++) {
        gameplayManifest.push({
            src: versionGameAsset(bubbles_arr[bubbleIndex]),
            id: 'bubble' + bubbleIndex
        });
    }

    return gameplayManifest;
}
