(function ($) {
    //CONSOLE LOG
    // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    //modo de usar: console.log(objeto,string,numbers,"hello");
    window.log = function f() { log.history = log.history || []; log.history.push(arguments); if (this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr); } };
    // make it safe to use console.log always
    (function (a) { function b() { } for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop()) ;) { a[d] = a[d] || b; } })
    (function () { try { console.log(); return window.console; } catch (a) { return (window.console = {}); } }());

    //STRING CONTAINS
    String.prototype.contains = function (text) {
        var result = this.indexOf(text) != -1;
        return result;
    };

    //STRING FORMAT
    //MODO DE USAR: var str="Texte {0}".formar(valor);
    String.prototype.format = function () {
        var content = this,
            i = 0,
            total = arguments.length,
            replacement;

        for (i; i < total; i += 1) {
            replacement = "{" + i + "}";
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };

    //digite apenas campos numericos    
    $.fn.numbersOnly = function () {
        var ctrlKey = 17, vKey = 86, cKey = 67, ctrlDown = false;
        this.keydown(function (evt) {
            var code = parseInt(event.keyCode, 10);
            if (code === ctrlKey) ctrlDown = true;
            if (!(event.keyCode === 8                                // backspace
                    || ctrlDown
                    || code === 9                                // tab
                    || code === 17                               // ctrl
                    || code === 116                              // f5
                    || code === 46                              // delete
                    || (code >= 35 && event.keyCode <= 40)     // arrow keys/home/end
                    || (code >= 48 && event.keyCode <= 57)     // numbers on keyboard
                    || (code >= 96 && event.keyCode <= 105))   // number on keypad
                    ) {
                event.preventDefault();     // Prevent character input
            }

        }).keyup(function (evt) {
            var target = $(evt.currentTarget);
            if (evt.keyCode == ctrlKey) ctrlDown = false;
            var text = target.val().replace(/\D/g, '');
            target.val(text); //limpa valores que nao sao numero
        });
    };
    

    //NUMBER toDecimal
    //MODO DE USAR: var strDecimal ="1.222,56".toDecimal();
    //RETURN: 1222.56 - para poder fazer operacoes matematicas
    String.prototype.toDecimal = function () {
        var content = this,
            result;

        if (window.lang === "en-US") {
            result = content.replace(/\,/g, "");
        } else {
            result = content.replace(/\./g, "").replace(/\,/g, ".");
        }
        return result;
    }

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    //busca de cep
    $.fn.cepConsultar = function (campos, success, error) {
        this.cep({
            load: function () {
            },
            complete: function () {
            },
            error: function (msg) {
                console.log('error');
                error(msg);
            },
            success: function (data) {
                campos.endereco.val(data.tipoLogradouro + ' ' + data.logradouro);
                campos.bairro.val(data.bairro);
                campos.estado.val(data.estado);
                campos.cidade.val(data.cidade);
                campos = undefined;
                success();
            }
        });
    };

    //GET QUERYSTRING PARAMETERS FROM URL
    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = decodeURI(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
            var total = hashes.length;
            for (var i = 0; i < total; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0].toLowerCase());
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

    //VALIDA SE CHECKBOX | RADIO BUTTON ESTA SELECIONADO
    //MODE DE USAR: $("checkbox").isSelected();
    //RETORNO: boolean;
    $.fn.isSelected = function () {
        var selected = this.attr("checked");
        return selected;
    }

    //VALIDA SE EXISTE AO MENOS 1 ITEM SELECIONADO (CHECKBOX | RADIOBUTTON)
    //MODE DE USAR: $("container").hasSelected();
    //RETORNO: boolean;
    $.fn.hasSelected = function () {
        var selected = (this.find("input:checked").length);
        return selected;
    }

    //VALIDA SE EXISTE AO MENOS 1 ITEM NO GRID
    //MODE DE USAR: $("container").hasRows();
    //RETORNO: numero de linhas;
    $.fn.hasRows = function () {
        var rows = this.find("tbody").find("tr").length;
        return rows;
    }

    //HABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").enableInput();
    $.fn.enableInput = function () {
        this.removeClass("disabled").attr("disabled", false);
        this.find(':input').each(function (index, elmt) {
            $(elmt).removeClass("disabled").attr("disabled", false);
        });

        return this;
    };

    //DESABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").disableInput();
    $.fn.disableInput = function () {
        this.addClass("disabled").attr("disabled", true);
        this.find(':input').each(function (index, elmt) {
            $(elmt).addClass("disabled").attr("disabled", true);
        });

        return this;
    };

    //HABILITA BOTAO
    //MODO DE USAR: $("selector").enableButton('btn-success');
    $.fn.enableButton = function (classBtn) {
        this.removeClass("disabled").removeClass('btn-default').removeAttr("disabled").addClass(classBtn);
        return this;
    };

    //DESABILITA BOTAO
    //MODO DE USAR: $("selector").disableButton('btn-primary');
    $.fn.disableButton = function (classBtn) {
        this.addClass("disabled").addClass('btn-default').attr("disabled", true).removeClass(classBtn);
        return this;
    };

    //OBTER VALORES SELECIONADOS CHECKBOX | RADIOBUTTONLIST
    //MODO DE USAR: $(container).getSelectedValues()
    //RETORNO:  Array com valores marcados
    $.fn.getSelectedValues = function () {
        var valores = [];
        this.find("input:checked").each(function (index) {
            var val = $(this).val();
            valores[index] = val;
        });

        return valores;
    };

    //RESETA CAMPOS COM AVISO PARA SEU ESTADO NORMAL
    //DEPENDENCIA: jQuery.validate
    //MODO DE USAR: $("form").reset();
    $.fn.reset = function () {
        var validator = this.validate();
        this.clearForm();
        this.find("label.error").text("");
        this.find("*").removeClass("error");
        validator.resetForm();
        $(".field-validation-error").empty();
    };

    //ESCONDER COLUNA GRID
    //MODE DE USAR: $("tabela").hideColumn(1).hideColumn(2).hideColumn(3);
    //RETORNO: elemento;
    $.fn.hideColumn = function (index) {
        var headerColunas = this.find("th:nth-child(" + (index + 1) + ")");
        headerColunas.hide();

        var colunas = this.find("td:nth-child(" + (index + 1) + ")");
        colunas.hide();

        return this;
    };

    //DESMARCAR TODAS OPÇÕES SELECIONADAS CHECKBOX LIST | RADIOBUTTON LIST
    //modo de usar: $(seletor).unselectAll();
    $.fn.unselectAll = function () {
        this.find("input:checked").each(function (index) {
            $(this).removeAttr("checked");
        });
    };

    //SELECIONAR CHECKBOX LIST | RADIOBUTTON LIST POR VALOR
    //modo de usar: $(seletor).listSelectValue ("valor");
    $.fn.listSelectValue = function (valor) {
        this.find("input").each(function (index) {
            var elmt = $(this),
                val = elmt.val().toString();

            if (val.toString() === valor) {
                elmt.prop('checked', true);
            }
        });
    }

    //ADICIONA EVENTOS DE CLICK NO RADIO BUTTON LIST
    //modo de usar: $(seletorRadioButtoList).radioButtonListClick(onClick);
    $.fn.radioButtonListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":radio")) {
                var radioButton = $(this).find("input:radio");

                var isEnable = !radioButton.attr("disabled");

                if (isEnable) {
                    radioButton.attr("checked", true);

                    if (onChangeCallBack) {
                        onChangeCallBack(radioButton);
                    }
                }
            }
        });

        return this;
    };

    //CHECKBOX LIST
    //modo de usar: $(seletorCheckBoxList).checkBoxListClick(onClick);
    $.fn.checkBoxListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":checkbox")) {
                var checkBox = $(this).find("input:checkbox");

                if (!checkBox.attr("disabled")) {
                    var isChecked = checkBox.is(":checked");

                    if ($(evt.target).attr("type") === "checkbox") {
                        checkBox.attr("checked", isChecked);
                    } else {
                        checkBox.attr("checked", !isChecked);
                    }

                    if (onChangeCallBack) {
                        onChangeCallBack(checkBox);
                    }
                }
            }
        });

        return this;
    };

    //WAIT (delay callback)
    //MODO DE USAR: $.wait(delay,callback);
    $.extend({
        wait: function (delay, callBack) {
            var idTimeOut = setTimeout(onComplete, delay);
            function onComplete() {
                clearTimeout(idTimeOut);
                callBack();
            }

            return idTimeOut;
        }
    });

    //LIMPA CAMPOS DO FORMULARIO
    //MODO DE USAR: $("form").clearForm();
    $.fn.clearForm = function () {
        this.find(':input').each(function (index, elmt) {
            switch (this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
            }
        });
    };

    //KILL TIMEOUT ($.wait(500,func))
    //MODO DE USAR: var timer = $.wait(500,func);  //$.killTimeOut(timer);
    $.extend({
        killTimeOut: function (timer) {
            clearTimeout(timer);
        }
    });
    //Validar int requerido
    //$.validator.addMethod('not-required',
    //  function (value, element) {
    //      return true;
    //  });

    //HELPER PARA USAR O CKEDITOR
    /*MODO DE USAR:
        var ckeditorHelper = $(selector).ckeditorHelper(containerId);
        ckeditorHelper.setText(texto);
        ckeditorHelper.getFormatedText();
        ckeditorHelper.getText();
    */
    $.fn.ckeditorHelper = function (containerId, pConfig) {
        var html = "",
            editor = undefined,
            config = {},
            scope = this;

        if (window.CKEDITOR) {
            (function () {
                var showCompatibilityMsg = function () {
                    var env = CKEDITOR.env,
                        html = '<p><strong>Your browser is not compatible with CKEditor.</strong>',
                        browsers = {
                            gecko: 'Firefox 2.0',
                            ie: 'Internet Explorer 6.0',
                            opera: 'Opera 9.5',
                            webkit: 'Safari 3.0'
                        },
                        alsoBrowsers = '',
                        key,
                        alertsEl,
                        onload;

                    for (key in env) {
                        if (browsers[key]) {
                            if (env[key]) {
                                html += ' CKEditor is compatible with ' + browsers[key] + ' or higher.';
                            } else {
                                alsoBrowsers += browsers[key] + '+, ';
                            }
                        }
                    }

                    alsoBrowsers = alsoBrowsers.replace(/\+,([^,]+), $/, '+ and $1');

                    html += ' It is also compatible with ' + alsoBrowsers + '.';
                    html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';

                    alertsEl = document.getElementById('alerts');
                    alertsEl && (alertsEl.innerHTML === this.html);
                };

                onload = function () {
                    // Show a friendly compatibility message as soon as the page is loaded,
                    // for those browsers that are not compatible with CKEditor.
                    if (!CKEDITOR.env.isCompatible) {
                        showCompatibilityMsg();
                    }
                };

                // Register the onload listener.
                if (window.addEventListener) {
                    window.addEventListener('load', onload, false);
                } else if (window.attachEvent) {
                    window.attachEvent('onload', onload);
                }
            }());
        }

        /*if (editor) {
            return;
        }*/

        // Create a new editor inside the <div id="editor">, setting its value to html
        config.toolbar = 'Full';
        config.toolbar_Full =
            [
                { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] }
            ];

        if (pConfig) {
            config = pConfig;
        }

        editor = CKEDITOR.appendTo(containerId, config, html);

        setTimeout(function () {
            editor.execCommand("justifyleft", {});
        }, 200);

        CKEDITOR.on('instanceReady', function (ev) {
            ev.editor.on('paste', function (ev) {
                var htmlConteudo, retorno;

                try {
                    htmlConteudo = $("<p>{0}</p>".format(ev.data.dataValue));

                    if (htmlConteudo.length) {
                        htmlConteudo.find("span[style ^= 'background']").removeAttr("style");
                        htmlConteudo.find("span[style^='color']").removeAttr("style");
                        htmlConteudo.find("span[style^='font-family']").removeAttr("style");
                        htmlConteudo.find("span[style^='font-size']").removeAttr("style");
                        retorno = htmlConteudo.htlm();
                    }
                } catch (e) {
                    retorno = ev.data.html;
                }

                ev.data.html = retorno;
            });
        });

        CKEDITOR.on('instanceReady', function (ev) {
            ev.editor.on('paste', function (ev) {
                var re = /<[^<|>]+?>/gi,
                    htmlConteudo,
                    retorno = "",
                    result;

                result = re.exec(ev.data.dataValue.toString());
                retorno = ev.data.dataValue.toString();

                if (result) {
                    try {
                        htmlConteudo = $("<p>{0}</p>".format(ev.data.dataValue));

                        if (htmlConteudo.length) {
                            htmlConteudo.find("span[style^='background']").removeAttr("style");
                            htmlConteudo.find("span[style^='color']").removeAttr("style");
                            htmlConteudo.find("span[style^='font-family']").removeAttr("style");
                            htmlConteudo.find("span[style^='font-size']").removeAttr("style");

                            retorno = "";
                            htmlConteudo.each(function (index) {
                                var elmt = $(this);
                                retorno += elmt.prop('outerHTML');
                            });
                        }
                    } catch (e) {
                        retorno = ev.data.html;
                    }

                    ev.data.html = "{0}".format(retorno);
                }
            });
        });

        return {
            instance: editor,
            getFormatedText: function () {
                var textoHtml = scope.find("iframe").contents().find("body").html();
                return textoHtml;
            },
            getText: function () {
                var texto = app.utilidades.htmlRemover(scope.find("iframe").contents().find("body").html().replace(/&nbsp;/g, ''));
                return texto;
            },
            setText: function (value) {
                editor.setData(value);
            },
            destroy: function () {
                $("#" + containerId).empty();
            },
            readOnly: function () {
                CKEDITOR.config.readOnly = true;
            },
            focus: function () {
                var focusManager = new CKEDITOR.focusManager(editor);
                focusManager.focus();
            }
        };
    }
}(window.jQuery));
define("Scripts/plugins/ak-plugin", function(){});

define('utilidades',['Scripts/plugins/ak-plugin'], function () {
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
(function ($) {
    //CONSOLE LOG
    // paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
    //modo de usar: console.log(objeto,string,numbers,"hello");
    window.log = function f() { log.history = log.history || []; log.history.push(arguments); if (this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr); } };
    // make it safe to use console.log always
    (function (a) { function b() { } for (var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), d; !!(d = c.pop()) ;) { a[d] = a[d] || b; } })
    (function () { try { console.log(); return window.console; } catch (a) { return (window.console = {}); } }());

    //STRING CONTAINS
    String.prototype.contains = function (text) {
        var result = this.indexOf(text) != -1;
        return result;
    };

    //STRING FORMAT
    //MODO DE USAR: var str="Texte {0}".formar(valor);
    String.prototype.format = function () {
        var content = this,
            i = 0,
            total = arguments.length,
            replacement;

        for (i; i < total; i += 1) {
            replacement = "{" + i + "}";
            content = content.replace(replacement, arguments[i]);
        }
        return content;
    };

    //digite apenas campos numericos    
    $.fn.numbersOnly = function () {
        var ctrlKey = 17, vKey = 86, cKey = 67, ctrlDown = false;
        this.keydown(function (evt) {
            var code = parseInt(event.keyCode, 10);
            if (code === ctrlKey) ctrlDown = true;
            if (!(event.keyCode === 8                                // backspace
                    || ctrlDown
                    || code === 9                                // tab
                    || code === 17                               // ctrl
                    || code === 116                              // f5
                    || code === 46                              // delete
                    || (code >= 35 && event.keyCode <= 40)     // arrow keys/home/end
                    || (code >= 48 && event.keyCode <= 57)     // numbers on keyboard
                    || (code >= 96 && event.keyCode <= 105))   // number on keypad
                    ) {
                event.preventDefault();     // Prevent character input
            }

        }).keyup(function (evt) {
            var target = $(evt.currentTarget);
            if (evt.keyCode == ctrlKey) ctrlDown = false;
            var text = target.val().replace(/\D/g, '');
            target.val(text); //limpa valores que nao sao numero
        });
    };
    

    //NUMBER toDecimal
    //MODO DE USAR: var strDecimal ="1.222,56".toDecimal();
    //RETURN: 1222.56 - para poder fazer operacoes matematicas
    String.prototype.toDecimal = function () {
        var content = this,
            result;

        if (window.lang === "en-US") {
            result = content.replace(/\,/g, "");
        } else {
            result = content.replace(/\./g, "").replace(/\,/g, ".");
        }
        return result;
    }

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    //busca de cep
    $.fn.cepConsultar = function (campos, success, error) {
        this.cep({
            load: function () {
            },
            complete: function () {
            },
            error: function (msg) {
                console.log('error');
                error(msg);
            },
            success: function (data) {
                campos.endereco.val(data.tipoLogradouro + ' ' + data.logradouro);
                campos.bairro.val(data.bairro);
                campos.estado.val(data.estado);
                campos.cidade.val(data.cidade);
                campos = undefined;
                success();
            }
        });
    };

    //GET QUERYSTRING PARAMETERS FROM URL
    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = decodeURI(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
            var total = hashes.length;
            for (var i = 0; i < total; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0].toLowerCase());
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

    //VALIDA SE CHECKBOX | RADIO BUTTON ESTA SELECIONADO
    //MODE DE USAR: $("checkbox").isSelected();
    //RETORNO: boolean;
    $.fn.isSelected = function () {
        var selected = this.attr("checked");
        return selected;
    }

    //VALIDA SE EXISTE AO MENOS 1 ITEM SELECIONADO (CHECKBOX | RADIOBUTTON)
    //MODE DE USAR: $("container").hasSelected();
    //RETORNO: boolean;
    $.fn.hasSelected = function () {
        var selected = (this.find("input:checked").length);
        return selected;
    }

    //VALIDA SE EXISTE AO MENOS 1 ITEM NO GRID
    //MODE DE USAR: $("container").hasRows();
    //RETORNO: numero de linhas;
    $.fn.hasRows = function () {
        var rows = this.find("tbody").find("tr").length;
        return rows;
    }

    //HABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").enableInput();
    $.fn.enableInput = function () {
        this.removeClass("disabled").attr("disabled", false);
        this.find(':input').each(function (index, elmt) {
            $(elmt).removeClass("disabled").attr("disabled", false);
        });

        return this;
    };

    //DESABILITA CONTROLE E FILHOS
    //MODO DE USAR: $("selector").disableInput();
    $.fn.disableInput = function () {
        this.addClass("disabled").attr("disabled", true);
        this.find(':input').each(function (index, elmt) {
            $(elmt).addClass("disabled").attr("disabled", true);
        });

        return this;
    };

    //HABILITA BOTAO
    //MODO DE USAR: $("selector").enableButton('btn-success');
    $.fn.enableButton = function (classBtn) {
        this.removeClass("disabled").removeClass('btn-default').removeAttr("disabled").addClass(classBtn);
        return this;
    };

    //DESABILITA BOTAO
    //MODO DE USAR: $("selector").disableButton('btn-primary');
    $.fn.disableButton = function (classBtn) {
        this.addClass("disabled").addClass('btn-default').attr("disabled", true).removeClass(classBtn);
        return this;
    };

    //OBTER VALORES SELECIONADOS CHECKBOX | RADIOBUTTONLIST
    //MODO DE USAR: $(container).getSelectedValues()
    //RETORNO:  Array com valores marcados
    $.fn.getSelectedValues = function () {
        var valores = [];
        this.find("input:checked").each(function (index) {
            var val = $(this).val();
            valores[index] = val;
        });

        return valores;
    };

    //RESETA CAMPOS COM AVISO PARA SEU ESTADO NORMAL
    //DEPENDENCIA: jQuery.validate
    //MODO DE USAR: $("form").reset();
    $.fn.reset = function () {
        var validator = this.validate();
        this.clearForm();
        this.find("label.error").text("");
        this.find("*").removeClass("error");
        validator.resetForm();
        $(".field-validation-error").empty();
    };

    //ESCONDER COLUNA GRID
    //MODE DE USAR: $("tabela").hideColumn(1).hideColumn(2).hideColumn(3);
    //RETORNO: elemento;
    $.fn.hideColumn = function (index) {
        var headerColunas = this.find("th:nth-child(" + (index + 1) + ")");
        headerColunas.hide();

        var colunas = this.find("td:nth-child(" + (index + 1) + ")");
        colunas.hide();

        return this;
    };

    //DESMARCAR TODAS OPÇÕES SELECIONADAS CHECKBOX LIST | RADIOBUTTON LIST
    //modo de usar: $(seletor).unselectAll();
    $.fn.unselectAll = function () {
        this.find("input:checked").each(function (index) {
            $(this).removeAttr("checked");
        });
    };

    //SELECIONAR CHECKBOX LIST | RADIOBUTTON LIST POR VALOR
    //modo de usar: $(seletor).listSelectValue ("valor");
    $.fn.listSelectValue = function (valor) {
        this.find("input").each(function (index) {
            var elmt = $(this),
                val = elmt.val().toString();

            if (val.toString() === valor) {
                elmt.prop('checked', true);
            }
        });
    }

    //ADICIONA EVENTOS DE CLICK NO RADIO BUTTON LIST
    //modo de usar: $(seletorRadioButtoList).radioButtonListClick(onClick);
    $.fn.radioButtonListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":radio")) {
                var radioButton = $(this).find("input:radio");

                var isEnable = !radioButton.attr("disabled");

                if (isEnable) {
                    radioButton.attr("checked", true);

                    if (onChangeCallBack) {
                        onChangeCallBack(radioButton);
                    }
                }
            }
        });

        return this;
    };

    //CHECKBOX LIST
    //modo de usar: $(seletorCheckBoxList).checkBoxListClick(onClick);
    $.fn.checkBoxListClick = function (onChangeCallBack) {
        this.find("label").click(function (evt) {
            if ($(evt.target).is(":checkbox")) {
                var checkBox = $(this).find("input:checkbox");

                if (!checkBox.attr("disabled")) {
                    var isChecked = checkBox.is(":checked");

                    if ($(evt.target).attr("type") === "checkbox") {
                        checkBox.attr("checked", isChecked);
                    } else {
                        checkBox.attr("checked", !isChecked);
                    }

                    if (onChangeCallBack) {
                        onChangeCallBack(checkBox);
                    }
                }
            }
        });

        return this;
    };

    //WAIT (delay callback)
    //MODO DE USAR: $.wait(delay,callback);
    $.extend({
        wait: function (delay, callBack) {
            var idTimeOut = setTimeout(onComplete, delay);
            function onComplete() {
                clearTimeout(idTimeOut);
                callBack();
            }

            return idTimeOut;
        }
    });

    //LIMPA CAMPOS DO FORMULARIO
    //MODO DE USAR: $("form").clearForm();
    $.fn.clearForm = function () {
        this.find(':input').each(function (index, elmt) {
            switch (this.type) {
                case 'password':
                case 'select-multiple':
                case 'select-one':
                case 'text':
                case 'textarea':
                    $(this).val('');
                    break;
                case 'checkbox':
                case 'radio':
                    this.checked = false;
            }
        });
    };

    //KILL TIMEOUT ($.wait(500,func))
    //MODO DE USAR: var timer = $.wait(500,func);  //$.killTimeOut(timer);
    $.extend({
        killTimeOut: function (timer) {
            clearTimeout(timer);
        }
    });
    //Validar int requerido
    //$.validator.addMethod('not-required',
    //  function (value, element) {
    //      return true;
    //  });

    //HELPER PARA USAR O CKEDITOR
    /*MODO DE USAR:
        var ckeditorHelper = $(selector).ckeditorHelper(containerId);
        ckeditorHelper.setText(texto);
        ckeditorHelper.getFormatedText();
        ckeditorHelper.getText();
    */
    $.fn.ckeditorHelper = function (containerId, pConfig) {
        var html = "",
            editor = undefined,
            config = {},
            scope = this;

        if (window.CKEDITOR) {
            (function () {
                var showCompatibilityMsg = function () {
                    var env = CKEDITOR.env,
                        html = '<p><strong>Your browser is not compatible with CKEditor.</strong>',
                        browsers = {
                            gecko: 'Firefox 2.0',
                            ie: 'Internet Explorer 6.0',
                            opera: 'Opera 9.5',
                            webkit: 'Safari 3.0'
                        },
                        alsoBrowsers = '',
                        key,
                        alertsEl,
                        onload;

                    for (key in env) {
                        if (browsers[key]) {
                            if (env[key]) {
                                html += ' CKEditor is compatible with ' + browsers[key] + ' or higher.';
                            } else {
                                alsoBrowsers += browsers[key] + '+, ';
                            }
                        }
                    }

                    alsoBrowsers = alsoBrowsers.replace(/\+,([^,]+), $/, '+ and $1');

                    html += ' It is also compatible with ' + alsoBrowsers + '.';
                    html += '</p><p>With non compatible browsers, you should still be able to see and edit the contents (HTML) in a plain text field.</p>';

                    alertsEl = document.getElementById('alerts');
                    alertsEl && (alertsEl.innerHTML === this.html);
                };

                onload = function () {
                    // Show a friendly compatibility message as soon as the page is loaded,
                    // for those browsers that are not compatible with CKEditor.
                    if (!CKEDITOR.env.isCompatible) {
                        showCompatibilityMsg();
                    }
                };

                // Register the onload listener.
                if (window.addEventListener) {
                    window.addEventListener('load', onload, false);
                } else if (window.attachEvent) {
                    window.attachEvent('onload', onload);
                }
            }());
        }

        /*if (editor) {
            return;
        }*/

        // Create a new editor inside the <div id="editor">, setting its value to html
        config.toolbar = 'Full';
        config.toolbar_Full =
            [
                { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', '-', 'RemoveFormat'] },
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                { name: 'colors', items: ['TextColor', 'BGColor'] }
            ];

        if (pConfig) {
            config = pConfig;
        }

        editor = CKEDITOR.appendTo(containerId, config, html);

        setTimeout(function () {
            editor.execCommand("justifyleft", {});
        }, 200);

        CKEDITOR.on('instanceReady', function (ev) {
            ev.editor.on('paste', function (ev) {
                var htmlConteudo, retorno;

                try {
                    htmlConteudo = $("<p>{0}</p>".format(ev.data.dataValue));

                    if (htmlConteudo.length) {
                        htmlConteudo.find("span[style ^= 'background']").removeAttr("style");
                        htmlConteudo.find("span[style^='color']").removeAttr("style");
                        htmlConteudo.find("span[style^='font-family']").removeAttr("style");
                        htmlConteudo.find("span[style^='font-size']").removeAttr("style");
                        retorno = htmlConteudo.htlm();
                    }
                } catch (e) {
                    retorno = ev.data.html;
                }

                ev.data.html = retorno;
            });
        });

        CKEDITOR.on('instanceReady', function (ev) {
            ev.editor.on('paste', function (ev) {
                var re = /<[^<|>]+?>/gi,
                    htmlConteudo,
                    retorno = "",
                    result;

                result = re.exec(ev.data.dataValue.toString());
                retorno = ev.data.dataValue.toString();

                if (result) {
                    try {
                        htmlConteudo = $("<p>{0}</p>".format(ev.data.dataValue));

                        if (htmlConteudo.length) {
                            htmlConteudo.find("span[style^='background']").removeAttr("style");
                            htmlConteudo.find("span[style^='color']").removeAttr("style");
                            htmlConteudo.find("span[style^='font-family']").removeAttr("style");
                            htmlConteudo.find("span[style^='font-size']").removeAttr("style");

                            retorno = "";
                            htmlConteudo.each(function (index) {
                                var elmt = $(this);
                                retorno += elmt.prop('outerHTML');
                            });
                        }
                    } catch (e) {
                        retorno = ev.data.html;
                    }

                    ev.data.html = "{0}".format(retorno);
                }
            });
        });

        return {
            instance: editor,
            getFormatedText: function () {
                var textoHtml = scope.find("iframe").contents().find("body").html();
                return textoHtml;
            },
            getText: function () {
                var texto = app.utilidades.htmlRemover(scope.find("iframe").contents().find("body").html().replace(/&nbsp;/g, ''));
                return texto;
            },
            setText: function (value) {
                editor.setData(value);
            },
            destroy: function () {
                $("#" + containerId).empty();
            },
            readOnly: function () {
                CKEDITOR.config.readOnly = true;
            },
            focus: function () {
                var focusManager = new CKEDITOR.focusManager(editor);
                focusManager.focus();
            }
        };
    }
}(window.jQuery));
define("plugins/ak-plugin", function(){});

define('master',[], function () {
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
define('app',['utilidades', 'plugins/ak-plugin', 'master'], function (Utilidades, akPlugin, Master) {
    var App,
        browser,
        os,
        version;
    App = function () {
        this.utilidades = {};
        this.master = {};
        this.dispatcher = {};
    };

    BrowserDetect.init();
    browser = BrowserDetect.browser.toLowerCase();
    os = BrowserDetect.OS.toLowerCase().replace(/" "/, "");
    version = BrowserDetect.version;
    if (!Backbone.History.started) {
        Backbone.history.start({ pushState: false });
    }

    $("html").addClass("{0} {1}-{2} {3}".format(browser, browser, version, os));
    if (!window.app) {
        window.app = new App();

        _.extend(window.app.dispatcher, Backbone.Events);

        window.app.utilidades = Utilidades;
        window.app.master = new Master(window.app);
    }

    return window.app;
});
define('views/esqueciminhasenha',['app'], function (app) {
    var EsqueciMinhaSenha = Backbone.View.extend({
        el: '.requisitar-senha-ph',
        initialize: function () {            
            app.master.activeModal = this;
            this.render();
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.$el.empty();
        },
        render: function () {
            this.form = this.$el.find('.formulario');
            this.form.validate();
            this.url = this.form.attr('action');
            this.delegateEvents(this.events);

            return this;
        },
        validar: function () {
            this.form.validate();
            var valid = this.form.valid();
            return valid;
        },
        enviar: function () {
            var url = this.form.attr("action"),
                dataPost = this.form.serializeObject(),            
                scope = this;

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (data) {
                if (data.Mensagem == '') {
                    if (data.DetalhesHtml) {
                        $('.ph').empty().append(data.DetalhesHtml);
                    }
                } else {
                    app.utilidades.modal.fechar();
                }
            }, null, dataPost);
        },
        events: {
            'click .btn-enviar': 'onBtnEnviarClick'
        },
        onBtnEnviarClick: function (evt) {
            var valid = this.validar();
            if (!valid) {
                return false;
            }

            evt.preventDefault();
            this.enviar();
        },
    });

    return EsqueciMinhaSenha;
});
require(['views/esqueciminhasenha'], function (EsqueciMinhaSenha) {
    var view = new EsqueciMinhaSenha();
});
define("Scripts/app/views/esqueciminhasenha-main", function(){});

