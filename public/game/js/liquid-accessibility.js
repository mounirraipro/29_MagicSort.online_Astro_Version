(function(window) {
    'use strict';

    // Owns liquid color identity, alchemy markers, and puzzle descriptions.
    var storageKey = 'magic-sort:liquid-symbols';
    var palette = [{
            fill: '#1455D9',
            surface: '#76ADFF'
        },
        {
            fill: '#00A5C4',
            surface: '#76E4F2'
        },
        {
            fill: '#00875F',
            surface: '#5AD6A7'
        },
        {
            fill: '#78A000',
            surface: '#C7E65B'
        },
        {
            fill: '#F2C100',
            surface: '#FFE36B'
        },
        {
            fill: '#F06A00',
            surface: '#FFB15C'
        },
        {
            fill: '#D7263D',
            surface: '#FF7A8B'
        },
        {
            fill: '#D4148E',
            surface: '#FF75C5'
        },
        {
            fill: '#6D3BD1',
            surface: '#B293FF'
        },
        {
            fill: '#8B4B00',
            surface: '#D9943B'
        },
        {
            fill: '#007B78',
            surface: '#57D5CE'
        },
        {
            fill: '#3F4858',
            surface: '#A3ADBC'
        }
    ];
    var contrastOrder = [0, 6, 4, 2, 8, 5, 10, 7, 11, 3, 1, 9];
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
        sprite.scaleX = sprite.scaleY = .92;
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
        symbol.visible = symbolsEnabled && visibleHeight >= 20;
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
        getContrastOrder: function() {
            return contrastOrder.slice();
        },
        isEnabled: function() {
            return symbolsEnabled;
        },
        setEnabled: function(enabled) {
            symbolsEnabled = Boolean(enabled);
            saveSymbolPreference();
        }
    };
})(window);
