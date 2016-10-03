define(['controls/gridControl'], function (GridControl) {
    var GridDemo = Backbone.View.extend({
        el: '.grid-demo',
        initialize: function () {
            this.render();
        },
        render: function () {
            //el = seletor do container do grid no caso de existirem vários grids na tela
            this.gridControl = new GridControl({ el: '.grid-simple' });

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .grid-simple .select': 'onGridSimpleSelectClick',
            'click .grid-simple .link-name': 'onGridSimpleLinkNameClick',
            'click .remove': 'onGridRemoveClick'
        },
        removerDestaque: function (url, data, row) {
            var scope = this;

            this.gridControl.loader.toggleClass('hidden');
            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                scope.gridControl.loader.toggleClass('hidden');
                scope.gridControl.removeRowAnimated(row, function () {
                    
                });
            }, null, JSON.stringify(data));
        },
        onGridSimpleSelectClick: function (evt) {
            app.utilidades.notificacao().exibirInfo({ title: 'Grid Simple', message: ' Select' });
        },
        onGridRemoveClick: function (evt) {
            var scope = this,
                row = $(evt.currentTarget).parent().parent(),
                url = $(evt.currentTarget).data('url'),
                data = {},
                option;

            if (row.hasClass('disabled')) {
                return;
            }

            option = {};
            option.title = '<strong>Atenção!</strong><br><br>Deseja remover esta registro?';
            option.confirm = function (result) {
                if (result) {
                    scope.removerDestaque(url, data, row);
                }
            };

            app.utilidades.confirm(option);
        },
        onGridSimpleLinkNameClick: function (evt) {
            evt.preventDefault();
            var url = $(evt.currentTarget).attr('href'),
                scope = this,
                opts = {
                    fecharCallBack: scope.onFecharModal,
                    modalReturnCallback: scope.onModalReturn,
                    remote: url
                };

            app.utilidades.modal.abrir(opts);
        },
        onFecharModal: function (evt) {
            //Utilidades.notificacao().exibirInfo({ title: 'Fechar', message: 'Fechou modal' });
        },
        onModalReturn: function (data) {
            app.utilidades.exibirInfo({ title: 'Grid Simples Modal Retorno', message: data.retorno });
        }
    });

    return GridDemo;
});