var ruFooterUrl = location.origin + '/habrhabr/data/footer_ru.json';
var enFooterUrl = location.origin + '/habrhabr/data/footer_en.json';

var vmPageHeader, vueFooter;
var ruFooterInfo = [], enFooterInfo = [];
var ruHeaderInfo = [], enHeaderInfo = [];

$(document).on('onLanguageChange',
    function (e, eventInfo) {
        setPageTemplateByLanguageMain(eventInfo);
    });

Vue.component('habr-header',
    {
        props: ['site-header', 'site-sub-header'],
        template:
            `<div class="container">
                <div class= "page-title-bg-holder hero-wrapper">
                    <h2>{{ siteHeader }}</h2>
                    <p>{{siteSubHeader}}</p>
                </div>
            </div>`
    });


function createHeaderComponent(ruUrl, enUrl) {
    vmPageHeader = new Vue({
        el: '#vueHeader',
        data: {
            siteSubHeader: "",
            siteHeader: ""
        },
        created: function () {
            this.loadData();
        },
        methods: {
            loadData() {
                $.when(
                        getArrayFromJson(ruUrl),
                        getArrayFromJson(enUrl))
                    .done(function (a1, a2) {
                        ruHeaderInfo = a1[0];
                        enHeaderInfo = a2[0];
                        setPageTemplateByLanguageMain();
                    });
            }
        }
    });
}


Vue.component('habr-footer',
    {
        props: ['get-in-touch', 'region', 'street', 'email', 'second-email', 'phone', 'mobile-phone', 'find-us',
            'first-line', 'second-line', 'first-part-last-line', 'color-part-last-line', 'third-part-last-line'],
        template:
            `<div>
                <section class="page-widgets-holder">
                    <div class="content">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-4 ">
                                    <h3>{{getInTouch}}</h3>
                                    <div class="contact-info">
                                        <ul>
                                            <li><a class="ci-adress">{{region}}<br> {{street}}</a></li>
                                            <li><a class="ci-mail"> {{email}}</a></li>
                                            <li><a class="ci-mail"> {{secondEmail}}</a></li>
                                            <li> <a v-bind:href="'tel:' + phone" class="ci-phone">  {{phone}} </a></li>
                                            <li> <a v-bind:href="'tel:' + mobilePhone" class="ci-phone">  {{mobilePhone}} </a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-4 ">
                                </div>
                                <div class="col-md-4 ">
                                    <h3>{{findUs}}</h3>
                                    <div class="social-links">
                                        <ul>
                                            <li><a href="#" target="_blank" class="transition"><i class="fa fa-facebook"></i></a></li>
                                            <li><a href="#" target="_blank" class="transition"><i class="fa fa-vk"></i></a></li>
                                            <li><a href="#"  target="_blank" class="transition"><i class="fa fa-twitter"></i></a></li>
                                            <li><a href="#"  target="_blank" class="transition"><i class="fa fa-youtube"></i></a></li>
                                            <li><a href="#"  target="_blank" class="transition"><i class="fa fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- section end -->
                <!--================= footer  ================-->
                    <section  class="page-widgets-holder footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3 ">
                                    <h4>{{firstLine}}</h4>
                                    <h5>{{secondLine}}</h5>
                                </div>
                                <div class="col-md-9">
                                    <div class="policy-box">
                                        <p>{{firstPartLastLine}} <span>{{colorPartLastLine}} </span> {{thirdPartLastLine}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            </div>`
    });


function createFooterComponent() {
    vueFooter = new Vue({
        el: '#vueFooter',
        data: {
            footerInfo: {
                getInTouch: "",
                region: "",
                street: "",
                email: "",
                secondEmail: "",
                phone: "",
                mobilePhone: "",
                findUs: "",
                firstLine: "",
                secondLine: "",
                firstPartLastLine: "",
                colorPartLastLine: "",
                thirdPartLastLine: ""
            }
        },
        created: function () {
            this.loadData();
        },
        methods: {
            loadData() {
                $.when(getArrayFromJson(ruFooterUrl),
                    getArrayFromJson(enFooterUrl)
                ).done(function (a1, a2) {
                    ruFooterInfo = a1[0];
                    enFooterInfo = a2[0];
                    setPageTemplateByLanguageMain();
                });
            }
        }
    });
}

function setPageTemplateByLanguageMain(lang) {
    var userLanguage = lang || getCookie("language") || language;
    switch (userLanguage) {
        case "en-US":
            findInArray(enHeaderInfo, vmPageHeader);
        findInArray(enFooterInfo, vueFooter.footerInfo);
        break;
        case "ru-RU":
            findInArray(ruHeaderInfo, vmPageHeader);
        findInArray(ruFooterInfo, vueFooter.footerInfo);
        break;
        default:
            findInArray(ruHeaderInfo, vmPageHeader);
        findInArray(ruFooterInfo, vueFooter.footerInfo);
        break;
    }
}

function findInArray(langArray, component) {
    $.each(langArray,
        function (index, value) {
            Object.keys(value).forEach(function (key) {
                var val = value[key];
                if ($.isArray(val)) {
                    component[key] = val.join(", ");
                } else {
                    component[key] = value[key];
                }
            });
        });
}


function getArrayFromJson(url) {
    return $.ajax({
        url: url,
        dataType: 'json'
    });
}