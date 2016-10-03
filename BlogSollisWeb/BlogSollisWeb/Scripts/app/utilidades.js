define(['Scripts/plugins/ak-plugin'], function () {
    var Utilidades = {
        isoDateString: function (value) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            }
            return pad(value);
        },
        removerDuplicadosDeArray: function (source) {
            var uniqueArray = source.filter(function (elem, pos) {
                return source.indexOf(elem) === pos;
            });

            return uniqueArray;
        },
        removerHifen: function (data) {
            data = data.replace(/( - P).*|.*\d( - )/g, '');
            return data;
        },
        traceFormValues: function (data) {
            return data.toString().split('&').join('\n');
        },
        removerAcentos: function (newStringComAcento) {
            var string = newStringComAcento;
            var mapaAcentosHex = {
                a: /[\xE0-\xE6]/g,
                e: /[\xE8-\xEB]/g,
                i: /[\xEC-\xEF]/g,
                o: /[\xF2-\xF6]/g,
                u: /[\xF9-\xFC]/g,
                c: /\xE7/g,
                n: /\xF1/g
            };

            for (var letra in mapaAcentosHex) {
                if (mapaAcentosHex.hasOwnProperty(letra)) {
                    var expressaoRegular = mapaAcentosHex[letra];
                    string = string.replace(expressaoRegular, letra);
                }
            }

            return string;
        },
        focusFirstElement: function () {
            if ($(".modal-backdrop").length) {
                $(".modal-body .ph").find(":input:not(.btn):not(:hidden):enabled:visible:first").focus();
            } else {
                $('.tab-ph').find(":input:not(.btn):not(:hidden):enabled:visible:first").focus();
            }
        },
        isIE: function () {
            var isIE = (navigator.appName === 'Microsoft Internet Explorer');
            return isIE;
        },
        formResetValidation: function (formSelector) {
            var validator = $(formSelector).validate();
            validator.resetForm();
            $('.field-validation-error').empty();
        },
        htmlRemover: function (texto) {
            var retorno = '';
            if (texto) {
                retorno = texto.replace(/<[^<|>]+?>/gi, '');
            }
            return retorno;
        },
        erroStatusFormatar: function (o) {
            var texto = "{0} - {1}".format(o.status, o.statusText);
            app.utilidades.notificacao().exibirError(texto);
        },
        linkCSS: function (id, href) {
            var hrefNoCache = href + '?aknocache=' + this.dateCacheObter();
            var retorno = "<link id='{0}' href='{1}' rel='stylesheet' type='text/css'/>".format(id, hrefNoCache);
            return retorno;
        },
        dateCacheObter: function () {
            var data = new Date();
            var retorno = data.getDate().toString() + (data.getMonth() + 1).toString() + data.getFullYear().toString() + data.getHours().toString() + data.getMinutes().toString() + data.getSeconds().toString() + data.getMilliseconds().toString();
            return retorno;
        },
        openWindow: function (options) {
            var url = options.url,
                name = options.name,
                features = 'toolbar=1,titlebar=1,scrollbars=1,resizable=1,menubar=1,location=1',
                replace = options.replace,
                win = options.window;

            if (win === undefined) {
                win = window;
            }
            win.open(url, name, features, replace);
        },
        convertToInt: function (value, defaultValue) {
            var retorno = defaultValue,
                convertedValue = parseInt(value, 10),
                isInt = !isNaN(convertedValue);

            if (isInt) {
                retorno = convertedValue;
            }

            return retorno;
        },
        convertToDecimal: function (value, defaultValue) {
            var retorno = defaultValue,
                convertedValue = parseFloat(value),
                isInt = !isNaN(convertedValue);

            if (isInt) {
                retorno = convertedValue;
            }

            return retorno;
        },
        removerFocusShortcut: function () {
            var elmtComFocus = $('.focus-shortcut');
            if (elmtComFocus.length) {
                elmtComFocus.removeClass('focus-shortcut');
            }
            $('*:focus').blur();
        },
        modal: {
            abrir: function (options) {
                var modalUI = $('.modal'),
                    modalTitle = modalUI.find('.modal-title'),
                    modalBody = modalUI.find('.modal-body'),
                    modalLoader = modalBody.find('.modal-loader'),
                    modalContent = modalBody.find('.ph'),
                    maxheight = 620;

                modalBody.css('overflow-y', 'auto');
                modalBody.css('max-height', maxheight);

                modalUI.find('.modal-dialog').removeAttr('style');

                if (options.size) {
                    if (options.size.width) {
                        modalUI.find('.modal-dialog').css('width', options.size.width);
                        modalUI.css('margin-left', '-{0}px'.format(modalUI.width() / 2));
                        modalUI.css('left', $(window).width() / 2);
                    }
                    if (options.size.height) {
                        if (options.size.height > maxheight) {
                            modalBody.css('max-height', maxheight);
                            modalBody.css('height', maxheight);
                        }
                    }
                }

                modalTitle.text('');

                if (options.title) {
                    modalTitle.text(options.title);
                }

                $('.popup.pagina-id').text('');

                modalLoader.show();

                $(window).resize(function () {
                    modalUI.css('margin-left', '-{0}px'.format(modalUI.width() / 2));
                    modalUI.css('left', $(window).width() / 2);
                });

                if (options.removerBackdropClick) {
                    modalUI.modal({ backdrop: 'static' });
                } else {
                    //modalUI.modal({ backdrop: 'static', keyboard: true });
                }

                modalUI.modal();
                modalContent.empty();

                app.utilidades.consultaAjax(options.remote, app.utilidades.EnumAjax.POST,
                    function (data) {
                        modalContent.hide();
                        modalContent.html(data.DetalhesHtml);

                        if (!options.title) {
                            modalTitle.text($(data.DetalhesHtml).find(".pop-titulo").text());
                        }

                        app.dispatcher.trigger(app.utilidades.EnumEventos.onModalOpenComplete, modalUI);

                        $.wait(300, function () {
                            modalContent.fadeIn();
                            modalLoader.hide();
                            $('body').removeAttr('style');
                            $('body').removeClass('modal-open');
                            app.utilidades.focusFirstElement();
                        });

                        if (options.returnCallback) {
                            var func = function (data) {
                                options.returnCallback(data);
                                if (!data.keepOpen) {
                                    app.utilidades.modal.fechar({});
                                }
                            };
                            app.dispatcher.on(app.utilidades.EnumEventos.onModalReturn, func, this);
                        }
                    }, function (data) {
                        modalLoader.hide();
                        if (data.status === 404 || data.status === 500) {
                            data.Mensagem = data.statusText;
                        }
                        modalContent.html(data.Mensagem);
                    }, {});

                modalUI.off('hide.bs.modal');
                modalUI.on('hide.bs.modal', function () {
                    if ($('.modal-body').find('form.dirty').length) {
                        app.utilidades.exibirAvisoNaoSalvo();
                        return false;
                    }
                    return true;
                });

                modalUI.off('hidden.bs.modal');
                modalUI.on('hidden.bs.modal', function (evt) {
                    if (options.fecharCallBack) {
                        options.fecharCallBack(evt);
                    }

                    app.utilidades.modal.fechar({});
                });
            },
            fechar: function () {
                if (app.master.activeModal) {
                    app.master.activeModal.dispose();
                    app.master.activeModal = null;
                }

                var modalUI = $('.modal'),
                    modalBody = modalUI.find('.modal-body'),
                    modalContent = modalBody.find('.ph');

                modalContent.empty();
                modalBody.removeAttr('style');
                modalBody.parent().removeAttr('style');
                modalUI.modal('hide');
                app.dispatcher.off(app.utilidades.EnumEventos.onModalReturn);
            },
            disableBackgroundClose: function () {
                $('.modal-backdrop').unbind();
                $('.modal-footer').find('.btn-inverse').hide();
            },
            enableBackgroundClose: function () {
                $('.modal-backdrop').on('click', function () {
                    Utilidades.modal.fechar({});
                });
                $('.modal-footer').find('.btn-inverse').show();
            },
            scrollTop: function (value) {
                $('.modal-body').scrollTop(value);
            }
        },
        exibirAvisoNaoSalvo: function (confirm) {
            var options = {};
            options.message = $('.avisosalvarmodal').text();
            options.confirm = function () {
                if (confirm) {
                    confirm();
                } else {
                    app.utilidades.modal.fechar();
                }
            };
            options.cancel = function () {
                _.delay(function () {
                    app.utilidades.focusFirstElement();
                }, 100);
            };

            app.utilidades.confirm(options);
        },
        bloquearInteracao: function () {
            var div = '<div class="block-site"><div class="loader-root-ph"><div class="clock"> <div class="hand minute"></div><div class="hand hour"></div></div></div></div>',
                hasBlock = $('body').find('.block-site').length;

            if (hasBlock) {
                Utilidades.habilitarInteracao();
            }

            $('body').append(div);
        },
        habilitarInteracao: function () {
            $('body').find('.block-site').remove();
        },
        EnumAjax: {
            POST: 'POST',
            GET: 'GET'
        },
        uploadFileAndForm: function (options) {
            $.ajax({
                url: options.url,
                type: 'POST',
                data: new FormData(options.form[0]),
                async: false,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: function () {
                    options.success();
                },
                error: function () {
                    options.error();
                }
            });
        },
        EnumEventos: {
            onChange: 'bbonChange',
            onUpdate: 'bbonUpdate',
            onAlert: 'bbonAviso',
            onAppLoaded: 'bbonAppLoaded',
            onPrePaginar: 'bbprePaginar',
            onPaginar: 'bbPaginar',

            onGridNovo: 'bbgridNovo',
            onGridEnter: "bbonGridEnter",
            onGridSalvar: "bbonGridSalvar",
            onGridAtualizar: "bbonGridAtualizar",
            onGridNovoSalvar: "bbonGridNovoSalvar",
            onGridSelecionar: "bbonGridSelecionar",
            onGridCancelar: "bbonGridCancelar",

            onDetalhesSalvou: 'bbonDetalhesSalvou',
            onModalReturn: 'bbonModalReturn',
            onRequestComplete: 'bbonRequestComplete',
            onPartialClose: 'bbonPartialClose',
            onModalOpenComplete: 'bbonModalOpenComplete'
        },
        EnumKeyShortcuts: {
            EXPORT_EXCEL: 'ctrl+e',
            FOCUS_GRID: 'ctrl+f6',
            FOCUS_MENU_LATERAL: 'ctrl+f5',
            ADICIONAR: 'f4',
            ADICIONAR_TELFONE: 'ctrl+f4',
            BUSCAR: 'ctrl+f3',
            UP: 'up',
            ESC: 'esc',
            DOWN: 'down',
            NEXT: 'right',
            PREV: 'left',
            GRID_NEXT: 'ctrl+right',
            GRID_PREV: 'ctrl+left',
            ENTER: 'ctrl+enter',
            ALT: 'ctrl+alt',
            PAGE_ID: 'ctrl+q',
            CTRL_SHIFT_S: 'ctrl+shift+s',
            CTRL_O: 'f8',
            DEL: 'del'
        },
        notificacao: function () {
            var ui = $(".alert"),
                closeBtn = ui.find(".close"),
                fadeTime = 100,
                delay = 3000, //miliseconds
                tituloErro,
                tituloSucesso,
                tituloInfo,
                tituloAviso;

            tituloErro = ui.find(".text-error").text();
            tituloSucesso = ui.find(".text-success").text();
            tituloInfo = ui.find(".text-info").text();
            tituloAviso = ui.find(".text-block").text();

            window.notificacaoTimer = window.notificacaoTimer || {};

            closeBtn.unbind();
            closeBtn.click(function () {
                reset();
            });

            ui.click(function () {
                reset();
            });

            function reset() {
                ui.addClass('hidden');
                ui.find(".text").html('');
                ui.removeClass("alert-danger")
                    .removeClass("alert-success")
                    .removeClass("alert-warning")
                    .removeClass("alert-info");

                if (window.notificacaoTimer) {
                    $.killTimeOut(window.notificacaoTimer);
                    window.notificacaoTimer = undefined;
                }
            }

            function adicionarTexto(options) {
                ui.find(".title").text(options.title);
                ui.find(".text").html(options.message);
            }

            function exibir(cssClass, options) {
                reset();
                adicionarTexto(options);
                ui.removeClass('hidden');
                ui.addClass('alert-block {0}'.format(cssClass)).fadeIn(fadeTime);
                window.notificacaoTimer = $.wait(delay, reset);
                //delay = 3000;
            }

            this.exibirErrorInterno = function (options) {
                delay = 10000;
                if (!options.title) {
                    options.title = tituloErro;
                }
                exibir("alert-danger", options);
            };

            this.exibirSucessoInterno = function (options) {
                delay = 1500;
                if (!options.title) {
                    options.title = tituloSucesso;
                }
                exibir("alert-success", options);
            };

            this.exibirInfoInterno = function (options) {
                delay = 10000;
                if (!options.title) {
                    options.title = tituloInfo;
                }
                exibir("alert-info", options);
            };

            this.exibirAvisoInterno = function (options) {
                delay = 10000;
                if (!options.title) {
                    options.title = tituloAviso;
                }
                exibir("alert-warning", options);
            };

            this.hide = function () {
                reset();
            };

            return this;
        },
        exibirAviso: function (message) {
            Utilidades.notificacao().exibirAvisoInterno({ message: message });
        },
        exibirError: function (message) {
            var texto = message;
            if ((typeof message !== 'string') && message && message.mensagem) {
                texto = message.mensagem;
            }
            Utilidades.notificacao().exibirErrorInterno({ message: texto });
        },
        exibirSucesso: function (message) {
            Utilidades.notificacao().exibirSucessoInterno({ message: message });
        },
        exibirInfo: function (message) {
            Utilidades.notificacao().exibirInfoInterno({ message: message });
        },
        avisoRemover: function () {
            Utilidades.notificacao().hide();
        },
        tituloAtencao: function () {
            return $('.alert').find('.text-error').text();
        },
        prompt: function (options) {
            bootbox.prompt(options.title, function (result) {
                if (result) {
                    options.callback(result);
                }
            });
        },
        confirm: function (options) {
            $('.bootbox > .modal-body').addClass('modal-body-confirm');

            var title = $('.boot-box-atencao').text(),
                bootboxTextos = {
                    OK: $('.boot-box-ok').text(),
                    CANCEL: $('.boot-box-cancel').text(),
                    CONFIRM: $('.boot-box-confirm').text()
                }, html;

            if (options.title) {
                title = options.title;
            }

            html = '<strong class="atencao">{0}</strong><br><br>{1}'.format(title, options.message);

            bootbox.addLocale('custom', bootboxTextos);
            bootbox.setLocale('custom');

            bootbox.confirm(html, function (result) {
                if (result === true) {
                    options.confirm();
                    $('.bootbox > .modal-body').removeClass('modal-body-confirm');
                } else {
                    if (options.cancel) {
                        options.cancel();
                    }
                }
            });

            $('.bootbox').parent().find('.modal-backdrop:eq(1)').css('z-index', '1049');
        },
        consultaAjax: function (pUrl, pMethod, pSuccessCallBack, pErroCallBack, pData, isJson, pasync) {
            var mensagem = '',
                contentType = 'application/x-www-form-urlencoded',
                traditional = false;

            if (isJson) {
                contentType = 'application/json';
                traditional = true;
            }

            Utilidades.bloquearInteracao();

            return $.ajax({
                type: pMethod,
                url: pUrl,
                async: pasync,
                data: pData,
                cache: false,
                contentType: contentType,
                traditional: traditional,
                success: function (data) {
                    Utilidades.habilitarInteracao();

                    mensagem = data.Mensagem;
                    if (data.ESucesso) {
                        if (mensagem && mensagem.length) {
                            Utilidades.exibirSucesso(mensagem);
                        }

                        if (pSuccessCallBack) {
                            pSuccessCallBack(data);
                        }
                    } else {
                        if (mensagem && mensagem.length) {
                            Utilidades.exibirError(mensagem);
                        }

                        if (pErroCallBack) {
                            pErroCallBack(data);
                        }

                        if (data.LoginUrl) {
                            $.wait(700, function () {
                                window.location.href = data.LoginUrl;

                            })
                        }
                    }
                },
                error: function (data) {
                    mensagem = data.mensagem;
                    if (data.status === 404) {
                        mensagem = '{0} - {1}'.format($(data.responseText)[1].text, pUrl);
                    }

                    if (data.status === 500) {
                        mensagem = $(data.responseText)[1].text;
                    }
                    if (mensagem.length) {
                        Utilidades.exibirError(mensagem);
                    }

                    Utilidades.habilitarInteracao();

                    if (pErroCallBack) {
                        pErroCallBack(data);
                    }
                },
                complete: function () {
                    app.dispatcher.trigger(app.utilidades.EnumEventos.onRequestComplete);
                }
            });
        }
    };
    return Utilidades;
});