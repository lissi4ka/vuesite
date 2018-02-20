$(document).ready(function () {
    var language = navigator.language || navigator.browserLanguage;
    var userLanguage = getCookie("language") || language;
    var isMenuClicked = false;
    //initialize();

    replaceElementAndSelect(userLanguage);
    $(document).on('click', '.flag ', function () {
        if (!isMenuClicked && !$(this).hasClass('select-flag')) {
            var newLang = $(this).attr('lang-value');
            language = newLang;
            setCookie("language", language);
            languageChange(newLang);
            hideMenu();
        }
        isMenuClicked = false;
    });

    $(document).on('click', "#flag-menu", function () {
        isMenuClicked = true;
        showOrHideMenu();
    });
    
    function showOrHideMenu() {
        if ($('#lang-menu').hasClass('lang-first-init')) {
            $('#lang-menu').removeClass('lang-first-init');
            $('#lang-menu').addClass('animation-lang-show');
        } else {
            if ($('#lang-menu').hasClass('animation-lang-show')) {
                hideMenu();
            } else {
                showMenu();
            }
        }
    }

    function showMenu() {
        $('#lang-menu').removeClass('animation-lang-hide');
        $('#lang-menu').addClass('animation-lang-show');
    }

    function hideMenu() {
        $('#lang-menu').removeClass('animation-lang-show');
        $('#lang-menu').addClass('animation-lang-hide');
    }

    function languageChange(lang) {
        userLanguage = getCookie("language") || language;
        replaceElementAndSelect(lang);
        $(document).trigger('onLanguageChange', [userLanguage]);
        //settingByLanguage(userLanguage);
    }

    function replaceElementAndSelect(lang) {
        var element = ".flag[lang-value='" + lang + "']";

        var selectLang = $(element).clone(true);
        var defoultElement = $('.flag-with-menu').find('.flag').clone(true);

        $(element).replaceWith(defoultElement);
        $('.flag-with-menu').find('.flag').replaceWith(selectLang);

        $('.lang-dropdown').children().children().removeClass('select-flag');
        $(element).addClass('select-flag');
    }
})