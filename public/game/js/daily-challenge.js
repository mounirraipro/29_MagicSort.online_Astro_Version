(function(window) {
    'use strict';

    // Owns the calendar identity and seeded shuffle used by the daily puzzle.

    var state = {
        active: false,
        dateKey: '',
        seed: 0,
        levelIndex: 0,
        generationAttempt: 0,
        lockedAttempt: null,
        random: Math.random
    };

    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function padNumber(value) {
        return value < 10 ? '0' + value : String(value);
    }

    function getDateKey(date) {
        var targetDate = date || new Date();
        return targetDate.getFullYear() + '-' + padNumber(targetDate.getMonth() + 1) + '-' + padNumber(targetDate.getDate());
    }

    function getDateLabel(dateKey) {
        var parts = dateKey.split('-');
        return monthNames[Number(parts[1]) - 1] + ' ' + Number(parts[2]);
    }

    function hashString(value) {
        var hash = 2166136261;
        for (var index = 0; index < value.length; index++) {
            hash ^= value.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    function createRandom(seed) {
        return function() {
            seed += 0x6D2B79F5;
            var value = seed;
            value = Math.imul(value ^ value >>> 15, value | 1);
            value ^= value + Math.imul(value ^ value >>> 7, value | 61);
            return ((value ^ value >>> 14) >>> 0) / 4294967296;
        };
    }

    function chooseLevelIndex(totalLevels, seed) {
        var firstDailyLevel = Math.min(7, Math.max(0, totalLevels - 1));
        var availableLevels = Math.max(1, Math.min(10, totalLevels - firstDailyLevel));
        return firstDailyLevel + (seed % availableLevels);
    }

    function activate(totalLevels, date) {
        state.dateKey = getDateKey(date);
        state.seed = hashString('magic-sort:' + state.dateKey);
        state.levelIndex = chooseLevelIndex(totalLevels, state.seed);
        state.generationAttempt = 0;
        state.lockedAttempt = null;
        state.active = true;
        return getDescriptor();
    }

    function deactivate() {
        state.active = false;
        state.random = Math.random;
    }

    function beginStage() {
        if (!state.active) {
            return;
        }

        var attempt = state.lockedAttempt === null ? state.generationAttempt : state.lockedAttempt;
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

    function retryGeneration() {
        if (state.active && state.lockedAttempt === null) {
            state.generationAttempt++;
        }
    }

    function confirmGeneration() {
        if (state.active && state.lockedAttempt === null) {
            state.lockedAttempt = state.generationAttempt;
        }
    }

    function getDescriptor() {
        return {
            dateKey: state.dateKey,
            dateLabel: getDateLabel(state.dateKey),
            levelIndex: state.levelIndex,
            seed: state.seed
        };
    }

    window.DailyChallenge = {
        activate: activate,
        deactivate: deactivate,
        beginStage: beginStage,
        shuffle: shuffle,
        retryGeneration: retryGeneration,
        confirmGeneration: confirmGeneration,
        getDateKey: getDateKey,
        getDescriptor: getDescriptor,
        isActive: function() {
            return state.active;
        }
    };
})(window);
