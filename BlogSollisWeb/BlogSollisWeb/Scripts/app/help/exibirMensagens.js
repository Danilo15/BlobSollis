define([], function () {
    var ExibirMensagens = Backbone.View.extend({
        el: '.exibir-mensagens',
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
            'click .btnSucesso': 'onBtnSucessoClick',
            'click .btnErro': 'onBtnErroClick',
            'click .btnInfo': 'onBtnInfoClick',
            'click .btnAviso': 'onBtnAvisoClick'
        },
        onBtnSucessoClick: function(evt) {
            app.utilidades.exibirSucesso('Sucesso teste');
        },
        onBtnErroClick: function (evt) {
            app.utilidades.exibirError('Error teste');
        },
        onBtnInfoClick: function (evt) {
            app.utilidades.exibirInfo('Info teste');
        },
        onBtnAvisoClick: function (evt) {
            app.utilidades.exibirAviso('Aviso teste');
        }
    });

    return ExibirMensagens;
});