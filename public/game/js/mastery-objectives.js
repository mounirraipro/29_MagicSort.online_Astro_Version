(function(window) {
    'use strict';

    function getTargetTubeCount(settings) {
        return Math.max(1, settings.tubes - settings.empty);
    }

    function getParMoves(settings) {
        return Math.max(4, getTargetTubeCount(settings) * Math.max(2, settings.levels - 1));
    }

    function getMoveTarget(settings) {
        return Math.ceil(getParMoves(settings) * 1.2);
    }

    function getFlowTarget(settings) {
        return Math.max(3, Math.min(6, getTargetTubeCount(settings) - 1));
    }

    function evaluate(settings, run) {
        var moveTarget = getMoveTarget(settings);
        var flowTarget = getFlowTarget(settings);
        return [{
                id: 'efficient',
                title: 'Swift Brew',
                description: 'Finish in ' + moveTarget + ' moves',
                progress: Math.min(run.moves, moveTarget) + '/' + moveTarget,
                complete: run.moves <= moveTarget
            },
            {
                id: 'pure',
                title: 'Pure Sort',
                description: 'Use no hints or undo',
                progress: run.undos === 0 && run.hints === 0 ? 'Clean' : 'Missed',
                complete: run.undos === 0 && run.hints === 0
            },
            {
                id: 'flow',
                title: 'Flow Seal',
                description: 'Reach Flow x' + flowTarget,
                progress: 'x' + Math.min(run.bestCombo, flowTarget) + '/x' + flowTarget,
                complete: run.bestCombo >= flowTarget
            }
        ];
    }

    window.MasteryObjectives = {
        evaluate: evaluate,
        getParMoves: getParMoves,
        getMoveTarget: getMoveTarget,
        getFlowTarget: getFlowTarget
    };
})(window);
