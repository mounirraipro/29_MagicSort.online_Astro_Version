(function(window) {
    'use strict';

    var catalog = {
        backgrounds: [{
                id: 'classic',
                title: 'Velvet Lab',
                cost: 0,
                src: 'assets/magic-sort-table-bg.webp'
            },
            {
                id: 'emerald',
                title: 'Emerald Conservatory',
                cost: 350,
                src: 'assets/theme-emerald-conservatory.webp'
            },
            {
                id: 'celestial',
                title: 'Celestial Observatory',
                cost: 500,
                src: 'assets/theme-celestial-observatory.webp'
            },
            {
                id: 'moonlit',
                title: 'Moonlit Archives',
                cost: 650,
                src: 'assets/theme-moonlit-archives.webp'
            },
            {
                id: 'sunforge',
                title: 'Sunforge Sanctum',
                cost: 800,
                src: 'assets/theme-sunforge-sanctum.webp'
            },
            {
                id: 'frostglass',
                title: 'Frostglass Grotto',
                cost: 950,
                src: 'assets/theme-frostglass-grotto.webp'
            }
        ],
        effects: [{ id: 'classic', title: 'Clean Pour', cost: 0 },
            { id: 'prism', title: 'Prism Spark', cost: 250 },
            { id: 'comet', title: 'Comet Trail', cost: 400 }
        ]
    };

    window.CosmeticCatalog = {
        getAll: function() {
            return catalog;
        },
        getItems: function(type) {
            return type === 'background' ? catalog.backgrounds : catalog.effects;
        },
        find: function(type, id) {
            var items = this.getItems(type);
            for (var index = 0; index < items.length; index++) {
                if (items[index].id === id) {
                    return items[index];
                }
            }
            return null;
        }
    };
})(window);
