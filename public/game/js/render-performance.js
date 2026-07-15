////////////////////////////////////////////////////////////
// CANVAS RENDER PERFORMANCE
////////////////////////////////////////////////////////////
var renderPerformance = {
    targetFps: 60,
    hidden: false,
    initialized: false
};

function configureGameRendering(gameStage) {
    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    var compactViewport = getGameHostViewportWidth() <= 768;
    var limitedCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    var limitedMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

    renderPerformance.targetFps = reducedMotion || coarsePointer || compactViewport || limitedCpu || limitedMemory ? 30 : 60;
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED || createjs.Ticker.RAF;
    createjs.Ticker.framerate = renderPerformance.targetFps;
    gameStage.canvas.setAttribute('data-render-fps', String(renderPerformance.targetFps));
    gameStage.canvas.setAttribute('data-render-mode', renderPerformance.targetFps == 30 ? 'efficient' : 'smooth');

    // Mouse-over hit testing is useful for cursors, but 20 scans per second is excessive here.
    gameStage.enableMouseOver(coarsePointer ? 0 : 10);
    gameStage.mouseMoveOutside = false;

    if (!renderPerformance.initialized) {
        document.addEventListener('visibilitychange', handleGameVisibilityChange);
        renderPerformance.initialized = true;
    }
}

function getGameHostViewportWidth() {
    try {
        if (window.parent && window.parent !== window) {
            return window.parent.innerWidth;
        }
    } catch (error) {
        // Cross-origin embeds cannot expose the host viewport; use the iframe width.
    }
    return window.innerWidth;
}

function handleGameVisibilityChange() {
    renderPerformance.hidden = document.hidden;
}

function shouldRenderGameFrame(event) {
    return !renderPerformance.hidden && !(event && event.paused);
}
