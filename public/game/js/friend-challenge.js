(function(window) {
    'use strict';

    var state = {
        active: false,
        incoming: false,
        seed: 0,
        levelIndex: 0,
        generationAttempt: 0,
        lockedAttempt: null,
        target: null,
        random: Math.random
    };

    function createRandom(seed) {
        return function() {
            seed += 0x6D2B79F5;
            var value = seed;
            value = Math.imul(value ^ value >>> 15, value | 1);
            value ^= value + Math.imul(value ^ value >>> 7, value | 61);
            return ((value ^ value >>> 14) >>> 0) / 4294967296;
        };
    }

    function createSeed() {
        if (window.crypto && window.crypto.getRandomValues) {
            var values = new Uint32Array(1);
            window.crypto.getRandomValues(values);
            return values[0] >>> 0;
        }
        return Math.floor(Math.random() * 4294967295) >>> 0;
    }

    function activate(seed, levelIndex, lockedAttempt, target, incoming) {
        state.active = true;
        state.incoming = Boolean(incoming);
        state.seed = Number(seed) >>> 0;
        state.levelIndex = Math.max(0, Number(levelIndex) || 0);
        state.generationAttempt = Math.max(0, Number(lockedAttempt) || 0);
        state.lockedAttempt = lockedAttempt == null ? null : state.generationAttempt;
        state.target = target || null;
        return getDescriptor();
    }

    function activateRandom(levelIndex) {
        return activate(createSeed(), levelIndex, null, null, false);
    }

    function beginStage() {
        if (!state.active) {
            return;
        }
        var attempt = state.lockedAttempt == null ? state.generationAttempt : state.lockedAttempt;
        state.random = createRandom((state.seed + Math.imul(attempt + 1, 2654435761)) >>> 0);
    }

    function shuffle(array) {
        var currentIndex = array.length;
        while (currentIndex !== 0) {
            var randomIndex = Math.floor(state.random() * currentIndex);
            currentIndex--;
            var temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    function encode(payload) {
        var json = JSON.stringify(payload);
        var bytes = new TextEncoder().encode(json);
        var binary = '';
        for (var index = 0; index < bytes.length; index++) {
            binary += String.fromCharCode(bytes[index]);
        }
        var encoded = window.btoa(binary);
        return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    }

    function decode(token) {
        try {
            var normalized = token.replace(/-/g, '+').replace(/_/g, '/');
            while (normalized.length % 4) {
                normalized += '=';
            }
            var binary = window.atob(normalized);
            var bytes = new Uint8Array(binary.length);
            for (var index = 0; index < binary.length; index++) {
                bytes[index] = binary.charCodeAt(index);
            }
            return JSON.parse(new TextDecoder().decode(bytes));
        } catch (error) {
            return null;
        }
    }

    function loadFromLocation(totalLevels) {
        var token = new URLSearchParams(window.location.search).get('challenge');
        var payload = token ? decode(token) : null;
        if (!payload || payload.v !== 1 || !Number.isFinite(payload.s) || !Number.isFinite(payload.l)) {
            return null;
        }
        var levelIndex = Math.max(0, Math.min(totalLevels - 1, payload.l));
        var target = payload.m ? {
            moves: Math.max(0, Number(payload.m) || 0),
            score: Math.max(0, Number(payload.p) || 0),
            stars: Math.max(0, Math.min(3, Number(payload.r) || 0))
        } : null;
        return activate(payload.s, levelIndex, payload.a, target, true);
    }

    function createShareData(run) {
        var payload = {
            v: 1,
            l: state.levelIndex,
            s: state.seed,
            a: state.lockedAttempt == null ? state.generationAttempt : state.lockedAttempt
        };
        if (run && run.complete) {
            payload.m = run.moves;
            payload.p = run.score;
            payload.r = run.stars;
        }
        return {
            token: encode(payload),
            level: state.levelIndex + 1,
            target: run && run.complete ? {
                moves: run.moves,
                score: run.score,
                stars: run.stars
            } : state.target
        };
    }

    function getDescriptor() {
        return {
            active: state.active,
            incoming: state.incoming,
            seed: state.seed,
            levelIndex: state.levelIndex,
            attempt: state.lockedAttempt == null ? state.generationAttempt : state.lockedAttempt,
            target: state.target
        };
    }

    window.FriendChallenge = {
        activateRandom: activateRandom,
        loadFromLocation: loadFromLocation,
        beginStage: beginStage,
        shuffle: shuffle,
        retryGeneration: function() {
            if (state.active && state.lockedAttempt == null) {
                state.generationAttempt++;
            }
        },
        confirmGeneration: function() {
            if (state.active && state.lockedAttempt == null) {
                state.lockedAttempt = state.generationAttempt;
            }
        },
        deactivate: function() {
            state.active = false;
            state.incoming = false;
            state.target = null;
            state.random = Math.random;
        },
        isActive: function() { return state.active; },
        isIncoming: function() { return state.active && state.incoming; },
        getDescriptor: getDescriptor,
        createShareData: createShareData
    };
})(window);
