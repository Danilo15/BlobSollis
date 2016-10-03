define(["Scripts/app/controls/paginationControl"], function (PaginationControl) {
    var GridControl = Backbone.View.extend({
        el: ".grid-control",
        queryString: "",
        initialize: function (options) {
            this.options = options || {};
            this.readonly = 0;

            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.FOCUS_GRID, $.proxy(this.onFocusGrid, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.EXPORT_EXCEL, $.proxy(this.onFocusExportExcel, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ADICIONAR, $.proxy(this.onFocusAdicionar, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.ENTER, $.proxy(this.onGridEnter, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.UP, $.proxy(this.onGridUp, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.DOWN, $.proxy(this.onGridDown, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.NEXT, $.proxy(this.onPageNext, this));
            //this.listenTo(app.dispatcher, app.utilidades.EnumKeyShortcuts.PREV, $.proxy(this.onPaegPrev, this));

            this.selectedRow = undefined;
            this.selectCallback = undefined;

            this.render();
        },
        render: function () {
            if (this.options.el) {
                this.el = this.options.el;
                if ($(".modal-body .ph").children().length) {
                    if ($(".modal-body .ph").find(this.el).length) {
                        this.$el = $(".modal-body .ph").find(this.el);
                    } else {
                        this.$el = $(this.el);
                    }
                }
            }

            if (this.options.queryString) {
                this.queryString = this.options.queryString;
            }

            if (this.options.readonly) {
                this.readonly = this.options.readonly;
            }

            this.loader = this.$el.find(".grid-control-loader-line").find(".loader");
            this.paginationControl = new PaginationControl({ el: this.$el.find(".pagination-control").selector });
            this.paginationControl.iniciar();
            this.paginationControl.onSelect($.proxy(this.onPageClick, this));

            if (app.utilidades.convertToInt(this.readonly, 0)) {
                this.$el.find("tr").removeAttr("data-id");
                this.$el.find("tr").find(".select").remove();
                this.$el.find("tr").find(".remove").remove();
            }

            this.delegateEvents(this.events);

            return this;
        },
        dispose: function () {
            this.paginationControl.dispose();

            this.undelegateEvents();

            this.stopListening();

            $(this.el).removeData().unbind();
        },
        events: {
            "click .link": "onGridSelectClick",
            "click .select": "onGridSelectClick"
        },
        disable: function () {
            this.unSelectRows();
            this.$el.find("tbody > tr").addClass("disabled");
        },
        atualizarHtml: function (html, formBusca) {
            this.$el.empty().html(html);
            if (formBusca) {
                this.options.formBusca = formBusca;
            }
            this.render();
        },
        reload: function () {
            var btn = this.$el.find(".pagination-active");
            this.onPageClick(btn);
        },
        exportExcel: function (isButton, url) {
            if (this.hasFocus() || isButton) {
                if (this.queryString.length) {
                    url = url + this.queryString;
                    this.queryString = '';
                }

                if (this.hasRows()) {
                    window.location.href = url;
                }
            }
        },
        enable: function () {
            this.unSelectRows();
            this.$el.find("tbody > tr").removeClass("disabled");
        },
        unSelectRows: function () {
            this.$el.find(".selected-row").removeClass("selected-row");
            this.selectedRow = undefined;
        },
        selectIndex: function (index) {
            var row = this.$el.find("tbody").find("tr:not(tr.hidden):eq({0})".format(index));
            this.selectRow(row);

            return row;
        },
        marcarGridPorId: function (id) {
            var row = this.$el.find("tbody").find("[data-id={0}]".format(id));
            this.selectRow(row);
            return row;
        },
        selectRow: function (row) {
            this.unSelectRows();
            row.addClass("selected-row");
            this.selectedRow = row;
        },
        habilitar: function (grid, hasFocus) {
            this.loader.addClass("hidden");
            this.paginationControl.hideLoading();
            this.atualizarHtml(grid);
            if (hasFocus) {
                Mousetrap.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID);
            }
        },
        hasSelectedRow: function () {
            var grid = this.$el.find(".grid-control"),
                retorno = grid.find(".selected-row").length;
            return retorno;
        },
        getSelectedRow: function () {
            var grid = this.$el.find(".grid-control"),
                retorno;

            if (grid.find(".selected-row").length) {
                retorno = grid.find(".selected-row");
            }
            return retorno;
        },
        hasFocus: function () {
            var grid = this.$el.find(".grid-control"),
                retorno = grid.hasClass("focus-shortcut");

            return retorno;
        },
        addFocus: function () {
            var grid = this.$el.find(".grid-control"),
                retorno = grid.addClass("focus-shortcut");

            return retorno;
        },
        hasRows: function () {
            var grid = this.$el.find(".grid-control"),
                retorno = 0;

            retorno = grid.find("tbody").find("tr[data-id]").length;

            return retorno;
        },
        removeRowAnimated: function (row, callback) {
            $(row).fadeOut(300);
            $.wait(300, callback);
        },
        defaultRows: function () {
            this.$el.find("table").find("tbody").find("tr").empty();
            this.$el.find(".pagination-control").remove();
        },
        empty: function () {
            this.$el.find("tbody>tr").remove();
            this.$el.find(".badge").text("0");
            this.$el.find(".btn-excel").attr("disabled", true);
            this.$el.find(".pagination").remove();
        },
        exibirLoading: function () {
            this.loader.removeClass("hidden");
            this.disable();
            this.paginationControl.showLoading();
        },
        onFocusGrid: function (data) {
            app.utilidades.removerFocusShortcut();
            data.grid.addClass("focus-shortcut");
        },
        onFocusExportExcel: function (data) {
            if (data.grid) {
                var masterClasses = data.grid[0].className.replace(/\./g, '').toLowerCase().split(' '),
                    thisClasses = '{0}'.format(this.$el.selector).replace(/\./g, '').toLowerCase().split(' '),
                    allClasses = masterClasses.concat(thisClasses),
                    button = data.button;

                //VERIFICA SE O GRID PASSADO TEM ALGUMA CLASSE IGUAL DO GRID ATUAL(THIS)
                //A TECLA DE EXPORTAR EXCEL EXPORTAR O PRIMEIRO GRID QUE ACHAR QUANDO EXISTEM DUAS LISTAS
                if ((allClasses.length !== _.uniq(allClasses).length)) {
                    this.exportExcel(true, button.attr('data-url'));
                }
            } else {
                this.exportExcel();
            }
        },
        onFocusAdicionar: function () {
            this.trigger(app.utilidades.EnumEventos.onGridNovo, { retorno: {} });
        },
        onGridUp: function () {
            var grid = this.$el.find(".grid-control"),
                row,
                index;

            if (this.hasFocus()) {
                row = grid.find(".selected-row").prev();

                if (this.hasSelectedRow()) {
                    if (row.length && !row.hasClass("nav-header")) {
                        row.addClass("selected-row").next().removeClass("selected-row");
                        index = row.index();
                    }
                } else {
                    index = grid.find("tbody").find("tr:not(tr.hidden)").length - 1;
                    this.selectIndex(index);
                }

                this.trigger(app.utilidades.EnumEventos.onDown, { retorno: index });
            }
        },
        onGridDown: function () {
            var grid = this.$el.find(".grid-control"),
                row,
                index;

            if (this.hasFocus()) {
                row = grid.find(".selected-row").next();
                if (this.hasSelectedRow()) {
                    if (row.length) {
                        row.addClass("selected-row").prev().removeClass("selected-row");
                        index = row.index();
                    }
                } else {
                    index = 0;
                    this.selectIndex(0);
                }

                this.trigger(app.utilidades.EnumEventos.onDown, { retorno: index });
            }
        },
        onPageNext: function () {
            var grid = this.$el.find(".grid-control"),
                btn;

            if (this.hasFocus()) {
                //SELECIONAR PROXIMO BOTAO
                btn = grid.find(".pagination-active").parent().next().find("a:not(.disabled)").addClass("pagination-active");

                if (btn.length) {
                    //REMOVE SELECAO DO BOTAO ANTERIOR
                    btn.parent().prev().find("a").removeClass("pagination-active");

                    this.onPageClick(btn);
                }
            }
        },
        onPaegPrev: function () {
            var grid = this.$el.find(".grid-control"),
                btn;
            if (this.hasFocus()) {
                //SELECIONAR BOTAO ANTERIOR
                btn = grid.find(".pagination-active").parent().prev().find("a:not(.disabled)").addClass("pagination-active");

                if (btn.length) {
                    //REMOVE SELECAO DO PROXIMO BOTAO
                    btn.parent().next().find("a").removeClass("pagination-active");

                    this.onPageClick(btn);
                }
            }
        },
        onGridEnter: function () {
            var item = this.$el.find(".selected-row").find(".select");
            if (item.length === 0) {
                item = this.$el.find(".selected-row");
            }

            if (this.hasFocus()) {
                this.trigger(app.utilidades.EnumEventos.onGridEnter, { retorno: item });
            }
        },
        onPageClick: function (btn) {
            var scope = this,
                url = btn.attr("href") || btn.data("url"),
                dataPost = {},
                timer,
                hasFocus = this.hasFocus();

            if (this.queryString.length) {
                url = url + this.queryString;
            }

            this.paginationControl.currentButton = btn;
            scope.trigger(app.utilidades.EnumEventos.onPrePaginar, btn);

            timer = $.wait(1000, $.proxy(this.exibirLoading, this));

            if (this.options.formBusca) {
                dataPost = this.options.formBusca.serialize();
            }
            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                $.killTimeOut(timer);
                scope.habilitar(data.GridHtml, hasFocus);
                scope.trigger(app.utilidades.EnumEventos.onPaginar, data);
            }, function (data) {
                $.killTimeOut(timer);
                scope.habilitar(data.GridHtml, hasFocus);
                app.utilidades.exibirError({ message: data.Mensagem });
            }, dataPost);
        },
        onGridSelectClick: function (evt) {
            if (app.utilidades.convertToInt(this.readonly, 0)) {
                return false;
            }
            var row = $(evt.currentTarget).parent().parent();
            this.selectRow(row);
        },
        onGridTDSelectClick: function (evt) {
            if (app.utilidades.convertToInt(this.readonly, 0)) {
                return false;
            }
            var row = $(evt.currentTarget).parent();
            this.selectRow(row);
        },
        onSelect: function (callBack) {
            this.selectCallback = callBack;
        }
    });

    return GridControl;
});