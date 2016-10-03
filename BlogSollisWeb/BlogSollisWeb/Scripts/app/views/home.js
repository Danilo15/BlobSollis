define(['app'], function () {
    var Home = Backbone.View.extend({
        el: '.home',
        initialize: function () {
            this.render();
        },
        render: function () {
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
        }
    });

    return Home;
});