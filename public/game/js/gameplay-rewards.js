(function(window) {
    'use strict';

    // Tracks lightweight run feedback without owning puzzle state or scoring.

    var state = {
        combo: 0,
        bestCombo: 0,
        completedTubes: 0
    };

    function normalizeCompletedTubes(value) {
        return Math.max(0, Number(value) || 0);
    }

    function reset(completedTubes) {
        state.combo = 0;
        state.bestCombo = 0;
        state.completedTubes = normalizeCompletedTubes(completedTubes);
        return getState();
    }

    function recordMove(completedTubes) {
        var completed = normalizeCompletedTubes(completedTubes);
        var sealedTubes = Math.max(0, completed - state.completedTubes);

        state.combo++;
        state.bestCombo = Math.max(state.bestCombo, state.combo);
        state.completedTubes = completed;

        return {
            combo: state.combo,
            bestCombo: state.bestCombo,
            sealedTubes: sealedTubes,
            milestone: sealedTubes > 0 || state.combo % 3 === 0,
            message: sealedTubes > 0 ? 'Tube sealed - Flow x' + state.combo : 'Flow x' + state.combo
        };
    }

    function breakCombo(completedTubes) {
        state.combo = 0;
        state.completedTubes = normalizeCompletedTubes(completedTubes);
        return getState();
    }

    function getState() {
        return {
            combo: state.combo,
            bestCombo: state.bestCombo,
            completedTubes: state.completedTubes
        };
    }

    window.GameplayRewards = {
        reset: reset,
        recordMove: recordMove,
        breakCombo: breakCombo,
        getState: getState
    };
})(window);
