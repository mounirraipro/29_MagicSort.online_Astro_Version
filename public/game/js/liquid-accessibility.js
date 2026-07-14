(function(window) {
    'use strict';

    // Owns liquid color identity, alchemy markers, and puzzle descriptions.
    var storageKey = 'magic-sort:liquid-symbols';
    var palette = [{
            fill: '#2563EB',
            surface: '#60A5FA'
        },
        {
            fill: '#06B6D4',
            surface: '#67E8F9'
        },
        {
            fill: '#059669',
            surface: '#34D399'
        },
        {
            fill: '#65A30D',
            surface: '#A3E635'
        },
        {
            fill: '#EAB308',
            surface: '#FDE047'
        },
        {
            fill: '#F97316',
            surface: '#FDBA74'
        },
        {
            fill: '#DC2626',
            surface: '#F87171'
        },
        {
            fill: '#DB2777',
            surface: '#F472B6'
        },
        {
            fill: '#7C3AED',
            surface: '#A78BFA'
        },
        {
            fill: '#A16207',
            surface: '#D97706'
        },
        {
            fill: '#0D9488',
            surface: '#5EEAD4'
        },
        {
            fill: '#475569',
            surface: '#94A3B8'
        }
    ];
    var symbolsEnabled = readSymbolPreference();
    var symbolNames = ['Sun', 'Moon', 'Droplet', 'Spark', 'Salt', 'Fire', 'Water', 'Air', 'Earth', 'Crystal', 'Spiral', 'Orbit'];

    function readSymbolPreference() {
        try {
            var stored = window.localStorage.getItem(storageKey);
            return stored == null ? true : stored == 'true';
        } catch (error) {
            return true;
        }
    }

    function saveSymbolPreference() {
        try {
            window.localStorage.setItem(storageKey, String(symbolsEnabled));
        } catch (error) {
            return false;
        }
        return true;
    }

    function createSymbol(colorIndex) {
        var symbol = new createjs.Container();
        var sprite = new createjs.Bitmap(getGameAssetResult('alchemySymbols'));
        sprite.sourceRect = new createjs.Rectangle(colorIndex * 40, 0, 40, 40);
        sprite.regX = 20;
        sprite.regY = 20;
        sprite.scaleX = sprite.scaleY = .75;
        symbol.addChild(sprite);
        symbol.mouseEnabled = false;
        symbol.visible = symbolsEnabled;
        return symbol;
    }

    function positionSymbol(symbol, shape) {
        if (!symbol || !shape) {
            return;
        }

        var visibleHeight = Math.abs(shape.fillH);
        symbol.y = shape.y + (shape.fillH / 2);
        symbol.visible = symbolsEnabled && visibleHeight >= 24;
    }

    function describeTubes(tubes) {
        if (!tubes || !tubes.length) {
            return 'The puzzle is loading.';
        }

        var descriptions = [];
        for (var tubeIndex = 0; tubeIndex < tubes.length; tubeIndex++) {
            var colors = tubes[tubeIndex].data.colors;
            if (!colors.length) {
                descriptions.push('Tube ' + (tubeIndex + 1) + ' is empty');
                continue;
            }

            var labels = [];
            for (var colorIndex = 0; colorIndex < colors.length; colorIndex++) {
                labels.push(symbolNames[colors[colorIndex].index]);
            }
            descriptions.push('Tube ' + (tubeIndex + 1) + ' bottom to top: ' + labels.join(', '));
        }
        return 'Matching alchemy symbols represent matching liquid colors. ' + descriptions.join('. ') + '.';
    }

    window.colors_arr = palette;
    window.LiquidAccessibility = {
        createSymbol: createSymbol,
        positionSymbol: positionSymbol,
        describeTubes: describeTubes,
        isEnabled: function() {
            return symbolsEnabled;
        },
        setEnabled: function(enabled) {
            symbolsEnabled = Boolean(enabled);
            saveSymbolPreference();
        }
    };
})(window);
