(function (window) {
    'use strict';

    var selectedLevel = 0;
    var highestUnlockedSeen = 0;
    var actions;
    var icons = [
        'settings',
        'play',
        'grid-3x3',
        'sun',
        'shopping-bag',
        'chevron-left',
        'chevron-right',
        'arrow-right',
        'gem',
        'star',
        'lock-keyhole',
        'check',
        'undo-2', 'lightbulb', 'rotate-ccw', 'timer', 'trophy', 'flask-conical',
        'zap', 'sparkles', 'flame', 'volume-2', 'music-2', 'shapes', 'log-out',
    ];

    function icon(name) {
        if (icons.indexOf(name) === -1) return '';
        var url = new URL(
            versionGameAsset('assets/menu-icons/' + name + '.svg'),
            window.location.href,
        ).href;
        return (
            '<span class="menu-icon" aria-hidden="true" style="--menu-icon:url(' +
            url +
            ')"></span>'
        );
    }

    function resumeLevel(state) {
        return Math.max(1, Math.min(state.total, Number(state.unlocked) || 1));
    }

    function renderHome(state) {
        var level = resumeLevel(state);
        $('#htmlMenuLevel').text('Level ' + level);
        $('#htmlStartLabel').text(level > 1 ? 'Continue' : 'Play');
    }

    function selectLevel(level) {
        selectedLevel = level;
        $('#htmlLevelGrid [data-level]').each(function () {
            var selected = Number(this.dataset.level) === level;
            $(this)
                .toggleClass('is-current', selected)
                .attr('aria-pressed', String(selected));
        });
        $('#htmlLevelPlay')
            .prop('disabled', !level)
            .text(level ? 'Play level ' + level : 'Complete earlier levels');
    }

    function renderLevels(state) {
        var unlockedLevel = resumeLevel(state);
        if (unlockedLevel > highestUnlockedSeen) {
            selectedLevel = unlockedLevel;
            highestUnlockedSeen = unlockedLevel;
        }
        var start = (state.page - 1) * state.pageSize + 1;
        var end = Math.min(start + state.pageSize - 1, state.total);
        var completed = 0;
        var html = '';
        for (var level = start; level <= end; level++) {
            var unlocked = level <= resumeLevel(state);
            var best = state.getBest(level);
            if (best) completed++;
            var stars = '';
            for (var star = 0; star < 3; star++) {
                stars +=
                    '<span class="level-star' +
                    (best && star < best.stars ? ' is-earned' : '') +
                    '">' +
                    icon('star') +
                    '</span>';
            }
            var label =
                'Level ' +
                level +
                (best
                    ? ', ' +
                      best.stars +
                      ' stars, best ' +
                      best.moves +
                      ' moves'
                    : unlocked
                      ? ', available'
                      : ', locked');
            html +=
                '<button class="level-grid__button' +
                (unlocked ? '' : ' is-locked') +
                '" type="button" data-level="' +
                level +
                '" aria-label="' +
                label +
                '" aria-pressed="false"' +
                (unlocked ? '' : ' disabled') +
                '><span>' +
                level +
                '</span><span class="level-grid__rating">' +
                (unlocked ? stars : icon('lock-keyhole')) +
                '</span></button>';
        }
        $('#htmlLevelGrid').html(html);
        $('#htmlLevelTitle').text('Levels ' + start + '-' + end);
        $('#htmlLevelPage').text(
            state.page + ' / ' + Math.ceil(state.total / state.pageSize),
        );
        $('#htmlLevelProgress')
            .attr('max', end - start + 1)
            .val(completed);
        $('#htmlLevelProgressText').text(completed + ' / ' + (end - start + 1));
        $('#htmlLevelPrev').prop('disabled', state.page <= 1);
        $('#htmlLevelNext').prop('disabled', end >= state.total);
        var availableEnd = Math.min(end, resumeLevel(state));
        var selection =
            selectedLevel >= start && selectedLevel <= availableEnd
                ? selectedLevel
                : availableEnd;
        selectLevel(selection >= start ? selection : 0);
    }

    function init(callbacks) {
        actions = callbacks;
        $('[data-menu-icon]').each(function () {
            $(this).html(icon(this.dataset.menuIcon));
        });
        $('#htmlLevelGrid').on('click', '[data-level]', function () {
            if (!this.disabled) selectLevel(Number(this.dataset.level));
        });
        $('#htmlLevelPlay').on('click', function () {
            if (selectedLevel) actions.startLevel(selectedLevel);
        });
        $('#htmlEndlessButton').on('click', actions.startEndless);
    }

    window.MenuScreens = {
        init: init,
        icon: icon,
        renderHome: renderHome,
        renderLevels: renderLevels,
        resumeLevel: resumeLevel,
    };
})(window);
