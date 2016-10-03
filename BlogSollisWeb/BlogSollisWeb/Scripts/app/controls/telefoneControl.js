define(["Scripts/app/controls/gridControl"], function (GridControl) {
    var TelefoneControl = Backbone.View.extend({
        el: ".telefone-control",
        initialize: function () {
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ADICIONAR, $.proxy(this.onAdicionarCancelar, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.CTRL_SHIFT_S, $.proxy(this.onShortCutSalvar, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.DEL, $.proxy(this.onShortCutRemover, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ENTER, $.proxy(this.onGridEnter, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.DOWN, $.proxy(this.onGridDown, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.UP, $.proxy(this.onGridUp, this));
            this.render();
        },
        render: function () {
            if (this.options.el) {
                this.el = this.options.el;
                if ($(".modal-body .ph").children().length) {
                    this.$el = $(".modal-body .ph").find(this.el);
                }
            }

            this.form = $("form.formulario");
            this.form.validate();

            this.gridControl = new GridControl({ el: this.el, readonly: this.options.readonly });
            this.gridControl.$el.find(".telefone-novo").find("input[type=text]").val("");
            this.delegateEvents(this.events);

            if (this.options.readonly) {
                this.$el.find(".btn-adicionar-novo").remove();
                this.$el.find(".btn-selecionar").remove();
                this.$el.find(".btn-remover").remove();
            }

            return this;
        },
        dispose: function () {
            this.gridControl.dispose();
            this.gridControl = null;
            this.undelegateEvents();
            this.stopListening();
            app.dispatcher.off(null, null, this);
            $(this.el).removeData().unbind();
        },
        enable: function () {
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ADICIONAR, $.proxy(this.onAdicionarCancelar, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.CTRL_SHIFT_S, $.proxy(this.onShortCutSalvar, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.DEL, $.proxy(this.onShortCutRemover, this));
        },
        disable: function () {
            this.stopListening();
        },
        validar: function () {
            this.form.validate();
            var valid = this.form.valid();
            return valid;
        },
        viewAtualizar: function (data) {
            if (data.GridHtml) {
                this.gridControl.dispose();
                this.gridControl.$el.empty().append(data.GridHtml);
            }

            if (data.Json && data.Json.telefoneSelecionado) {
                this.render();
                this.marcarGrid(data.Json.telefoneSelecionado.idTelefone);
                return;
            }

            this.render();
        },
        marcarGrid: function (id) {
            var row = this.gridControl.$el.find("tr[data-idtelefone={0}]".format(id));
            this.gridControl.selectRow(row);
        },
        esconderLinhaNovo: function () {
            var icon = this.$el.find(".btn-adicionar-novo").find("i"),
                linhaNovo = this.$el.find(".telefone-novo");

            linhaNovo.find("input[type=text]").val("");
            linhaNovo.find("input").attr("disabled", true);
            linhaNovo.addClass("hidden");
            icon.removeClass("icon-minus").addClass("icon-plus");
        },
        exibirLinhaNovo: function () {
            var icon = this.$el.find(".btn-adicionar-novo").find("i"),
                linhaNovo = this.$el.find(".telefone-novo");

            linhaNovo.find("select").val("");
            linhaNovo.find("input,select").attr("disabled", false);
            linhaNovo.find(".ddi").val("55");
            linhaNovo.removeClass("hidden");
            icon.removeClass("icon-plus").addClass("icon-minus");
        },
        adicionarNovo: function () {
            if (!this.$el.find(".telefone-novo").hasClass("hidden")) {
                this.esconderLinhaNovo();
            } else {
                this.exibirLinhaNovo();
            }
            this.$el.find("tr[data-idtelefone]").removeClass("selected-row");
            this.normalizarLinha();
            this.$el.find("tr.telefone-novo").find(":input[type='text']:enabled:visible:eq(1)").focus();
        },
        salvar: function () {
            var url = this.form.attr("action"),
                dataPost = {},
                scope = this;

            dataPost = this.form.serializeObject();
            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                scope.viewAtualizar(data);
                app.dispatcher.trigger(app.utilidades.EnumEventos.onPartialSave, { retorno: data });
            }, null, JSON.stringify(dataPost), true);
        },
        salvarLinha: function () {
            var linhaSelecionada = this.$el.find(".selected-row"),
                idTelefoneTipoNome = linhaSelecionada.find(".ddl-telefone-tipo").find("option:selected").text(),
                ddi = linhaSelecionada.find("input.ddi").val(),
                ddd = linhaSelecionada.find("input.ddd").val(),
                numero = linhaSelecionada.find("input.numero").val(),
                ramal = linhaSelecionada.find("input.ramal").val();

            linhaSelecionada.find("span.telefone-tipo").text(idTelefoneTipoNome);
            linhaSelecionada.find("span.telefone-tipo").removeClass("hidden-force");
            linhaSelecionada.find("span.ddi").text(ddi);
            linhaSelecionada.find("span.ddd").text(ddd);
            linhaSelecionada.find("span.numero").text(numero);
            linhaSelecionada.find("span.ramal").text(ramal);

            this.normalizarLinha();
        },
        telefoneColClasseObter: function () {
            var retorno = [],
                Telefone = {};

            this.$el.find("tr[data-idtelefone]").each(function () {
                var elmt = $(this);
                Telefone = {};
                Telefone.IdTelefone = elmt.find(".linha-idtelefone").val();
                Telefone.IdTelefoneTipo = elmt.find(".telefone-tipo").data("idtelefonetipo");
                Telefone.DDI = elmt.find(".ddi").text();
                Telefone.DDD = elmt.find(".ddd").text();
                Telefone.Numero = elmt.find(".numero").text();
                Telefone.Ramal = elmt.find(".ramal").text();
                retorno.push(Telefone);
            });
            return retorno;
        },
        salvarNovo: function () {
            var url = "/PessoaViewDetalhes/AdicionarTelefone/",
                dataPost = {},
                scope = this,
                linhaNovo = this.$el.find(".telefone-novo"),
                Telefone = {};

            dataPost = this.telefoneColClasseObter();
            Telefone.DDI = linhaNovo.find("input[name='TelefonePaginar.TelefoneSelecionado.DDI']").val();
            Telefone.DDD = linhaNovo.find("input[name='TelefonePaginar.TelefoneSelecionado.DDD']").val();
            Telefone.Numero = linhaNovo.find("input[name='TelefonePaginar.TelefoneSelecionado.Numero']").val();
            Telefone.Ramal = linhaNovo.find("input[name='TelefonePaginar.TelefoneSelecionado.Ramal']").val();
            Telefone.IdTelefonetipo = linhaNovo.find("select.ddl-telefone-tipo").val();
            dataPost.push(Telefone);

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                scope.viewAtualizar(data);
            }, null, JSON.stringify(dataPost), true);
        },
        remover: function (url, data, row) {
            var scope = this;
            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
                scope.gridControl.removeRowAnimated(row, function () {
                    scope.viewAtualizar(result);
                    app.dispatcher.trigger(app.utilidades.EnumEventos.onPartialSave, {});
                });
            }, function (data) {
                app.utilidades.notificacao().exibirError({ message: data.Mensagem });
                scope.gridControl.loader.addClass("hidden");
            }, JSON.stringify(data), true);
        },
        editarLinha: function (row) {
            var btnSalvar = row.find(".btn-grid-salvar"),
                btnRemover = row.find(".btn-remover"),
                idTelefoneTipo = app.utilidades.convertToInt(row.find(".telefone-tipo").data("idtelefonetipo"), 0);

            btnSalvar.removeClass("hidden-force");
            btnRemover.addClass("hidden-force");

            row.find("input[type=text]").removeClass("hidden-force");
            row.find("select").removeClass("hidden-force");

            row.find("input,select").attr("disabled", false);
            row.find(".telefone-label").addClass("hidden");
            row.find("input[type=text].ddi").val(row.find("span.ddi").text());
            row.find("input[type=text].ddd").val(row.find("span.ddd").text());
            row.find("input[type=text].numero").val(row.find("span.numero").text());
            row.find("input[type=text].ramal").val(row.find("span.ramal").text());

            row.find(":input[type='text']:enabled:visible:first").focus();

            if (this.options.salvarEmMemoria) {
                row.find("select").val(idTelefoneTipo);
            }
        },
        normalizarLinha: function () {
            var linha = this.gridControl.$el.find("tr[data-idtelefone]");
            linha.find("input,select").attr("disabled", true);
            linha.find(".btn-remover").removeClass("hidden-force");
            linha.find(".btn-selecionar").removeClass("hidden-force");
            linha.find(".btn-grid-salvar").addClass("hidden-force");
            linha.find("input[type=text]").addClass("hidden-force");
            linha.find(".ddl-telefone-tipo").addClass("hidden-force");
            linha.find(".telefone-label").removeClass("hidden");
            linha.find(".telefone-tipo").removeClass("hidden");
        },
        events: {
            "click .btn-adicionar-novo": "onBtnAdicionarNovo",
            "click .telefone-novo .btn-grid-salvar": "onBtnSalvarNovoClick",
            "click tr[data-idtelefone] .btn-remover": "onBtnRemoverClick",
            "click tr[data-idtelefone] .btn-selecionar": "onBtnSelecionarClick",
            "click tr[data-idtelefone] .btn-grid-salvar": "onBtnLinhaSalvarClick"
        },
        onGridEnter: function () {
            var row = this.gridControl.getSelectedRow();

            row.find(".btn-selecionar").addClass("hidden-force");

            this.editarLinha(row);
        },
        onGridDown: function () {
            this.normalizarLinha();
        },
        onGridUp: function () {
            this.normalizarLinha();
        },
        onBtnSelecionarClick: function (evt) {
            var target = $(evt.currentTarget),
                row = target.parent().parent();

            this.esconderLinhaNovo();

            this.normalizarLinha();

            this.editarLinha(row);

            row.addBack("selected-row");

            target.addClass("hidden-force");
        },
        onBtnRemoverClick: function (evt) {
            var target = $(evt.currentTarget),
                row = target.parent().parent(),
                url = "/PessoaViewDetalhes/RemoverTelefone/0/{0}".format(row.index() - 1),
                title = target.data("title"),
                message = target.data("message"),
                data = this.telefoneColClasseObter(),
                option;

            if (row.hasClass("disabled")) {
                return;
            }

            this.esconderLinhaNovo();

            this.normalizarLinha();

            this.gridControl.selectRow(row);

            if (!this.options.salvarEmMemoria) {
                url = "/Telefone/Remover/0/{0}".format(row.data("idtelefone"));
                data = this.form.serializeObject();
            }

            option = {};
            option.title = title;
            option.message = message;
            option.confirm = $.proxy(this.remover, this, url, data, row);

            app.utilidades.confirm(option);
        },
        onAdicionarCancelar: function () {
            this.adicionarNovo();
        },
        onBtnLinhaSalvarClick: function (evt) {
            var valid = this.validar();
            if (!valid) {
                return false;
            }
            evt.preventDefault();
            if (this.options.salvarEmMemoria) {
                this.salvarLinha();
            } else {
                this.salvar();
            }
        },
        onBtnSalvarNovoClick: function (evt) {
            var valid = this.validar();
            if (!valid) {
                return false;
            }
            evt.preventDefault();

            if (this.options.salvarEmMemoria) {
                this.salvarNovo();
            } else {
                this.salvar();
            }
        },
        onBtnAdicionarNovo: function () {
            this.adicionarNovo();
        },
        onShortCutRemover: function () {
            var option = {},
                row = this.gridControl.getSelectedRow(),
                btnRemover,
                url,
                title,
                message,
                data = {};

            if (row && !row.find(".btn-selecionar").hasClass("hidden-force")) {
                btnRemover = row.find(".btn-remover");
                url = btnRemover.data("url");
                title = btnRemover.data("title");
                message = btnRemover.data("message");
                option.title = title;
                option.message = message;
                option.confirm = $.proxy(this.remover, this, url, data, row);
                app.utilidades.confirm(option);
            }
        },
        onShortCutSalvar: function () {
            var valid = this.validar();
            if (!valid) {
                return false;
            }
            if (this.gridControl.hasSelectedRow()) {
                this.salvarLinha();
            } else {
                this.salvar();
            }
        }
    });

    return TelefoneControl;
});