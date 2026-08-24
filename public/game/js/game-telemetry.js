////////////////////////////////////////////////////////////
// GAME TELEMETRY BRIDGE
////////////////////////////////////////////////////////////
var MagicSortTelemetry = (function() {
    var sessionStarted = false;
    var levelStartedAt = 0;
    var levelEnded = true;

    function emit(name, params) {
        if (!window.parent || window.parent === window) {
            return;
        }

        window.parent.postMessage({
            type: 'magic-sort-event',
            name: name,
            params: params || {}
        }, window.location.origin);
    }

    function getElapsedMs() {
        if (!levelStartedAt) {
            return 0;
        }
        return Math.max(0, Math.round((window.performance ? window.performance.now() : Date.now()) - levelStartedAt));
    }

    function startLevel(context) {
        levelStartedAt = window.performance ? window.performance.now() : Date.now();
        levelEnded = false;
        if (!sessionStarted) {
            sessionStarted = true;
            emit('game_start', { game_mode: context.game_mode });
        }
        emit('level_start', context);
    }

    function endLevel(success, context) {
        if (levelEnded) {
            return;
        }
        levelEnded = true;
        context.success = success;
        context.elapsed_ms = getElapsedMs();
        emit('level_end', context);
        if (success) {
            emit('level_complete', context);
        }
    }

    return {
        emit: emit,
        gameLoaded: function(metrics) {
            emit('game_loaded', metrics);
        },
        gameplayAssetsReady: function(metrics) {
            emit('game_assets_ready', metrics);
        },
        startLevel: startLevel,
        completeLevel: function(context) {
            endLevel(true, context);
        },
        failLevel: function(context) {
            endLevel(false, context);
        },
        postScore: function(context) {
            emit('post_score', context);
        },
        error: function(area, asset) {
            emit('game_error', {
                error_area: String(area || 'unknown').slice(0, 48),
                asset_name: String(asset || '').split('?')[0].slice(-120)
            });
        }
    };
})();
