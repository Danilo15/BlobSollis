define(['app', 'controls/gridControl'], function (app, GridControl) {
    var HomeAdm = Backbone.View.extend({
        el: '.home-adm',
        initialize: function (options) {
            app.master.activePage = this;
            this.modalWidth = 820;
            this.render();
        },
        render: function () {
            this.gridControl = new GridControl({ el: '.grid-ph' });
            return this;
        },
        viewAtualizar: function (data) {
            if (data.GridHtml) {
                this.$el.find('.grid-ph').empty().append(data.GridHtml);
            }
            this.gridControl.dispose();
            this.render();
        },
        dispose: function () {
            this.undelegateEvents();
            this.destroy();
            $(this.el).removeData().unbind();
        },
        buscar: function () {
            var url = '/Adm/Home/Buscar';

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                this.viewAtualizar(data);
            }.bind(this), null, {});
        },
        remover: function (url, data, row) {
            this.gridControl.loader.toggleClass('hidden');

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
                this.gridControl.loader.toggleClass('hidden');
                this.gridControl.removeRowAnimated(row, function () {
                    this.viewAtualizar(result);
                });
            }.bind(this), function (result) {
                this.gridControl.loader.toggleClass('hidden');
                app.utilidades.notificacao().exibirError({ mensagem: result.Mensagem });
            }.bind(this), data);
        },
        events: {
            'click .btn-adicionar-novo': 'onBtnAdicionarNovoClick',
            'click .glyphicon-pencil': 'onPencilClick',
            'click .grid-remover': 'onGridRemoverClick',
        },
        onGridRemoverClick: function (evt) {
            var target = $(evt.currentTarget),
                row = target.parent().parent(),
                url = target.parent().attr('data-url'),
                title = target.attr('data-title'),
                message = target.attr('data-message'),
                data = {},
                option;

            if (row.hasClass('disabled')) {
                return;
            }

            this.gridControl.selectRow(row);

            option = {};
            option.title = title;
            option.message = message;
            option.confirm = $.proxy(this.remover, this, url, data, row);

            app.utilidades.confirm(option);
        },
        onPencilClick: function (evt) {
            var target = $(evt.currentTarget),
                        url = target.parent().attr('data-url');

            var opts = {
                remote: url,
                title: 'Editar registro',
                size: { width: this.modalWidth },
                returnCallback: this.onModalReturn.bind(this)
            }

            app.utilidades.modal.abrir(opts);
        },
        onBtnAdicionarNovoClick: function (evt) {
            var target = $(evt.currentTarget),
                url = target.attr('data-url');

            var opts = {
                remote: url,
                title: 'Novo registro',
                size: { width: this.modalWidth },
                returnCallback: this.onModalReturn.bind(this),
                fecharCallBack: this.onModalFechar.bind(this)
            }

            app.utilidades.modal.abrir(opts);
        },
        onModalReturn: function () {
            this.buscar();
        },
        onModalFechar: function () {
        }
    });

    return HomeAdm;
});