define(['utilidades', 'plugins/ak-plugin', 'master'], function (Utilidades, akPlugin, Master) {
    var App,
        browser,
        os,
        version;
    App = function () {
        this.utilidades = {};
        this.master = {};
        this.dispatcher = {};
    };

    BrowserDetect.init();
    browser = BrowserDetect.browser.toLowerCase();
    os = BrowserDetect.OS.toLowerCase().replace(/" "/, "");
    version = BrowserDetect.version;
    if (!Backbone.History.started) {
        Backbone.history.start({ pushState: false });
    }

    $("html").addClass("{0} {1}-{2} {3}".format(browser, browser, version, os));
    if (!window.app) {
        window.app = new App();

        _.extend(window.app.dispatcher, Backbone.Events);

        window.app.utilidades = Utilidades;
        window.app.master = new Master(window.app);
    }

    return window.app;
});