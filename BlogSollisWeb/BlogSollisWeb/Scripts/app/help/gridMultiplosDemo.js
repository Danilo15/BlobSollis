define(['controls/gridControl'], function (GridControl) {
    var GridMultiplosDemo = Backbone.View.extend({
        el: '.grid-multiplos-demo',
        initialize: function () {

            //el = seletor do container do grid no caso de existirem vários grids na tela
            this.gridControlFirst = new GridControl({ el: '.grid-first' });

            this.gridControlSecond = new GridControl({ el: '.grid-second' });
        },
        render: function () {
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .grid-first .select': 'onGridFirstSelectClick',
            'click .grid-first .link-name': 'onGridFirstLinkNameClick',
            'click .grid-second .select': 'onGridSecondSelectClick',
            'click .grid-second .link-name': 'onGridSecondLinkNameClick'
        },
        onGridFirstSelectClick: function (evt) {
            app.utilidades.exibirInfo({ title: 'Grid First', message: ' Select' });
        },
        onGridSecondSelectClick: function (evt) {
            app.utilidades.exibirInfo({ title: 'Grid Second', message: ' Select' });
        },
        onGridFirstLinkNameClick: function (evt) {
            evt.preventDefault();
            var url = $(evt.currentTarget).attr('href'),
                scope = this,
                opts = {
                    fecharCallBack: scope.onFirstFecharModal,
                    modalReturnCallback: scope.onFirstModalReturn,
                    remote: url
                };

            app.utilidades.modal.abrir(opts);
        },
        onGridSecondLinkNameClick: function (evt) {
            evt.preventDefault();
            var url = $(evt.currentTarget).attr('href'),
                scope = this,
                opts = {
                    fecharCallBack: scope.onSecondFecharModal,
                    modalReturnCallback: scope.onSecondModalReturn,
                    remote: url
                };

            app.utilidades.modal.abrir(opts);
        },
        onFirstFecharModal: function (evt) {
            //Utilidades.notificacao().exibirInfo({ title: 'Fechar', message: 'Fechou modal' });
        },
        onFirstModalReturn: function (data) {
            app.utilidades.notificacao().exibirInfo({ title: 'Grid First Modal Retorno', message: data.retorno });
        },
        onSecondFecharModal: function (evt) {
            //Utilidades.notificacao().exibirInfo({ title: 'Fechar', message: 'Fechou modal' });
        },
        onSecondModalReturn: function (data) {
            app.utilidades.notificacao().exibirInfo({ title: 'Grid Second Modal Retorno', message: data.retorno });
        }
    });

    return GridMultiplosDemo;
});