(function(window) {
    'use strict';

    var definitions = [{
            id: 'first-sort',
            title: 'First Formula',
            description: 'Complete your first puzzle',
            reward: 50,
            test: function(context) { return context.stats.uniqueClears >= 1; }
        },
        {
            id: 'perfect-brew',
            title: 'Perfect Brew',
            description: 'Earn three stars',
            reward: 75,
            test: function(context) { return context.run.stars === 3; }
        },
        {
            id: 'pure-alchemy',
            title: 'Pure Alchemy',
            description: 'Finish without a hint or undo',
            reward: 75,
            test: function(context) { return context.run.undos === 0 && context.run.hints === 0; }
        },
        {
            id: 'flow-five',
            title: 'Flow Master',
            description: 'Reach Flow x5',
            reward: 100,
            test: function(context) { return context.run.bestCombo >= 5; }
        },
        {
            id: 'daily-ritual',
            title: 'Daily Ritual',
            description: 'Complete a daily challenge',
            reward: 100,
            test: function(context) { return context.run.mode === 'daily'; }
        },
        {
            id: 'seasoned-sorter',
            title: 'Seasoned Alchemist',
            description: 'Complete 10 different puzzles',
            reward: 150,
            test: function(context) { return context.stats.uniqueClears >= 10; }
        }
    ];

    function evaluate(unlocked, context) {
        var earned = [];
        for (var index = 0; index < definitions.length; index++) {
            var achievement = definitions[index];
            if (!unlocked[achievement.id] && achievement.test(context)) {
                earned.push(achievement);
            }
        }
        return earned;
    }

    function getDefinition(id) {
        for (var index = 0; index < definitions.length; index++) {
            if (definitions[index].id === id) {
                return definitions[index];
            }
        }
        return null;
    }

    window.GameAchievements = {
        evaluate: evaluate,
        getDefinition: getDefinition,
        getAll: function() { return definitions.slice(); }
    };
})(window);
