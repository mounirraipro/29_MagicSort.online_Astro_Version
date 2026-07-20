(function(window) {
    'use strict';

    function reduceMotion() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function emit(count, celebration) {
        var layer = document.getElementById('htmlCompletionEffects');
        if (!layer || reduceMotion()) {
            return;
        }
        var effect = CosmeticCabinet.getEquippedEffect();
        var fragment = document.createDocumentFragment();
        for (var index = 0; index < count; index++) {
            var particle = document.createElement('span');
            particle.className = 'completion-particle completion-particle--' + effect + (celebration ? ' is-celebration' : '');
            particle.style.setProperty('--particle-x', ((index * 47) % 92 + 4) + '%');
            particle.style.setProperty('--particle-delay', ((index % 7) * 35) + 'ms');
            particle.style.setProperty('--particle-drift', (((index % 5) - 2) * 24) + 'px');
            fragment.appendChild(particle);
        }
        layer.appendChild(fragment);
        window.setTimeout(function() {
            layer.textContent = '';
        }, celebration ? 1500 : 900);
    }

    window.CompletionEffects = {
        playTubeSeal: function() { emit(10, false); },
        playCelebration: function(stars) { emit(18 + (stars * 4), true); }
    };
})(window);
