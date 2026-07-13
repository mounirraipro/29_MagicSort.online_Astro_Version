////////////////////////////////////////////////////////////
// GAME ASSETS
////////////////////////////////////////////////////////////
var GAME_ASSET_VERSION = '20260712-alchemy3';

var lazyMusicLoad = {
    queue: null,
    loading: false,
    loaded: false,
    callbacks: []
};
var lazySoundEffectLoad = {
    queue: null,
    loading: false,
    loaded: false,
    callbacks: []
};
var lazyAudioActivated = false;
var lazyAudioArmed = false;

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
        src: 'assets/magic-sort-table-bg.webp?v=' + GAME_ASSET_VERSION,
        id: 'magicTableBg'
    });
    criticalManifest.push({
        src: 'assets/alchemy-symbols.svg?v=' + GAME_ASSET_VERSION,
        id: 'alchemySymbols'
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
    if (!soundOn) {
        return true;
    }
    if (soundName == 'musicMain' || soundName == 'musicGame') {
        return lazyMusicLoad.loaded;
    }
    return lazySoundEffectLoad.loaded;
}

function armLazyAudioLoad() {
    if (!soundOn || lazyAudioArmed || lazyAudioActivated) {
        return;
    }

    lazyAudioArmed = true;
    window.addEventListener('pointerdown', activateLazyAudioLoad, { once: true });
    window.addEventListener('keydown', activateLazyAudioLoad, { once: true });
}

function activateLazyAudioLoad() {
    if (!soundOn || lazyAudioActivated) {
        return;
    }

    lazyAudioActivated = true;
    loadLazySoundEffects(function() {
        if (pendingMusicLoop != null) {
            loadLazyMusic(resumePendingMusicLoop);
        }
    });
}

function loadLazySoundEffects(callback) {
    if (!soundOn) {
        return;
    }
    if (typeof callback == 'function') {
        lazySoundEffectLoad.callbacks.push(callback);
    }
    if (lazySoundEffectLoad.loaded) {
        flushLazySoundEffectCallbacks();
        return;
    }
    if (lazySoundEffectLoad.loading) {
        return;
    }

    lazySoundEffectLoad.loading = true;
    lazySoundEffectLoad.queue = new createjs.LoadQueue(false);
    installSoundPlugin(lazySoundEffectLoad.queue);
    lazySoundEffectLoad.queue.addEventListener('complete', handleLazySoundEffectComplete);
    lazySoundEffectLoad.queue.addEventListener('error', handleLazySoundEffectError);
    lazySoundEffectLoad.queue.loadManifest(getSoundEffectManifest());
}

function handleLazySoundEffectComplete() {
    lazySoundEffectLoad.loading = false;
    lazySoundEffectLoad.loaded = true;
    flushLazySoundEffectCallbacks();
}

function handleLazySoundEffectError(evt) {
    lazySoundEffectLoad.loading = false;
    console.log('lazy sound effect error ', evt);
}

function flushLazySoundEffectCallbacks() {
    while (lazySoundEffectLoad.callbacks.length) {
        lazySoundEffectLoad.callbacks.shift()();
    }
}

function loadLazyMusic(callback) {
    if (!soundOn) {
        return;
    }

    if (typeof callback == 'function') {
        lazyMusicLoad.callbacks.push(callback);
    }

    if (!lazyAudioActivated) {
        armLazyAudioLoad();
        return;
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
