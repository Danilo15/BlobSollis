define([], function () {
    var PaginationControl = Backbone.View.extend({
        el: ".pagination-control",
        initialize: function () {
            this.render();
        },
        iniciar: function (options) {
            var i;
            this.defaults = {};
            this.currentPage = -1;
            for (i in this.defaults) {
                if (this.defaults.hasOwnProperty(i)) {
                    if (options[i] !== undefined) { this.defaults[i] = options[i]; }
                }
            }
            this.render();
        },
        render: function () {
            this.currentButton = undefined;
            this.selectCallback = undefined;
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            "click li a[href]": "onPageClick"
        },
        disable: function () {
            this.unSelectPages();
            this.$el.find("li").addClass("disabled");
        },
        enable: function () {
            this.unSelectPages();
            this.$el.find("li").removeClass("disabled");
            this.$el.find(".page-loader").find(".loader").addClass("hidden");
            this.$el.find(".page-loader").find("span").show();
        },
        unSelectPages: function () {
            this.$el.find(".pagination-active").removeClass("pagination-active");
        },
        selectIndex: function (index) {
            var btn = this.$el.find(".page:eq({0})".format(index));
            this.selectPage(btn);
        },
        selectPage: function (btn) {
            this.unSelectPages();
            btn.addClass("pagination-active");
        },
        showLoading: function () {
            this.currentButton.addClass("page-loader");
            this.currentButton.find(".loader").removeClass("hidden");
            this.currentButton.find("span").hide();
            this.disable();
        },
        hideLoading: function () {
            this.currentButton.removeClass("page-loader");
            this.currentButton.find(".loader").addClass("hidden");
            this.currentButton.find("span").show();
            this.enable();
        },
        onPageClick: function (evt) {
            evt.preventDefault();

            var scope = this,
                btn = $(evt.currentTarget);

            this.currentButton = btn;

            if (btn.parent().hasClass("disabled") || btn.hasClass("pagination-active")) {
                return;
            }

            if (btn.hasClass("page")) {
                scope.selectPage(btn);
                scope.currentPage = app.utilidades.convertToInt(btn.text(), 0);
            } else {
                scope.currentPage = app.utilidades.convertToInt(scope.$el.find(".pagination-active").find("span").text(), 0);

                if (btn.hasClass("page-prev")) {
                    scope.currentPage -= 1;
                } else {
                    scope.currentPage += 1;
                }
            }

            if (scope.selectCallback) {
                scope.selectCallback(btn, scope.currentPage);
            }
        },
        onSelect: function (callBack) {
            this.selectCallback = callBack;
        }
    });

    return PaginationControl;
});