////////////////////////////////////////////////////////////
// GAME ASSETS
////////////////////////////////////////////////////////////
var GAME_ASSET_VERSION = '20260710-gameplay1';

var lazyMusicLoad = {
    queue: null,
    loading: false,
    loaded: false,
    callbacks: []
};

function getGameSoundEnabled() {
    if ($.browser.mobile || isTablet) {
        return enableMobileSound;
    }

    return enableDesktopSound;
}

function getSoundEffectManifest() {
    return [{
        src: 'assets/sounds/sound_click.ogg',
        id: 'soundButton'
    }, {
        src: 'assets/sounds/sound_score.ogg',
        id: 'soundScore'
    }, {
        src: 'assets/sounds/sound_timer.ogg',
        id: 'soundTimer'
    }, {
        src: 'assets/sounds/sound_timer_end.ogg',
        id: 'soundTimerEnd'
    }, {
        src: 'assets/sounds/sound_result.ogg',
        id: 'soundResult'
    }, {
        src: 'assets/sounds/sound_error.ogg',
        id: 'soundError'
    }, {
        src: 'assets/sounds/sound_clear.ogg',
        id: 'soundClear'
    }, {
        src: 'assets/sounds/sound_start.ogg',
        id: 'soundStart'
    }, {
        src: 'assets/sounds/sound_select.ogg',
        id: 'soundSelect'
    }, {
        src: 'assets/sounds/sound_pour1.ogg',
        id: 'soundPour1'
    }, {
        src: 'assets/sounds/sound_pour2.ogg',
        id: 'soundPour2'
    }, {
        src: 'assets/sounds/sound_pour3.ogg',
        id: 'soundPour3'
    }, {
        src: 'assets/sounds/sound_match.ogg',
        id: 'soundMatch'
    }];
}

function getMusicManifest() {
    return [{
        src: 'assets/sounds/music_main.ogg',
        id: 'musicMain'
    }, {
        src: 'assets/sounds/music_game.ogg',
        id: 'musicGame'
    }];
}

function buildCriticalAssetManifest() {
    var criticalManifest = [];

    criticalManifest.push({
        src: 'assets/magic-sort-table-bg.png?v=' + GAME_ASSET_VERSION,
        id: 'magicTableBg'
    });

    for (var n = 0; n < tubes_arr.length; n++) {
        criticalManifest.push({
            src: tubes_arr[n].imageBack,
            id: 'tubeBack' + n
        });
        criticalManifest.push({
            src: tubes_arr[n].imageFront,
            id: 'tubeFront' + n
        });
    }

    for (var b = 0; b < bubbles_arr.length; b++) {
        criticalManifest.push({
            src: bubbles_arr[b],
            id: 'bubble' + b
        });
    }

    if (soundOn) {
        criticalManifest = criticalManifest.concat(getSoundEffectManifest());
    }

    return criticalManifest;
}

function installSoundPlugin(loadQueue) {
    if (!soundOn) {
        return;
    }

    createjs.Sound.alternateExtensions = ["mp3"];
    loadQueue.installPlugin(createjs.Sound);
}

function isLazySoundReady(soundName) {
    if (soundName != 'musicMain' && soundName != 'musicGame') {
        return true;
    }

    return lazyMusicLoad.loaded;
}

function loadLazyMusic(callback) {
    if (!soundOn) {
        return;
    }

    if (typeof callback == 'function') {
        lazyMusicLoad.callbacks.push(callback);
    }

    if (lazyMusicLoad.loaded) {
        flushLazyMusicCallbacks();
        return;
    }

    if (lazyMusicLoad.loading) {
        return;
    }

    lazyMusicLoad.loading = true;
    lazyMusicLoad.queue = new createjs.LoadQueue(false);
    installSoundPlugin(lazyMusicLoad.queue);
    lazyMusicLoad.queue.addEventListener('complete', handleLazyMusicComplete);
    lazyMusicLoad.queue.addEventListener('error', handleLazyMusicError);
    lazyMusicLoad.queue.loadManifest(getMusicManifest());
}

function scheduleLazyMusicLoad() {
    if (!soundOn) {
        return;
    }

    setTimeout(function() {
        loadLazyMusic();
    }, 250);
}

function handleLazyMusicComplete() {
    lazyMusicLoad.loading = false;
    lazyMusicLoad.loaded = true;
    flushLazyMusicCallbacks();

    if (typeof onLazyMusicReady == 'function') {
        onLazyMusicReady();
    }
}

function handleLazyMusicError(evt) {
    lazyMusicLoad.loading = false;
    console.log('lazy music error ', evt);
}

function flushLazyMusicCallbacks() {
    while (lazyMusicLoad.callbacks.length) {
        lazyMusicLoad.callbacks.shift()();
    }
}
