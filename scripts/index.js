$(document).ready(function () {
    var language = getCookie("language") || navigator.language || navigator.browserLanguage;
    var ruUrl = location.origin + '/habrhabr/data/ru.json';
    var enUrl = location.origin + '/habrhabr/data/en.json';

    var en = [], ru = [];
    var vm, vmHeader;

    initialize();

    $(document).on('onLanguageChange',
        function (e, eventInfo) {
            setPageTemplateByLanguage(eventInfo);
        });

    function initialize() {
        createFooterComponent();
        createMainComponent();
        createHeaderComponent(ruUrl, enUrl);

        $.when(getArrayFromJson(ruUrl), getArrayFromJson(enUrl))
            .done(function (a1, a2) {
                ru = a1[0];
                en = a2[0];
                setPageTemplateByLanguage(language);
            });

    }

    function createMainComponent() {
        vm = new Vue({
            el: '#contentPage',
            data: {
                siteHeader: "",
                siteSubHeader: "",
                aboutCompanyHeader: "",
                aboutCompanyText: "",
                ourMissionHeader: "",
                ourMissionText: ""
            },
            updated: function () {
                this.$nextTick(function () {
                    // createCarusel();
                });
            }
        });

        vmHeader = new Vue({
            el: '#header',
            data: {
                aboutCompany: "",
                product: "",
                equipment: "",
                whereBuy: "",
                service: "",
                partners: "",
                contacts: ""
            }
        });
    }

    function setPageTemplateByLanguage(lang) {
        switch (lang) {
            case "en-US":
                findInArray(en, vmHeader);
                findInArray(en, vm);
                break;
            case "ru-RU":
                findInArray(ru, vmHeader);
                findInArray(ru, vm);
                break;
            default:
                findInArray(ru, vmHeader);
                findInArray(ru, vm);
                break;
        }
    }
});
