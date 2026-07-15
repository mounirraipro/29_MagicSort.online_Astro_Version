(function(window) {
    'use strict';

    // Keeps versioned level and daily bests behind one storage boundary.

    var storageKey = 'magic-sort:player-progress:v1';
    var emptyProgress = {
        version: 1,
        levels: {},
        daily: {}
    };

    function cloneEmptyProgress() {
        return {
            version: emptyProgress.version,
            levels: {},
            daily: {}
        };
    }

    function loadProgress() {
        try {
            var stored = JSON.parse(window.localStorage.getItem(storageKey));
            if (!stored || stored.version !== 1) {
                return cloneEmptyProgress();
            }
            stored.levels = stored.levels || {};
            stored.daily = stored.daily || {};
            return stored;
        } catch (error) {
            return cloneEmptyProgress();
        }
    }

    function saveProgress(progress) {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(progress));
        } catch (error) {
            return false;
        }
        return true;
    }

    function getBucket(progress, mode) {
        return mode === 'daily' ? progress.daily : progress.levels;
    }

    function isBetterResult(candidate, currentBest) {
        if (!currentBest) {
            return true;
        }
        if (candidate.stars !== currentBest.stars) {
            return candidate.stars > currentBest.stars;
        }
        if (candidate.moves !== currentBest.moves) {
            return candidate.moves < currentBest.moves;
        }
        return candidate.undos < currentBest.undos;
    }

    function getBest(mode, identifier) {
        var progress = loadProgress();
        var bucket = getBucket(progress, mode);
        return bucket[String(identifier)] || null;
    }

    function recordBest(result) {
        var progress = loadProgress();
        var bucket = getBucket(progress, result.mode);
        var identifier = String(result.identifier);
        var currentBest = bucket[identifier] || null;
        var candidate = {
            stars: Math.max(1, Math.min(3, Number(result.stars) || 1)),
            moves: Math.max(0, Number(result.moves) || 0),
            undos: Math.max(0, Number(result.undos) || 0),
            hints: Math.max(0, Number(result.hints) || 0),
            bestCombo: Math.max(0, Number(result.bestCombo) || 0),
            completedAt: new Date().toISOString()
        };

        var isNewBest = isBetterResult(candidate, currentBest);
        if (isNewBest) {
            bucket[identifier] = candidate;
            saveProgress(progress);
        }

        return {
            best: isNewBest ? candidate : currentBest,
            isNewBest: isNewBest
        };
    }

    window.PlayerProgress = {
        getBest: getBest,
        getLevelBest: function(levelNumber) {
            return getBest('level', levelNumber);
        },
        getDailyBest: function(dateKey) {
            return getBest('daily', dateKey);
        },
        recordBest: recordBest
    };
})(window);
