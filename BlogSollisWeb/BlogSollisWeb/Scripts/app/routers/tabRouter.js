define([], function () {
    var TabRouter = Backbone.Router.extend({
        initialize: function () {
            this.route('tab/:query', 'tab', this.tab);
        },
        routes: {
            'tab/:query': 'onHashChange'
        },
        tab: function () {            
            return true;            
        },
        onHashChange: function () {            
            return true;            
        }
    });

    return TabRouter;
});