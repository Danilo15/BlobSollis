define([], function () {
    var Master = Backbone.View.extend({
        el: 'html',
        initialize: function (app) {
            this.activeModal = null;
            this.activeTabView = null;

            app.dispatcher.on('hashChange', $.proxy(this.onHashChange, this));
            app.dispatcher.on(app.utilidades.EnumEventos.onRequestComplete, $.proxy(this.onRequestComplete, this));
            app.dispatcher.on(app.utilidades.EnumEventos.onModalOpenComplete, $.proxy(this.onModalOpenComplete, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.FOCUS_MENU_LATERAL, $.proxy(this.onFocusMenuLateral, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.UP, $.proxy(this.onMenuLateralUp, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.DOWN, $.proxy(this.onMenuLateralDown, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.ENTER, $.proxy(this.onMenuLateralEnter, this));
            //app.dispatcher.on(app.utilidades.EnumKeyShortcuts.ESC, $.proxy(this.onEsc, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.CTRL_SHIFT_S, $.proxy(this.onCTRL_SHIFT_S, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.DEL, $.proxy(this.onDEL, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.PAGE_ID, $.proxy(this.onPageId, this));
            app.dispatcher.on(app.utilidades.EnumKeyShortcuts.ALT, $.proxy(this.onAlt, this));

            Mousetrap.stopCallback = function (e, element, combo) {
                if (combo !== app.utilidades.EnumKeyShortcuts.ALT && !$('.help-keys').hasClass('hidden').length) {
                    $('.help-keys').addClass('hidden');
                }

                // if the element has the class 'mousetrap' then no need to stop
                if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
                    return false;
                }

                // stop for input, select, and textarea
                return element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA' || (element.contentEditable && element.contentEditable === 'true');
            };

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.ALT, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.ALT, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.DEL, function () {
                if (!$('*:focus').length) {
                    app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.DEL, {});
                    return false;
                }
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.CTRL_SHIFT_S, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.CTRL_SHIFT_S, {});
                return false;
            });

            //A TECLA DE EXPORTAR EXCEL SELECIONA O PRIMEIRO GRID QUE ACHAR QUANDO EXISTEM DUAS LISTAS
            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.EXPORT_EXCEL, function () {
                $(':focus').blur();
                var btnExcel = $('.main').find('.btn-excel');
                if (btnExcel.length > 1) {
                    $(btnExcel[0]).focus();
                    app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.EXPORT_EXCEL, { grid: $('.grid-ph:eq(0)'), button: $(btnExcel[0]) });
                } else {
                    app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.EXPORT_EXCEL, {});
                }
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.PAGE_ID, $.proxy(this.onPageId, this));

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, function () {
                var modalAberto = $('.modal-backdrop').length,
                    focusedGrid = $('.grid-control.focus-shortcut'),
                    grids = $('.grid-control');

                if (modalAberto) {
                    focusedGrid = $('.modal-body').find('.grid-control.focus-shortcut');
                    grids = $('.modal-body').find('.grid-control');
                }

                grids.each(function (index) {
                    var grid = $(this);
                    if (!focusedGrid.length) {
                        if (index === 0) {
                            app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, { grid: grid, index: index });
                        }
                    } else {
                        app.utilidades.removerFocusShortcut();
                    }
                });

                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.GRID_NEXT, function () {
                var arrGrids = [],
                    modalAberto = $('.modal-backdrop').length,
                    grids = $('.grid-control');

                if (modalAberto) {
                    grids = $('.modal-body').find('.grid-control');
                }

                grids.each(function (index) {
                    arrGrids[index] = { grid: $(this), index: index };
                });

                grids.each(function (index) {
                    var grid = $(this),
                        gridEstaComFocus = grid.hasClass('focus-shortcut');

                    if (gridEstaComFocus && (index === arrGrids[index].index)) {
                        index += 1;
                        if (index > arrGrids.length) {
                            index = 0;
                        }
                        grid.removeClass('focus-shortcut');
                        if (arrGrids[index]) {
                            app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, { grid: arrGrids[index].grid, index: index });
                        } else {
                            app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, { grid: arrGrids[0].grid, index: index });
                            return false;
                        }
                    }
                });
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.GRID_PREV, function () {
                var arrGrids = [],
                    modalAberto = $('.modal-backdrop').length,
                    grids = $('.grid-control');

                if (modalAberto) {
                    grids = $('.modal-body').find('.grid-control');
                }

                grids.each(function (index) {
                    arrGrids[index] = { grid: $(this), index: index };
                });

                grids.each(function (index) {
                    var grid = $(this),
                        gridEstaComFocus = grid.hasClass('focus-shortcut');

                    if (gridEstaComFocus && (index === arrGrids[index].index)) {
                        index -= 1;
                        if (index < 0) {
                            index = arrGrids.length - 1;
                        }
                        grid.removeClass('focus-shortcut');
                        if (arrGrids[index]) {
                            app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, { grid: arrGrids[index].grid, index: index });
                        } else {
                            app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_GRID, { grid: arrGrids[0].grid, index: index });
                            return false;
                        }
                    }
                });
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.FOCUS_MENU_LATERAL, function () {
                if ($('.modal-backdrop').length) {
                    return false;
                }

                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.FOCUS_MENU_LATERAL, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.ADICIONAR, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.ADICIONAR, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.CTRL_O, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.CTRL_O, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.BUSCAR, function () {
                if ($('input:focus, textarea:focus, select:focus').length) {
                    app.utilidades.removerFocusShortcut();
                } else {
                    app.utilidades.removerFocusShortcut();
                    app.utilidades.focusFirstElement();
                }
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.BUSCAR, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.UP, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.UP, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.DOWN, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.DOWN, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.NEXT, function () {
                if (!$('input:focus, textarea:focus, select:focus').length) {
                    app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.NEXT, {});
                    return false;
                }
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.PREV, function () {
                if (!$('input:focus, textarea:focus, select:focus').length) {
                    app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.PREV, {});
                    return false;
                }
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.ENTER, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.ENTER, {});
                return false;
            });

            Mousetrap.bind(app.utilidades.EnumKeyShortcuts.ESC, function () {
                app.dispatcher.trigger(app.utilidades.EnumKeyShortcuts.ESC, {});
                return false;
            });

            this.render();
        },
        render: function () {
            this.helpLinkUpdate();
            this.selecionarMenu();
            return this;
        },
        onHashChange: function (/*key*/) {
            //console.log('master onHashChange', key);
            //this.selecionarSubMenu(key);
        },
        onModalOpenComplete: function () {
            $('.modal-body').find('form:not(.form-busca)').each(function (index, elmt) {
                $(elmt).areYouSure({ 'message': $('.areyousure').text() });
            });
        },
        atualizarVerificacaoFormularioAlterado: function (form) {
            form.areYouSure({ 'message': $('.areyousure').text() });
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        atualizarPopHelpManual: function (paginaNumero) {
            var url = $('.popup.help-button').attr('data-url');
            url = url.replace(/\d.+$/g, paginaNumero);

            $('.popup.pagina-id').text(paginaNumero);
            $('.popup.help-button').attr('data-url', url);
        },
        exibirNumeroHelpPagina: function () {
            var paginaIdElmts,
                paginaIdHeader,
                helpButtonHeader;

            //PAGINA HELP ID
            paginaIdHeader = $('.header.pagina-id');
            paginaIdElmts = $('.main-content .pagina-id.hidden:not(:empty)');
            helpButtonHeader = $('#navbar').find('.help-button');

            paginaIdHeader.text('');
            paginaIdHeader.addClass('hidden');

            paginaIdElmts.each(function (index, elmt) {
                var elmText = $(elmt).text(),
                    urlHelp = $('body').attr('data-help'),
                    urlnova = '{0}{1}'.format(urlHelp, elmText);

                paginaIdHeader.text(elmText);
                paginaIdHeader.removeClass('hidden');

                helpButtonHeader.attr('data-url', urlnova);
            });
        },
        clearHelpButton: function (selector) {
            var paginaId = $('{0}.pagina-id'.format(selector)),
                helpButton = $('{0}.help-button'.format(selector));

            paginaId.text('');
            helpButton.attr('data-url', '{0}');
            helpButton.addClass('hidden');
        },
        exibirNumeroHelpPopUp: function () {
            var popUpPaginaIdElmts,
                popUpPaginaID,
                popUpHelpButton;

            popUpPaginaID = $('.popup.pagina-id');
            popUpPaginaIdElmts = $('.modal-body .pagina-id:not(:empty)');
            popUpHelpButton = $('.popup.help-button');

            popUpPaginaID.text('');
            popUpPaginaID.addClass('hidden');
            popUpPaginaIdElmts.each(function (index, elmt) {
                var elmText = $(elmt).text(),
                    urlHelp = $('body').attr('data-help'),
                    urlnova = '{0}{1}'.format(urlHelp, elmText);

                popUpPaginaID.text(elmText);
                popUpPaginaID.removeClass('hidden');
                popUpHelpButton.attr('data-url', urlnova);
            });
        },
        helpLinkUpdate: function () {
            var scope = this,
                timer = 250,
                intervalId,
                intervalIdPopUp;

            intervalId = setInterval(function () {
                if ($('.main-content .pagina-id.hidden:not(:empty)').length > 0) {
                    scope.exibirNumeroHelpPagina();
                    $('.header.help-button').removeClass('hidden');
                    clearInterval(intervalId);
                } else {
                    scope.clearHelpButton('.header');
                }
            }, timer);

            intervalIdPopUp = setInterval(function () {
                if ($('.modal-body .pagina-id:not(:empty)').length > 0) {
                    scope.exibirNumeroHelpPopUp();
                    $('.popup.help-button').removeClass('hidden');
                    clearInterval(intervalIdPopUp);
                } else {
                    scope.clearHelpButton('.popup');
                }
            }, timer);
        },
        IdESTStatusCotacaoFinalizadoPadraoObter: function () {
            var retorno = 0;
            retorno = app.utilidades.convertToInt($('.eststatuscotacaofinalizado').text(), 0);
            return retorno;
        },
        IdESTStatusCotacaoProcessamentoPadraoObter: function () {
            var retorno = 0;
            retorno = app.utilidades.convertToInt($('.eststatuscotacaoprocessamento').text(), 0);
            return retorno;
        },
        IdESTStatusPedidoFinalizadoPadraoObter: function () {
            var retorno = 0;
            retorno = app.utilidades.convertToInt($('.eststatuspedidofinalizado').text(), 0);
            return retorno;
        },
        IdESTStatusPedidoProcessamentoPadraoObter: function () {
            var retorno = 0;
            retorno = app.utilidades.convertToInt($('.eststatuspedidoprocessamento').text(), 0);
            return retorno;
        },
        popHelpExibir: function (url) {
            var options = {},
                helpUrlPath = '';

            helpUrlPath = $('body').data('help');

            options.name = '_blank'; //( _parent, _self,_top)
            options.features = 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';
            options.replace = true;
            options.window = window;
            options.url = '{0}.htm'.format(url);

            app.utilidades.openWindow(options);
        },
        selecionarMenu: function () {
            var pathName = '.' + window.location.pathname.toLowerCase().split('/')[1],
                elmt;

            this.$el.find('.nav-sidebar').find('active').removeClass('active');

            //MARCA MENU
            if (pathName.length && pathName !== '.') {
                elmt = this.$el.find('.nav-sidebar').find(pathName);
                elmt.addClass('active');
            }

            //MARCA SUBMENU
            this.selecionarSubMenu();
        },
        selecionarSubMenu: function (key) {
            var subMenuKey = window.location.pathname.toLowerCase().split('/')[2],
                subMenu = this.$el.find('.nav-sidebar').find('.active').find('.nav');

            if (key && key.length) {
                subMenuKey = key;
            }

            if (subMenuKey) {
                subMenu.find('.active').removeClass('active');
                subMenu.find('.{0}'.format(subMenuKey)).addClass('active');
            }
        },
        events: {
            'click .header.help-button': 'onHeaderHelpButtonClick',
            'click .popup.help-button': 'onModalHelpButtonClick',
            'click .trocar-senha': 'onTrocarSenhaClick'
        },
        onTrocarSenhaClick: function (evt) {
            evt.preventDefault();
            var target = $(evt.currentTarget),
                url = target.attr('href'),
                title = target.attr('data-title'),
                method = app.utilidades.EnumAjax.POST,
                opts = {};

            opts.remote = url;
            opts.title = title;

            app.utilidades.modal.abrir(opts);
        },
        onPageId: function () {
            var url = '',
                finalUrl = '',
                options = {};

            $(':focus').blur();

            if ($('.modal-backdrop').length) {
                url = $('.popup.help-button').attr('data-url');
                $('.popup.help-button').focus();
            } else {
                url = $('.header.help-button').attr('data-url');
                $('.header.help-button').focus();
            }

            finalUrl = '{0}//{1}{2}'.format(window.location.protocol, window.location.host, url);
            options.url = finalUrl;
            options.window = window;
            app.utilidades.openWindow(options);
        },
        onRequestComplete: function () {
            this.helpLinkUpdate();
            if (this.activeTabView) {
                if (this.activeTabView.$el.find('.grid-control.focus-shortcut').length === 0) {
                    app.utilidades.focusFirstElement();
                }
            } else {
                app.utilidades.focusFirstElement();
            }
        },
        onHeaderHelpButtonClick: function (evt) {
            var button = $(evt.currentTarget),
                url = '';

            url = button.attr('data-url');
            this.popHelpExibir(url);
        },
        onModalHelpButtonClick: function (evt) {
            var button = $(evt.currentTarget),
                url = '';

            url = button.attr('data-url');
            this.popHelpExibir(url);
        },
        onMenuLateralEnter: function () {
            var menu = this.$el.find('.sidebar'),
                url = menu.find('li.active').find('a').last().attr('href');

            if (menu.hasClass('focus-shortcut')) {
                window.location.href = url;
            }
        },
        onMenuLateralDown: function () {
            var menu = this.$el.find('.sidebar'),
                next,
                prev;
            if (menu.hasClass('focus-shortcut')) {
                next = menu.find('.active').next();
                if (next.length) {
                    if ($(next.children()[0]).is('a')) {
                        if (!$(next.children()[0]).attr('href')) {
                            $(next.children()[1]).children().first().addClass('active');
                        } else {
                            next.addClass('active').prev().prev().removeClass('active');
                        }
                    } else {
                        next.addClass('active').prev().prev().removeClass('active');
                    }

                    prev = next.addClass('active').prev();

                    if (next.hasClass('nav-list')) {
                        next.find('.active').removeClass('active');
                        next.parent().next().addClass('active');
                    }

                    next.addClass('active').prev().removeClass('active');
                }
            }
        },
        onMenuLateralUp: function () {
            var menu = this.$el.find('.sidebar'),
                prev;

            if (menu.hasClass('focus-shortcut')) {
                prev = menu.find('.active').prev();

                prev.addClass('active').siblings().find('.active').removeClass('active');

                if (prev.length && !prev.hasClass('nav-header')) {
                    prev.addClass('active').next().removeClass('active');
                }
            }
        },
        onEsc: function () {
            if ($('.modal-backdrop').length) {
                app.utilidades.modal.fechar();
            }
        },
        onAlt: function () {
            var helpKeys = $('.help-keys');

            if ($('.modal-backdrop').length) {
                helpKeys = $('.modal-body').find('.help-keys');
            }

            if (helpKeys.hasClass('hidden')) {
                helpKeys.removeClass('hidden');
            } else {
                helpKeys.addClass('hidden');
            }
        },
        onFocusMenuLateral: function () {
            var menu = this.$el.find('.sidebar');
            if (menu.hasClass('focus-shortcut')) {
                menu.removeClass('focus-shortcut');
            } else {
                app.utilidades.removerFocusShortcut();
                menu.addClass('focus-shortcut');
            }
        }
    });

    return Master;
});