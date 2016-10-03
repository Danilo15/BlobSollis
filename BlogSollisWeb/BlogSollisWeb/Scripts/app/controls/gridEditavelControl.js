define(["Scripts/app/controls/gridControl"], function (GridControl) {
    var GridEditavelControl = Backbone.View.extend({
        el: ".grideditavel-control",
        initialize: function () {
            this.readonly = 0;
            this.render();
        },
        render: function () {
            if (this.options.el) {
                this.el = this.options.el;
                if ($(".modal-body .ph").children().length) {
                    this.$el = $(".modal-body .ph").find(this.el);
                }
            }

            if (this.options.readonly) {
                this.readonly = this.options.readonly;
                this.$el.find(".btn-adicionar-novo").addClass("hidden-force");
                this.$el.find(".select").addClass("hidden-force");
            }

            if (this.options.formBusca) {
                this.gridControl = new GridControl({ el: this.el, readonly: this.readonly, formBusca: this.options.formBusca });
            } else {
                this.gridControl = new GridControl({ el: this.el, readonly: this.readonly });
            }

            this.gridControl.on(app.utilidades.EnumEventos.onPaginar, $.proxy(this.onGridPaginar, this));

            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ENTER, $.proxy(this.onGridEnter, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.CTRL_O, $.proxy(this.onAdicionarCancelar, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.DOWN, $.proxy(this.onGridDown, this));
            this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.UP, $.proxy(this.onGridUp, this));

            this.delegateEvents(this.events);
            return this;
        },
        exportExcel: function (isButton, queryString) {
            this.gridControl.queryString = queryString;
            this.gridControl.exportExcel(isButton);
        },
        dispose: function () {
            if (this.gridControl) {
                this.gridControl.dispose();
                this.gridControl = null;
            }
            this.undelegateEvents();
            this.stopListening(app.dispatcher);
            app.dispatcher.off(null, null, this);
            $(this.el).removeData().unbind();
        },
        disableEvents: function () {
            this.undelegateEvents();
        },
        enableEvents: function () {
            this.delegateEvents(this.events);
        },
        esconderLinhaNovo: function () {
            var icon = this.$el.find(".btn-adicionar-novo").find("i"),
                linha = this.$el.find(".linha-novo");

            linha.addClass("hidden");
            linha.find("input[type=text]").removeClass("error").val("");
            linha.find("span.valortabelapreco").text("");
            icon.removeClass("icon-minus").addClass("icon-plus");
        },
        exibirLinhaNovo: function () {
            var icon = this.$el.find(".btn-adicionar-novo").find("i"),
                linha = this.$el.find(".linha-novo");

            linha.removeClass("hidden");
            icon.removeClass("icon-plus").addClass("icon-minus");
        },
        adicionarNovo: function () {
            if (!this.$el.find(".linha-novo").hasClass("hidden")) {
                this.esconderLinhaNovo();
            } else {
                this.exibirLinhaNovo();
            }
            this.$el.find("tr[data-id]").removeClass("selected-row");
            this.normalizarLinha();
            this.$el.find("tr.linha-novo").find(":input[type=text]:enabled:visible:first").focus();
        },
        selectRow: function (row) {
            this.gridControl.selectRow(row);
        },
        editarLinha: function (linha) {
            var btnSalvar = linha.find(".btn-grid-salvar"),
                btnRemover = linha.find(".btn-remover");

            btnRemover.addClass("hidden-force");
            linha.find("span:not(.visible-always)").addClass("hidden");

            btnSalvar.removeClass("hidden-force");
            linha.find("input,select,textarea,button").removeClass("hidden-force");
            linha.find("select").removeClass("hidden-force");
            linha.find(":input[type=text]:enabled:visible:first").focus();
        },
        normalizarLinha: function () {
            var linhas = this.gridControl.$el.find("tr[data-id]:not([disabled=disabled])");

            linhas.each(function () {
                var elmt = $(this);

                elmt.find(".btn-grid-salvar").addClass("hidden-force");
                elmt.find(":checkbox:not(.visible-always),input:not(.visible-always),select:not(.visible-always),textarea:not(.visible-always),button:not(.visible-always)").addClass("hidden-force");

                elmt.find(".btn-remover").removeClass("hidden-force");
                elmt.find(".btn-selecionar").removeClass("hidden-force");
                elmt.find("span").removeClass("hidden");
                elmt.find("label.error").remove();
                elmt.find(".error").removeClass("error");
                elmt.removeClass("open");
            });
        },
        removeRowAnimated: function (row, callback) {
            this.gridControl.removeRowAnimated(row, callback);
        },
        events: {
            "click .btn-adicionar-novo": "onBtnAdicionarNovo",
            "click tr[data-id] .select": "onBtnSelecionarClick",
            "click .btn-cancelar": "onBtnCancelarClick",
            "click .btn-grid-salvar": "onBtnSalvarClick",
            "click .linha-novo-salvar": "onBtnNovoSalvarClick",
            "click tr[data-id]:not([disabled='disabled'])": "onLinhaClick",
            "keydown input": "onEnter",
            "focus input[type=text]": "onInputFocus"
        },
        onGridPaginar: function () {
            this.trigger(app.utilidades.EnumEventos.onPaginar);
        },
        onEnter: function (evt) {
            if (evt.keyCode === 13) {
                if (this.$el.find(".linha-novo").length && !this.$el.find(".linha-novo").hasClass("hidden")) {
                    this.trigger(app.utilidades.EnumEventos.onGridSalvar, evt);
                } else {
                    this.trigger(app.utilidades.EnumEventos.onGridAtualizar, evt);
                }
                return false;
            }
            return true;
        },
        onInputFocus: function (evt) {
            var input = $(evt.currentTarget);
            input.select();

            window.setTimeout(function () {
                input.select();
            }, 50);

            // Work around WebKit's little problem
            input.mouseup(function () {
                // Prevent further mouseup intervention
                input.unbind("mouseup");
                return false;
            });
        },
        onAdicionarCancelar: function (data) {
            this.adicionarNovo();
            this.trigger(app.utilidades.EnumEventos.onGridNovo, data);
        },
        onGridEnter: function (data) {
            var linha = this.gridControl.getSelectedRow();
            linha.find(".select").addClass("hidden-force");
            this.esconderLinhaNovo();
            this.editarLinha(linha);
            this.trigger(app.utilidades.EnumEventos.onGridSelecionar, data);
        },
        onGridDown: function () {
            this.esconderLinhaNovo();
            this.normalizarLinha();
        },
        onGridUp: function () {
            this.esconderLinhaNovo();
            this.normalizarLinha();
        },
        onLinhaClick: function (evt) {
            var target = $(evt.target),
                linha = $(evt.currentTarget);

            if (linha.hasClass("disabled") || linha.find("td[disabled]").length || app.utilidades.convertToInt(this.readonly, 0)) {
                return false;
            }

            if ((!linha.find(".select").hasClass("hidden-force") && linha.hasClass("selected-row")) || !linha.hasClass("open")) {
                if (target.hasClass("remove") || target.hasClass("icon-remove")) {
                    this.esconderLinhaNovo();
                    this.normalizarLinha();

                    linha.find(".select").addClass("hidden-force");

                    this.gridControl.unSelectRows();

                    linha.addClass("selected-row");

                    evt.data = linha;

                    this.trigger(app.utilidades.EnumEventos.onGridSelecionar, evt);
                    return;
                }

                if (target.hasClass("remove") || target.is("span") || target.is("label") || target.is("td")) {
                    this.esconderLinhaNovo();
                    this.normalizarLinha();

                    if (linha.find("input").length) {
                        this.editarLinha(linha);
                        linha.find(".select").addClass("hidden-force");
                        this.gridControl.unSelectRows();
                        linha.addClass("selected-row");
                        linha.addClass("open");
                    }

                    evt.data = linha;

                    this.trigger(app.utilidades.EnumEventos.onGridSelecionar, evt);
                }
            }
        },
        onBtnNovoSalvarClick: function (evt) {
            this.trigger(app.utilidades.EnumEventos.onGridNovoSalvar, evt);
        },
        onBtnSalvarClick: function (evt) {
            this.trigger(app.utilidades.EnumEventos.onGridAtualizar, evt);
        },
        onBtnCancelarClick: function (evt) {
            var target = $(evt.currentTarget),
                linha = target.parent().parent();

            this.esconderLinhaNovo();

            this.normalizarLinha();

            linha.removeClass("selected-row");

            this.trigger(app.utilidades.EnumEventos.onGridCancelar, evt);
        },
        onBtnAdicionarNovo: function (evt) {
            this.$el.find(".linha-novo-salvar").attr("disabled", false);
            this.adicionarNovo();
            this.trigger(app.utilidades.EnumEventos.onGridNovo, evt);
        },
        onBtnSelecionarClick: function (evt) {
            var target = $(evt.currentTarget),
                linha = target.parent().parent();

            this.esconderLinhaNovo();

            this.normalizarLinha();

            this.editarLinha(linha);

            linha.addClass("selected-row");

            target.addClass("hidden-force");

            evt.data = linha;

            this.trigger(app.utilidades.EnumEventos.onGridSelecionar, evt);
        }
    });

    return GridEditavelControl;
});