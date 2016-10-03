define([], function () {
    var WizardMenuControl = Backbone.View.extend({
        el: ".wizard-menu",
        initialize: function (options) {
            this.options = options || {};
            this.indexAtual = -1;
            this.itens = this.$el.find(".nav").find("li:not(.hidden)").find("a");
            this.total = this.itens.length;
            this.changeCallback = null;
            this.validateViewCallback = null;
            this.backCallback = null;

            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }

            this.render();
        },
        render: function () {
            return this;
        },
        dispose: function () {
            this.changeCallback = null;
            this.backCallback = null;
            this.validateViewCallback = null;
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        validate: function (callback) {
            this.validateViewCallback = callback;
        },
        change: function (callback) {
            this.changeCallback = callback;
        },
        back: function (callback) {
            this.backCallback = callback;
        },
        enable: function () {
            this.$el.find(".disabled").removeClass("disabled");

            this.enableDisable(this.indexAtual);

            if (this.indexAtual > -1) {
                $(this.itens[this.indexAtual]).parent().addClass("btn-primary");
            }
        },
        disableNext: function () {
            this.$el.find(".next").addClass("disabled");
            //this.$el.find(".previous").enableInput();
        },
        disablePrev: function () {
            this.$el.find(".previous").addClass("disabled");
            this.$el.find(".previous").disableInput();
        },
        disable: function () {
            this.$el.find(".btn-primary").removeClass("btn-primary");
            this.$el.find("*").addClass("disabled");
        },
        getActiveTabIndex: function () {
            var retorno;

            retorno = this.$el.find(".btn-primary").index();

            return retorno;
        },
        getActiveTabKey: function () {
            var retorno;
            retorno = this.$el.find(".btn-primary").data("key");
            return retorno;
        },
        updateTitle: function (link) {
            var splitedTitle = document.title.split("/");
            document.title = splitedTitle[0] + "/" + link;
        },
        clear: function () {
            this.indexAtual = -1;
            this.$el.find(".btn-primary").removeClass("btn-primary");
        },
        highLight: function (index) {
            this.indexAtual = index;
            this.itens.each(function () {
                $(this).parent().removeClass("btn-primary");
            });
            var li = $(this.itens[index]).parent().addClass("btn-primary");

            return li;
        },
        highLightByKey: function (key) {
            var li,
                index = 0;

            li = this.$el.find("[data-key='{0}']".format(key));
            index = li.index();
            this.highLight(index);
            this.enableDisable(index);

            return li;
        },
        enableDisable: function (index) {
            if (index === (this.total - 1)) {
                this.disableNext();
            } else if (index === 0) {
                this.disablePrev();
                this.$el.find(".next").removeClass("disabled");
            } else {
                this.$el.find(".previous").removeClass("disabled").attr("disabled", false);
                this.$el.find(".next").removeClass("disabled").attr("disabled", false);
            }
        },
        selectByKey: function (key) {
            var li = this.highLightByKey(key),
                index = li.index();

            this.enableDisable(index);

            if (this.changeCallback) {
                this.changeCallback({ key: key, index: this.indexAtual, url: $(this.itens[index]).attr("href") });
            }
        },
        selectIndex: function (index) {
            var li = this.highLight(index),
                key = li.data("key");
            
            this.enableDisable(index);
            if (this.changeCallback) {
                this.changeCallback({ key: key, index: this.indexAtual, url: $(this.itens[index]).attr("href") });
            }
        },
        update: function () {
            this.itens = this.$el.find(".nav").find("li:not(.hidden)").find("a");
            this.total = this.itens.length;
        },
        events: {
            "click .previous": "onPreviousClick",
            "click .next": "onNextClick",
            "click .nav li a": "onNavItemClick"
        },
        onPreviousClick: function (evt) {
            var key = $(this.itens[this.indexAtual]).parent().data("key");
            if ($(evt.currentTarget).hasClass("disabled")) {
                return;
            }

            if (this.backCallback) {
                this.backCallback(key);
                return false;
            }

            if (this.indexAtual > 0) {
                this.indexAtual -= 1;
                this.selectIndex(this.indexAtual);
            } else {
                evt.preventDefault();
            }
        },
        onNextClick: function (evt) {
            if ($(evt.currentTarget).hasClass("disabled")) {
                return;
            }

            if (this.indexAtual < this.total - 1) {
                if (this.validateViewCallback) {
                    var key = $(this.itens[this.indexAtual]).parent().data("key"),
                        url = $(this.itens[this.indexAtual]).attr("href"),
                        validou = this.validateViewCallback({ key: key, index: this.indexAtual, url: url });

                    if (!validou) {
                        return false;
                    }
                }

                this.indexAtual += 1;
                this.selectIndex(this.indexAtual);
            } else {
                evt.preventDefault();
            }
        },
        onNavItemClick: function (evt) {
            evt.preventDefault();
        }
    });

    return WizardMenuControl;
});