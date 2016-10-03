define(['app', 'controls/gridControl'], function (app, GridControl) {
    var Posts = Backbone.View.extend({
        el: '.posts-detalhes',
        initialize: function (options) {
            app.master.activePage = this;
            this.render();
        },
        render: function () {
            this.gridControl = new GridControl({ el: '.grid-ph', formBusca: this.formBusca });
            this.idPost = app.utilidades.convertToInt(this.$el.find(".idpost").val(), 0);

            this.form = this.$el.find('.formulario');

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            this.destroy();
            $(this.el).removeData().unbind();
        },
        validar: function () {
            this.form.validate();
            return this.form.valid();
        },
        salvar: function () {
            var url = this.form.attr('action'),
                dataPost = this.form.serializeObject();

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
                app.dispatcher.trigger(app.utilidades.EnumEventos.onModalReturn, { retorno: result, adicionouNovo: (this.idPost === 0) });
            }.bind(this), null, dataPost);
        },
        atualizarUrlFormulario: function (valor) {
            var novoValor = this.form.attr('action').format(valor);

            this.form.attr('action', novoValor);
        },
        events: {
            'click .btn-salvar': 'onBtnSalvarClick',
            'click .btn-salvar-como-rascunho': 'onBtnSalvarComoRascunhoClick',
        },
        onBtnSalvarComoRascunhoClick: function (evt) {
            evt.preventDefault();
            var valid = this.validar();

            this.atualizarUrlFormulario('true');

            if (valid) {
                this.salvar();
            }
        },
        onBtnSalvarClick: function (evt) {
            evt.preventDefault();
            var valid = this.validar();

            this.atualizarUrlFormulario('false');

            if (valid) {
                this.salvar();
            }
        }
    });

    return Posts;
});