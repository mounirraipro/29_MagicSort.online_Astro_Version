////////////////////////////////////////////////////////////
// ON-DEMAND AUDIO
////////////////////////////////////////////////////////////
var lazySoundEffectLoad = {
    queue: null,
    loading: false,
    loaded: false,
    callbacks: []
};
var lazyMusicLoads = {
    musicMain: createLazyAudioState(),
    musicGame: createLazyAudioState()
};
var lazyAudioActivated = false;
var lazyAudioArmed = false;

function createLazyAudioState() {
    return {
        queue: null,
        loading: false,
        loaded: false,
        callbacks: []
    };
}

function getGameSoundEnabled() {
    if ($.browser.mobile || isTablet) {
        return enableMobileSound;
    }

    return enableDesktopSound;
}

function getSoundEffectManifest() {
    return [{ src: 'assets/sounds/sound_click.ogg', id: 'soundButton' },
        { src: 'assets/sounds/sound_score.ogg', id: 'soundScore' },
        { src: 'assets/sounds/sound_timer.ogg', id: 'soundTimer' },
        { src: 'assets/sounds/sound_timer_end.ogg', id: 'soundTimerEnd' },
        { src: 'assets/sounds/sound_result.ogg', id: 'soundResult' },
        { src: 'assets/sounds/sound_error.ogg', id: 'soundError' },
        { src: 'assets/sounds/sound_clear.ogg', id: 'soundClear' },
        { src: 'assets/sounds/sound_start.ogg', id: 'soundStart' },
        { src: 'assets/sounds/sound_select.ogg', id: 'soundSelect' },
        { src: 'assets/sounds/sound_pour1.ogg', id: 'soundPour1' },
        { src: 'assets/sounds/sound_pour2.ogg', id: 'soundPour2' },
        { src: 'assets/sounds/sound_pour3.ogg', id: 'soundPour3' },
        { src: 'assets/sounds/sound_match.ogg', id: 'soundMatch' }].map(function(asset) {
        asset.src = versionGameAsset(asset.src);
        return asset;
    });
}

function getMusicAsset(soundName) {
    if (soundName == 'musicMain') {
        return { src: versionGameAsset('assets/sounds/music_main.ogg'), id: 'musicMain' };
    }
    if (soundName == 'musicGame') {
        return { src: versionGameAsset('assets/sounds/music_game.ogg'), id: 'musicGame' };
    }
    return null;
}

function installSoundPlugin(loadQueue) {
    if (!soundOn) {
        return;
    }

    createjs.Sound.alternateExtensions = ['mp3'];
    loadQueue.installPlugin(createjs.Sound);
}

function isLazySoundReady(soundName) {
    if (!soundOn) {
        return true;
    }
    if (lazyMusicLoads[soundName]) {
        return lazyMusicLoads[soundName].loaded;
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
    loadLazySoundEffects();
}

function loadLazySoundEffects(callback) {
    if (!soundOn) {
        return;
    }
    if (typeof callback == 'function') {
        lazySoundEffectLoad.callbacks.push(callback);
    }
    if (lazySoundEffectLoad.loaded) {
        flushAudioCallbacks(lazySoundEffectLoad);
        return;
    }
    if (lazySoundEffectLoad.loading) {
        return;
    }

    lazySoundEffectLoad.loading = true;
    lazySoundEffectLoad.queue = new createjs.LoadQueue(false);
    installSoundPlugin(lazySoundEffectLoad.queue);
    lazySoundEffectLoad.queue.addEventListener('complete', function() {
        lazySoundEffectLoad.loading = false;
        lazySoundEffectLoad.loaded = true;
        flushAudioCallbacks(lazySoundEffectLoad);
    });
    lazySoundEffectLoad.queue.addEventListener('error', handleLazyAudioError);
    lazySoundEffectLoad.queue.loadManifest(getSoundEffectManifest());
}

function loadLazyMusic(soundName, callback) {
    var musicState = lazyMusicLoads[soundName];
    var musicAsset = getMusicAsset(soundName);
    if (!soundOn || !musicState || !musicAsset) {
        return;
    }
    if (typeof callback == 'function') {
        musicState.callbacks.push(callback);
    }
    if (!lazyAudioActivated) {
        armLazyAudioLoad();
        return;
    }
    if (musicState.loaded) {
        flushAudioCallbacks(musicState);
        return;
    }
    if (musicState.loading) {
        return;
    }

    musicState.loading = true;
    musicState.queue = new createjs.LoadQueue(false);
    installSoundPlugin(musicState.queue);
    musicState.queue.addEventListener('complete', function() {
        musicState.loading = false;
        musicState.loaded = true;
        flushAudioCallbacks(musicState);
    });
    musicState.queue.addEventListener('error', handleLazyAudioError);
    musicState.queue.loadFile(musicAsset);
}

function flushAudioCallbacks(audioState) {
    while (audioState.callbacks.length) {
        audioState.callbacks.shift()();
    }
}

function handleLazyAudioError(event) {
    console.error('Deferred audio failed to load:', event.item && event.item.src);
    MagicSortTelemetry.error('audio_asset', event.item && event.item.src);
}
