(function(window) {
    'use strict';

    var imageCache = {};
    var activeType = 'background';
    var selection = { background: null, effect: null };

    function findItem(type, id) {
        return CosmeticCatalog.find(type, id);
    }

    function applyBackground(id) {
        var item = findItem('background', id) || CosmeticCatalog.getItems('background')[0];
        if (item.id === 'classic' && window.loader) {
            setThemeBackgroundImage(loader.getResult('magicTableBg'));
            return;
        }
        if (imageCache[item.id]) {
            setThemeBackgroundImage(imageCache[item.id]);
            return;
        }
        var image = new Image();
        image.onload = function() {
            imageCache[item.id] = image;
            if (PlayerProfile.get().equipped.background === item.id) {
                setThemeBackgroundImage(image);
            }
        };
        image.src = versionGameAsset(item.src);
    }

    function renderItems(type) {
        var profile = PlayerProfile.get();
        var items = CosmeticCatalog.getItems(type);
        var equipped = profile.equipped[type];
        var html = '';
        for (var index = 0; index < items.length; index++) {
            var item = items[index];
            var owned = PlayerProfile.isOwned(type, item.id);
            var selected = selection[type] === item.id;
            var style = '';
            if (type === 'background') {
                var previewUrl = new URL(versionGameAsset(item.src), window.location.href).href;
                style = ' style="--cabinet-image:url(' + previewUrl + ')"';
            }
            var state = equipped === item.id ? 'Applied' : (owned ? 'Owned' : item.cost + ' Essence');
            var badge = owned ? state : MenuScreens.icon('gem') + item.cost;
            html += '<button class="cabinet-item cabinet-item--' + type + (selected ? ' is-selected' : '') + (owned ? ' is-owned' : ' is-locked') + '" type="button" data-cosmetic-type="' + type + '" data-cosmetic-id="' + item.id + '"' + style + ' aria-pressed="' + selected + '" aria-label="' + item.title + ', ' + state + '">';
            html += '<span class="cabinet-item__preview cabinet-item__preview--' + item.id + '"></span>';
            html += '<strong>' + (item.label || item.title) + '</strong><small>' + badge + '</small></button>';
        }
        return html;
    }

    function render() {
        var profile = PlayerProfile.get();
        selection.background = selection.background || profile.equipped.background;
        selection.effect = selection.effect || profile.equipped.effect;
        var achievementCount = Object.keys(profile.achievements).length;
        var achievementTotal = GameAchievements.getAll().length;
        $('#htmlEssenceValue, #htmlCabinetEssence, #htmlMenuEssence, #htmlLevelEssence').text(profile.essence);
        $('#htmlCabinetAchievements').text(achievementCount + '/' + achievementTotal + ' achievements');
        $('#htmlCabinetBackgrounds').html(renderItems('background'));
        $('#htmlCabinetEffects').html(renderItems('effect'));
        renderSelection();
    }

    function renderSelection() {
        var item = findItem(activeType, selection[activeType]);
        if (!item) return;
        var profile = PlayerProfile.get();
        var owned = PlayerProfile.isOwned(activeType, item.id);
        var equipped = profile.equipped[activeType] === item.id;
        var category = activeType === 'background' ? 'theme' : 'effect';
        $('#htmlCabinetSelection').text(item.title);
        $('#htmlCabinetSelectionState').text(equipped ? 'Current ' + category : owned ? 'Owned' : item.cost + ' Essence');
        $('#htmlCabinetApply').prop('disabled', equipped).text(equipped ? 'Applied' : owned ? 'Apply ' + category : 'Unlock for ' + item.cost);
    }

    function selectItem(type, id) {
        if (!findItem(type, id)) return;
        selection[type] = id;
        // Selecting previews the choice; only the explicit action below can spend Essence.
        $('[data-cosmetic-type="' + type + '"]').each(function() {
            var selected = this.dataset.cosmeticId === id;
            $(this).toggleClass('is-selected', selected).attr('aria-pressed', String(selected));
        });
        renderSelection();
    }

    function switchTab(type) {
        if (type !== 'background' && type !== 'effect') return;
        activeType = type;
        $('[data-cabinet-tab]').each(function() {
            var selected = this.dataset.cabinetTab === type;
            $(this).attr('aria-selected', String(selected)).attr('tabindex', selected ? '0' : '-1');
        });
        $('#htmlThemesPanel').prop('hidden', type !== 'background');
        $('#htmlEffectsPanel').prop('hidden', type !== 'effect');
        $('.atelier-scroll').scrollTop(0);
        renderSelection();
    }

    function choose(type, id) {
        if (type !== 'background' && type !== 'effect') return;
        var item = findItem(type, id);
        if (!item) {
            return;
        }
        if (!PlayerProfile.isOwned(type, id)) {
            var purchase = PlayerProfile.purchase(type, id, item.cost);
            if (!purchase.ok) {
                setStatus('You need ' + (item.cost - purchase.balance) + ' more Essence.');
                playSound('soundError');
                return;
            }
            setStatus(item.title + ' unlocked.');
            playSound('soundScore');
        } else {
            setStatus(item.title + ' equipped.');
            playSound('soundButton');
        }
        PlayerProfile.equip(type, id);
        if (type === 'background') {
            applyBackground(id);
        }
        render();
    }

    function setStatus(message) {
        $('#htmlCabinetStatus').text(message).toggleClass('is-hidden', !message);
        window.clearTimeout(setStatus.timer);
        setStatus.timer = window.setTimeout(function() {
            $('#htmlCabinetStatus').addClass('is-hidden');
        }, 2600);
    }

    function init() {
        $('#htmlShopMenu').on('click', '[data-cosmetic-type]', function() {
            selectItem(this.dataset.cosmeticType, this.dataset.cosmeticId);
        });
        $('#htmlCabinetApply').on('click', function() { choose(activeType, selection[activeType]); });
        $('[data-cabinet-tab]').on('click', function() { switchTab(this.dataset.cabinetTab); });
        $('[data-cabinet-tab]').on('keydown', function(event) {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(event.key) === -1) return;
            event.preventDefault();
            var type = event.key === 'Home' ? 'background' : event.key === 'End' ? 'effect' : activeType === 'background' ? 'effect' : 'background';
            switchTab(type);
            $('[data-cabinet-tab="' + type + '"]').focus();
        });
        render();
        applyBackground(PlayerProfile.get().equipped.background);
    }

    window.CosmeticCabinet = {
        init: init,
        render: render,
        applyEquippedBackground: function() {
            applyBackground(PlayerProfile.get().equipped.background);
        },
        getEquippedEffect: function() {
            return PlayerProfile.get().equipped.effect;
        },
        getCatalog: function() { return CosmeticCatalog.getAll(); }
    };
})(window);
