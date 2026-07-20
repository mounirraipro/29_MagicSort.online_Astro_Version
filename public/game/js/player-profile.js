(function(window) {
    'use strict';

    var storageKey = 'magic-sort:player-profile:v1';
    var profile = loadProfile();

    function createProfile() {
        return {
            version: 1,
            essence: 0,
            mastery: {},
            achievements: {},
            completed: {},
            stats: {
                totalClears: 0,
                uniqueClears: 0,
                threeStarClears: 0,
                dailyClears: 0,
                bestFlow: 0
            },
            owned: {
                backgrounds: ['classic'],
                effects: ['classic']
            },
            equipped: {
                background: 'classic',
                effect: 'classic'
            }
        };
    }

    function loadProfile() {
        var fallback = createProfile();
        try {
            var stored = JSON.parse(window.localStorage.getItem(storageKey));
            if (!stored || stored.version !== 1) {
                return fallback;
            }
            stored.mastery = stored.mastery || {};
            stored.achievements = stored.achievements || {};
            stored.completed = stored.completed || {};
            stored.stats = Object.assign(fallback.stats, stored.stats || {});
            stored.owned = Object.assign(fallback.owned, stored.owned || {});
            stored.equipped = Object.assign(fallback.equipped, stored.equipped || {});
            stored.essence = Math.max(0, Number(stored.essence) || 0);
            return stored;
        } catch (error) {
            return fallback;
        }
    }

    function saveProfile() {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(profile));
            return true;
        } catch (error) {
            return false;
        }
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function recordCompletion(run) {
        var recordKey = run.mode + ':' + String(run.identifier);
        var previousSeals = profile.mastery[recordKey] || [];
        var earnedSealIds = [];

        for (var index = 0; index < run.objectives.length; index++) {
            var objective = run.objectives[index];
            if (objective.complete && previousSeals.indexOf(objective.id) === -1) {
                previousSeals.push(objective.id);
                earnedSealIds.push(objective.id);
            }
        }
        profile.mastery[recordKey] = previousSeals;

        var firstClear = !profile.completed[recordKey];
        profile.completed[recordKey] = true;
        profile.stats.totalClears++;
        profile.stats.uniqueClears += firstClear ? 1 : 0;
        profile.stats.threeStarClears += run.stars === 3 ? 1 : 0;
        profile.stats.dailyClears += run.mode === 'daily' && firstClear ? 1 : 0;
        profile.stats.bestFlow = Math.max(profile.stats.bestFlow, run.bestCombo);

        var newAchievements = GameAchievements.evaluate(profile.achievements, {
            run: run,
            stats: profile.stats
        });
        var essenceEarned = (firstClear ? 25 : 0) + (earnedSealIds.length * 25);

        for (var achievementIndex = 0; achievementIndex < newAchievements.length; achievementIndex++) {
            var achievement = newAchievements[achievementIndex];
            profile.achievements[achievement.id] = new Date().toISOString();
            essenceEarned += achievement.reward;
        }

        profile.essence += essenceEarned;
        saveProfile();
        return {
            essenceEarned: essenceEarned,
            balance: profile.essence,
            firstClear: firstClear,
            newSealIds: earnedSealIds,
            newAchievements: clone(newAchievements)
        };
    }

    function purchase(type, id, cost) {
        var bucket = type === 'background' ? profile.owned.backgrounds : profile.owned.effects;
        if (bucket.indexOf(id) !== -1) {
            return { ok: true, owned: true, balance: profile.essence };
        }
        if (profile.essence < cost) {
            return { ok: false, reason: 'essence', balance: profile.essence };
        }
        profile.essence -= cost;
        bucket.push(id);
        saveProfile();
        return { ok: true, owned: false, balance: profile.essence };
    }

    function equip(type, id) {
        var bucket = type === 'background' ? profile.owned.backgrounds : profile.owned.effects;
        if (bucket.indexOf(id) === -1) {
            return false;
        }
        profile.equipped[type] = id;
        saveProfile();
        return true;
    }

    window.PlayerProfile = {
        get: function() { return clone(profile); },
        getEssence: function() { return profile.essence; },
        getMastery: function(mode, identifier) {
            return (profile.mastery[mode + ':' + String(identifier)] || []).slice();
        },
        recordCompletion: recordCompletion,
        purchase: purchase,
        equip: equip,
        isOwned: function(type, id) {
            var bucket = type === 'background' ? profile.owned.backgrounds : profile.owned.effects;
            return bucket.indexOf(id) !== -1;
        }
    };
})(window);
