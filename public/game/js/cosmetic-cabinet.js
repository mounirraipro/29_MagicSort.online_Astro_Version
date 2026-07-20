(function(window) {
    'use strict';

    var imageCache = {};

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
            var selected = equipped === item.id;
            var style = '';
            if (type === 'background') {
                var previewUrl = new URL(versionGameAsset(item.src), window.location.href).href;
                style = ' style="--cabinet-image:url(' + previewUrl + ')"';
            }
            var state = selected ? 'Equipped' : (owned ? 'Select' : item.cost + ' Essence');
            html += '<button class="cabinet-item cabinet-item--' + type + (selected ? ' is-selected' : '') + (owned ? ' is-owned' : ' is-locked') + '" type="button" data-cosmetic-type="' + type + '" data-cosmetic-id="' + item.id + '"' + style + ' aria-label="' + item.title + ', ' + state + '">';
            html += '<span class="cabinet-item__preview cabinet-item__preview--' + item.id + '"></span>';
            html += '<strong>' + item.title + '</strong><small>' + state + '</small></button>';
        }
        return html;
    }

    function render() {
        var profile = PlayerProfile.get();
        var achievementCount = Object.keys(profile.achievements).length;
        var achievementTotal = GameAchievements.getAll().length;
        var achievementPercent = achievementTotal > 0 ? Math.round((achievementCount / achievementTotal) * 100) : 0;
        $('#htmlEssenceValue, #htmlCabinetEssence, #htmlMenuEssence').text(profile.essence);
        $('#htmlCabinetAchievements').text(achievementCount + '/' + achievementTotal + ' achievements');
        $('#htmlMenuAchievementCount').text(achievementCount + '/' + achievementTotal);
        $('#htmlMenuAchievementFill').css('width', achievementPercent + '%');
        $('#htmlCabinetBackgrounds').html(renderItems('background'));
        $('#htmlCabinetEffects').html(renderItems('effect'));
    }

    function choose(type, id) {
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
            choose($(this).data('cosmetic-type'), $(this).data('cosmetic-id'));
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
