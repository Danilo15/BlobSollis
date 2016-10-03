define([], function () {
    var TabControl = Backbone.View.extend({
        el: ".tab-control",
        initialize: function (options) {
            this.options = options;
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }
            this.render();
        },
        iniciar: function () {
            this.render();
        },
        render: function () {
            this.currentTab = null;
            this.tabUI = this.$el.find(".tab-control-nav");
            this.tabItens = this.tabUI.find("li");
            this.callBackChange = this.callBackChange;

            var scope = this;

            this.tabUI.find("a").click(function (e) {
                e.preventDefault();
                if (scope.callBackNotValid && scope.callBackNotValid($(e.currentTarget).parent())) {
                    return false;
                }
                var enabled = !$(e.currentTarget).parent().hasClass("disabled");
                if (enabled) {
                    scope.currentTab = $(e.currentTarget).parent();
                    scope.selectByHash(e.delegateTarget.hash);
                }
            });

            this.tabUI.on("shown.bs.tab", function (e) {
                var enabled = !$(e.currentTarget).parent().hasClass("disabled"),
                    hash;
                if (enabled) {
                    hash = scope.tabUI.find(".active").find("a").attr("href");
                    if (scope.callBackChange) {
                        scope.callBackChange({ retorno: hash });
                    }
                }
            });

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.stopListening();
            app.dispatcher.off(null, null, this);
            this.tabUI.off('shown.bs.tab');
        },
        disable: function () {
            this.tabItens.addClass("disabled");
            this.tabItens.removeClass("active");
        },
        disableTabByIndex: function (index) {
            $(this.tabItens[index]).addClass("disabled");
            $(this.tabItens[index]).removeClass("active");
        },
        enable: function () {
            this.tabItens.removeClass("disabled");
            if (!this.currentTab) {
                this.currentTab = $(this.tabItens[0]);
            }
            this.currentTab.addClass("active");
        },
        selectByHash: function (hash) {
            var link = this.$el.find(".tab-control-nav a[href='{0}']".format(hash));
            this.updateTitle(link.text());
            link.parent().show();
            link.tab("show");
        },
        selectByIndex: function (index) {
            var link = this.$el.find(".tab-control-nav a:eq({0})".format(index));
            this.updateTitle(link.text());
            link.parent().show();
            link.tab("show");
        },
        selectById: function (id) {
            var tab = this.$el.find(".tab-control-nav li[data-id={0}]".format(id));
            this.selectByIndex(tab.index());
        },
        unSelectAll: function () {
            this.tabItens.removeClass("active");
        },
        updateTitle: function (link) {
            var splitedTitle = document.title.split("/");
            document.title = splitedTitle[0] + "/" + link;
        },
        showByHash: function (hash) {
            this.$el.find(".tab-control-nav a[href='{0}']".format(hash)).parent().show();
        },
        setActiveByIndex: function (index) {
            var tab = this.$el.find(".tab-control-nav li:eq({0})".format(index));
            tab.addClass("active");
        },
        getSelectedTabIndex: function () {
            var index = 0;
            index = this.$el.find(".active").first().index();
            return index;
        },
        getSelectedTabId: function () {
            var id = 0;
            id = this.$el.find(".active").data("id");
            return id;
        },
        getSelectedTabHash: function () {
            var hash;
            hash = this.$el.find(".active").find("a").attr("href").replace("#", "");
            return hash;
        },
        getKeyByIndex: function (index) {
            var hash,
                li;

            li = this.$el.find("li:eq({0})".format(index));

            if (li.length) {
                hash = this.$el.find("li:eq({0})".format(index)).find('a').attr('href').replace(/#/, '');
            }

            return hash;
        },
        showByIndex: function (index) {
            this.$el.find(".tab-control-nav a:eq({0})".format(index)).parent().show();
        },
        hideByIndex: function (index) {
            this.$el.find(".tab-control-nav a:eq({0})".format(index)).parent().hide();
        },
        hideByHash: function (hash) {
            this.$el.find(".tab-control-nav a[href='{0}']".format(hash)).hide();
        },
        hasItems: function () {
            var retorno = this.$el.find(".tab-control-nav").find("li").length;
            return retorno;
        },
        hasItem: function (key) {
            var retorno = this.$el.find(".tab-control-nav").find(".{0}".format(key)).length;
            return retorno > 0;
        },
        events: {
            "click .tab-control-nav a": "onTabControlNavClick"
        },
        onTabChange: function (pCallBack) {
            this.callBackChange = pCallBack;
        },
        onTabControlNavClick: function (evt) {
            evt.preventDefault();
            var enabled = !$(evt.currentTarget).parent().hasClass("disabled");

            if (enabled) {
                if (this.options.trackHashChange) {
                    window.location.hash = $(evt.currentTarget)[0].hash.replace(/#/, "#/");
                }
                $(this).tab('show');
            }
        }
    });

    return TabControl;
});