define([], function () {
    var PedidoRouter = Backbone.Router.extend({
        initialize: function () {
            this.route('pedido/:query/:page', 'pedido', this.pedido);
            this.route('pedido/*random', 'pedido', this.pedido);
        },
        routes: {
            'pedido/:*': 'onHashChange',
            'pedido/*random': 'onHashChange'            
        },
        pedido: function () {
            return true;            
        },
        onHashChange: function () {
            return true;            
        }
    });

    return PedidoRouter;
});