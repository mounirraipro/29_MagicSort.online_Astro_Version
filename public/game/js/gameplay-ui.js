(function (window) {
    "use strict";

    var previousSecond = -1;
    var previousPercent = -1;
    var previousMessage;
    var objectiveIcons = { efficient: "zap", pure: "sparkles", flow: "flame" };

    function formatTime(milliseconds) {
        var seconds = Math.max(0, Math.ceil(milliseconds / 1000));
        return (
            Math.floor(seconds / 60) +
            ":" +
            String(seconds % 60).padStart(2, "0")
        );
    }

    function updateTimer(remaining, duration) {
        var seconds = Math.max(0, Math.ceil(remaining / 1000));
        var percent =
            duration > 0
                ? Math.max(
                      0,
                      Math.min(100, Math.round((remaining / duration) * 100)),
                  )
                : 0;
        // The engine ticks every frame; only changed seconds/percentages touch the DOM.
        if (seconds !== previousSecond) {
            $("#htmlTimeValue").text(formatTime(remaining));
            $("#htmlGameClock").toggleClass("is-urgent", seconds <= 10);
            previousSecond = seconds;
        }
        if (percent !== previousPercent) {
            $("#htmlTimeProgress").val(percent);
            previousPercent = percent;
        }
    }

    function resetTimer(duration) {
        $("#htmlGameMastery").prop("open", false);
        previousSecond = previousPercent = -1;
        showStatus("");
        updateTimer(duration, duration);
    }

    function showStatus(message) {
        if (message === previousMessage) return;
        previousMessage = message;
        $("#htmlPlayStatus").text(message).toggleClass("is-hidden", !message);
    }

    function renderObjectives(objectives, finished) {
        var html = objectives
            .map(function (objective) {
                var state = objective.complete
                    ? finished
                        ? " is-complete"
                        : " is-on-track"
                    : "";
                return (
                    '<li class="play-goal' +
                    state +
                    '" title="' +
                    objective.description +
                    '">' +
                    MenuScreens.icon(objectiveIcons[objective.id] || "star") +
                    "<span><strong>" +
                    objective.title +
                    "</strong><small>" +
                    objective.progress +
                    "</small></span></li>"
                );
            })
            .join("");
        $("#htmlMasteryObjectives").html(html);
    }

    function renderStars(count) {
        var html = "";
        for (var index = 0; index < 3; index++) {
            html +=
                '<span class="play-star' +
                (index < count ? " is-earned" : "") +
                '">' +
                MenuScreens.icon("star") +
                "</span>";
        }
        $("#htmlResultStars")
            .html(html)
            .attr("aria-label", count + " of 3 stars");
    }

    function renderSetting(selector, label, icon, enabled) {
        $(selector)
            .html(
                MenuScreens.icon(icon) +
                    "<span>" +
                    label +
                    '</span><i class="play-switch" aria-hidden="true"></i>',
            )
            .attr("aria-pressed", String(enabled));
    }

    function renderSettings(sound, music, symbols) {
        renderSetting("#htmlSoundButton", "Sound", "volume-2", sound);
        renderSetting("#htmlMusicButton", "Music", "music-2", music);
        renderSetting("#htmlSymbolsButton", "Symbols", "shapes", symbols);
    }

    window.GameplayUI = {
        formatTime: formatTime,
        updateTimer: updateTimer,
        resetTimer: resetTimer,
        showStatus: showStatus,
        renderObjectives: renderObjectives,
        renderStars: renderStars,
        renderSettings: renderSettings,
    };
})(window);
