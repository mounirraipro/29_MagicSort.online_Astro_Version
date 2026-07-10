(function(window) {
    'use strict';

    // Scores plain tube snapshots and owns restart confirmation timing.

    var restartConfirmationUntil = 0;
    var restartConfirmationWindow = 2500;

    function isUniformTube(tube) {
        if (!tube.colors.length) {
            return false;
        }
        var color = tube.colors[0].index;
        for (var index = 1; index < tube.colors.length; index++) {
            if (tube.colors[index].index !== color) {
                return false;
            }
        }
        return true;
    }

    function scoreMove(source, target, capacity) {
        var sourceTop = source.colors[source.colors.length - 1];
        var targetTop = target.colors[target.colors.length - 1];
        var score = 0;

        if (targetTop && targetTop.index === sourceTop.index) {
            score += 120;
        } else if (!targetTop) {
            score += 24;
        } else {
            score -= 35;
        }

        if (target.fill + sourceTop.height >= capacity - 5) {
            score += targetTop && targetTop.index === sourceTop.index ? 90 : 12;
        }
        if (source.colors.length > 1) {
            score += 18;
        }
        if (source.fill >= capacity - 5 && isUniformTube(source)) {
            score -= 180;
        }

        return score;
    }

    function getMessage(source, target) {
        var sourceTop = source.colors[source.colors.length - 1];
        var targetTop = target.colors[target.colors.length - 1];
        if (targetTop && targetTop.index === sourceTop.index) {
            return 'Join the matching colors in tubes ' + (source.index + 1) + ' and ' + (target.index + 1) + '.';
        }
        if (!targetTop) {
            return 'Open space by moving tube ' + (source.index + 1) + ' into tube ' + (target.index + 1) + '.';
        }
        return 'Try tube ' + (source.index + 1) + ' into tube ' + (target.index + 1) + ' to reveal the next color.';
    }

    function findHint(tubes, capacity) {
        var bestMove = null;
        for (var fromIndex = 0; fromIndex < tubes.length; fromIndex++) {
            var source = tubes[fromIndex];
            if (!source.colors.length) {
                continue;
            }

            var sourceTop = source.colors[source.colors.length - 1];
            for (var toIndex = 0; toIndex < tubes.length; toIndex++) {
                var target = tubes[toIndex];
                if (fromIndex === toIndex || target.fill + sourceTop.height > capacity) {
                    continue;
                }

                var candidateScore = scoreMove(source, target, capacity);
                if (!bestMove || candidateScore > bestMove.score) {
                    bestMove = {
                        from: fromIndex,
                        to: toIndex,
                        score: candidateScore,
                        message: getMessage(source, target)
                    };
                }
            }
        }
        return bestMove;
    }

    function requestRestart(hasMoves, now) {
        var currentTime = typeof now === 'number' ? now : Date.now();
        if (!hasMoves || currentTime <= restartConfirmationUntil) {
            restartConfirmationUntil = 0;
            return {
                confirmed: true,
                message: ''
            };
        }

        restartConfirmationUntil = currentTime + restartConfirmationWindow;
        return {
            confirmed: false,
            message: 'Press Restart again to reset this puzzle.'
        };
    }

    window.GameplayAssists = {
        findHint: findHint,
        requestRestart: requestRestart,
        clearRestartConfirmation: function() {
            restartConfirmationUntil = 0;
        }
    };
})(window);
