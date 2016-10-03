define([], function () {
    var AbrirModalSimples = Backbone.View.extend({
        el: '.abrir-modal-simples',
        initialize: function () {
        },
        render: function () {
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .btnModalSimples': 'onBtnModalSimplesClick'
        },
        onBtnModalSimplesClick: function (evt) {

            var options = {};
            options.fecharCallBack = $.proxy(this.onModalFechar, this);
            options.returnCallback = $.proxy(this.onModalReturn, this);
            options.remote = '/Help/Modal';
            options.title = 'Modal';
            
            app.utilidades.modal.abrir(options);
        },
        onModalFechar: function (evt) {
            app.utilidades.exibirInfo({ title: 'Fechar', message: 'Fechou modal' });
        },
        onModalReturn: function (data) {
            app.utilidades.exibirInfo({ title: 'Modal retorno', message: data.toString() });
        },
    });

    return AbrirModalSimples;
});