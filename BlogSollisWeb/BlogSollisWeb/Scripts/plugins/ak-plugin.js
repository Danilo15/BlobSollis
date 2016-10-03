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