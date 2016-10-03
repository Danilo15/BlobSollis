//DOCUMENTATION AT : https://github.com/RobinHerbots/jquery.inputmask
define(['Scripts/plugins/inputmask',
    'Scripts/plugins/inputmask.date.extensions',
    'Scripts/plugins/inputmask.numeric.extensions',
    'Scripts/plugins/inputmask.phone.extensions',
    'Scripts/plugins/inputmask.regex.extensions',
    'Scripts/plugins/jquery.inputmask'], function () {
        var MaskBBControl = Backbone.View.extend({
            el: ".mask",
            initialize: function (options) {
                this.options = options || {};
                if (this.options.el) {
                    this.el = this.options.el;
                    this.$el = $(this.el);
                }

                this.render();
            },
            render: function () {
                var options = this.options.options || {};

                if (this.options.format)
                    this.$el.inputmask(this.options.format, options);
                else
                    this.$el.inputmask(options);

                return this;
            },
            dispose: function () {
                this.undelegateEvents();
                $(this.el).removeData().unbind();
            },
        });

        return MaskBBControl;
    });