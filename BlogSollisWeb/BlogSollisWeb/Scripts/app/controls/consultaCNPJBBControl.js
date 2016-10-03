define([], function () {
    var ConsultaCNPJBBControl = Backbone.View.extend({
        el: ".consulta-cnpj",
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
            }

            this.url = this.$el.data("url");
            if (this.options.url) {
                this.url = this.options.url;
                this.$el.data("url", this.url);
            }

            this.formulario = this.$el.find(".consulta-cnpj-content");
            this.resultadoView = this.$el.find(".consulta-cnpj-result");
            this.receitaDados = [];
            this.btnConsultar = $(".consulta-cnpj-btn-enviar");
            this.receitaDados.AtividadeSecundaria = [];
            this.adicionarDependencias();
            this.completeCallBack = null;
            this.campoCNPJ = this.$el.find("input[name=cnpj]");

            this.render();

            this.delegateEvents(this.event);
        },
        getCaptcha: function () {
            var url = "/ConsultaCNPJ/GetCaptcha",
                scope = this;
            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
                scope.$el.find('.imgCaptcha').prop("src", result.Json.imagemCaptcha);
                scope.formulario.removeClass('hide');
            }, function (result) {
                scope.atualizarImagemCaptcha();
                scope.btnConsultar.button("reset");
                scope.formulario.removeClass('hide');
                scope.trigger(app.utilidades.EnumEventos.onConsultaCNPJErro, result);
            }, null, true);
        },
        render: function () {
            var scope = this;
            this.imgCaptcha = this.$el.find(".imgcaptcha");

            if (parseInt(this.$el.parent().parent().find(".somenteleitura").val(), 10)===0) {
                $.wait(500, function () {
                    scope.campoCNPJ.focus();
                    scope.getCaptcha();
                });
            }           

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            this.stopListening();
            $(this.el).removeData().unbind();
            $(this.el).empty();
        },
        complete: function (callback) {
            this.completeCallBack = callback;
        },
        adicionarDependencias: function () {
            var head = $("head"),
                css = "<link id='consultacnpjcss' href='/Content/build/consulta-cnpj.css' rel='stylesheet' type='text/css'/>";

            if (!head.find("link[id='consultacnpjcss']").length) {
                head.prepend(css);
            }
        },
        traceValores: function () {
            var i = 0,
                registros = this.receitaDados.AtividadeSecundaria,
                obj,
                total;

            total = registros.length;

            console.log("Matriz = " + this.receitaDados.Matriz);
            console.log("numeroInscricao = " + this.receitaDados.numeroInscricao);
            console.log("Abertura = " + this.receitaDados.Abertura);
            console.log("NomeFantasia = " + this.receitaDados.NomeFantasia);
            console.log("titulo = " + this.receitaDados.Titulo);
            console.log("codAtividadePrincipal = {0} - {1}".format(this.receitaDados.codAtividadePrincipal.codigo, this.receitaDados.codAtividadePrincipal.descricao));

            for (i; i < total; i += 1) {
                obj = registros[i];
                console.log("codigo = " + obj.codigo);
                console.log("descricao = " + obj.descricao);
            }
            console.log("codNaturezaJuridica = {0} - {1}".format(this.receitaDados.codNaturezaJuridica.codigo, this.receitaDados.codNaturezaJuridica.descricao));
            console.log("Endereco = " + this.receitaDados.Endereco);
            console.log("Numero = " + this.receitaDados.Numero);
            console.log("Complemento = " + this.receitaDados.Complemento);
            console.log("Cep = " + this.receitaDados.Cep);
            console.log("Bairro = " + this.receitaDados.Bairro);
            console.log("Cidade = " + this.receitaDados.Cidade);
            console.log("Estado = " + this.receitaDados.Estado);
            console.log("SituacaoCadastral = " + this.receitaDados.SituacaoCadastral);
            console.log("SituacaoCadastralData = " + this.receitaDados.SituacaoCadastralData);
            console.log("SituacaoMotivo = " + this.receitaDados.SituacaoMotivo);
            console.log("SituacaoEspecial = " + this.receitaDados.SituacaoEspecial);
            console.log("SituacaoEspecialData = " + this.receitaDados.SituacaoEspecialData);
        },
        popularLabelArray: function () {
            this.labelArray = [];
            this.labelArray.push("NÚMERO DE INSCRIÇÃO");
            this.labelArray.push("DATA DE ABERTURA");
            this.labelArray.push("NOME EMPRESARIAL");
            this.labelArray.push("TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)");
            this.labelArray.push("CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL");
            this.labelArray.push("CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS");
            this.labelArray.push("CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA");
            this.labelArray.push("LOGRADOURO");
            this.labelArray.push("NÚMERO");
            this.labelArray.push("COMPLEMENTO");
            this.labelArray.push("CEP");
            this.labelArray.push("BAIRRO/DISTRITO");
            this.labelArray.push("MUNICÍPIO");
            this.labelArray.push("UF");
            this.labelArray.push("SITUAÇÃO CADASTRAL");
            this.labelArray.push("DATA DA SITUAÇÃO CADASTRAL");
            this.labelArray.push("MOTIVO DE SITUAÇÃO CADASTRAL");
            this.labelArray.push("SITUAÇÃO ESPECIAL");
            this.labelArray.push("DATA DA SITUAÇÃO ESPECIAL");
        },
        consultar: function () {
            var data = {},
                url = "/ConsultaCNPJ/Consultar",
                scope = this;

            this.resultadoView.empty();
            data.cnpj = $("input[name=cnpj]").val().replace(/\D/g, "");
            data.captcha = $("input[name=txtTexto_captcha_serpro_gov_br]").val();

            if (data.cnpj.length && data.captcha.length) {
                this.btnConsultar.button('loading');

                app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
                    scope.atualizarDadosReceita(result.Json.dadosReceita);
                    scope.$el.find('.imgCaptcha').prop("src", result.Json.imagemCaptcha);
                }, function (result) {
                    scope.atualizarImagemCaptcha();
                    scope.btnConsultar.button("reset");
                    scope.trigger(app.utilidades.EnumEventos.onConsultaCNPJErro, result);
                }, JSON.stringify(data), true);
            }
        },
        atualizarDadosReceita: function (dadosReceita) {            
            if (dadosReceita) {
                this.resultado(dadosReceita);
                if (this.completeCallBack) {
                    this.completeCallBack(this.receitaDados);
                }
            }
            this.$el.find('#txtTexto_captcha_serpro_gov_br').val('');
            this.$el.find('#txtTexto_captcha_serpro_gov_br').focus();

            this.btnConsultar.button('reset');
        },
        atualizarImagemCaptcha: function () {
            this.$el.find('#txtTexto_captcha_serpro_gov_br').val('');
            this.$el.find('#txtTexto_captcha_serpro_gov_br').focus();
        },
        procurar: function (array) {
            var proximo = array[i + 1],
                separacao = [],
                obj = {},
                inicio = 0,
                posicao2,
                final = 0,
                dif,
                total = array.length,
                i = 0,
                valor,
                codigo,
                descricao;

            function separarAtividadeSecundaria(texto) {
                var array = [],
                    separacao = texto.split(" - "),
                    separado,
                    i = 0;

                for (i; i < separacao.length; i += 1) {
                    separado = $.trim(separacao[i]);
                    if (separado.length > 0) {
                        array.push(separado);
                    }
                }
                return array;
            }

            function labelPosicaoNoArray(array, texto) {
                var index = 0,
                    i = 0,
                    total = array.length;
                for (i; i < total; i += 1) {
                    if (array[i].toUpperCase() === texto.toUpperCase()) {
                        index = i;
                        break;
                    }
                }
                return index;
            }

            for (i; i < total; i += 1) {
                proximo = array[i + 1];
                switch (array[i].toUpperCase()) {
                    case "NÚMERO DE INSCRIÇÃO":
                        this.receitaDados.numeroInscricao = proximo;
                        break;
                    case "DATA DE ABERTURA":
                        this.receitaDados.Abertura = proximo;
                        break;
                    case "NOME EMPRESARIAL":
                        this.receitaDados.RazaoSocial = proximo;
                        break;
                    case "TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)":
                        this.receitaDados.NomeFantasia = proximo;
                        break;
                    case "CÓDIGO E DESCRIÇÃO DA ATIVIDADE ECONÔMICA PRINCIPAL":
                        valor = proximo;
                        codigo = proximo.split(" - ")[0];
                        descricao = proximo.split(" - ")[1];

                        this.receitaDados.codAtividadePrincipal = { codigo: codigo, descricao: descricao };
                        break;
                    case "CÓDIGO E DESCRIÇÃO DAS ATIVIDADES ECONÔMICAS SECUNDÁRIAS":
                        posicao2 = labelPosicaoNoArray(array, "CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA");
                        dif = posicao2 - i;
                        inicio = i + 1;
                        final = i + dif;
                        for (inicio; inicio < final; inicio += 1) {
                            separacao = separarAtividadeSecundaria(array[inicio]);
                            obj = {};
                            if (separacao[0].toUpperCase() === "NÃO INFORMADA") {
                                obj.codigo = "Não informada";
                                obj.descricao = "";
                            } else {
                                obj.codigo = separacao[0];
                                obj.descricao = separacao[1];
                            }
                            this.receitaDados.AtividadeSecundaria.push(obj);
                            i += 1;
                        }
                        break;
                    case "CÓDIGO E DESCRIÇÃO DA NATUREZA JURÍDICA":
                        valor = proximo;
                        codigo = proximo.split(" - ")[0];
                        descricao = proximo.split(" - ")[1];
                        this.receitaDados.codNaturezaJuridica = { codigo: codigo, descricao: descricao };
                        break;
                    case "LOGRADOURO":
                        this.receitaDados.Endereco = proximo;
                        break;
                    case "NÚMERO":
                        this.receitaDados.Numero = proximo;
                        break;
                    case "COMPLEMENTO":
                        this.receitaDados.Complemento = proximo;
                        break;
                    case "CEP":
                        this.receitaDados.Cep = proximo;
                        break;
                    case "BAIRRO/DISTRITO":
                        this.receitaDados.Bairro = proximo;
                        break;
                    case "MUNICÍPIO":
                        this.receitaDados.Cidade = proximo;
                        break;
                    case "UF":
                        this.receitaDados.Estado = proximo;
                        break;
                    case "SITUAÇÃO CADASTRAL":
                        this.receitaDados.SituacaoCadastral = proximo;
                        break;
                    case "DATA DA SITUAÇÃO CADASTRAL":
                        this.receitaDados.SituacaoCadastralData = proximo;
                        break;
                    case "MOTIVO DE SITUAÇÃO CADASTRAL":
                        this.receitaDados.SituacaoMotivo = proximo;
                        break;
                    case "SITUAÇÃO ESPECIAL":
                        this.receitaDados.SituacaoEspecial = proximo;
                        break;
                    case "DATA DA SITUAÇÃO ESPECIAL":
                        this.receitaDados.SituacaoEspecialData = proximo;
                        break;
                    default:
                }

                
            }

            this.receitaDados.Matriz = (this.receitaDados.numeroInscricao.toUpperCase().indexOf("MATRIZ") > -1) ? true : false;
            this.receitaDados.CNPJ = this.receitaDados.numeroInscricao.split("MATRIZ")[0].replace(/\W/g, "");

            if (!this.receitaDados.Matriz) {
                this.receitaDados.CNPJ = this.receitaDados.numeroInscricao.split("FILIAL")[0].replace(/\W/g, "");
            }

            this.receitaDados.AtividadeEconomicaPrincipalCodigo = this.receitaDados.codAtividadePrincipal.codigo;
            this.receitaDados.AtividadeEconomicaPrincipalDescricao = this.receitaDados.codAtividadePrincipal.descricao;

            this.receitaDados.NaturezaJuridicaCodigo = this.receitaDados.codNaturezaJuridica.codigo;
            this.receitaDados.NaturezaJuridicaDescricao = this.receitaDados.codNaturezaJuridica.descricao;
        },
        itemTableEach: function (index, elemt) {
            var valor = $.trim(elemt.textContent);
            this.codigoTotal.push(valor);
        },
        resultado: function (dadosReceita) {
            
            dadosReceita = dadosReceita.replace(/js\/print.js/, 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/js/print.js');
            dadosReceita = dadosReceita.replace(/images\/brasao2.gif/, 'http://www.receita.fazenda.gov.br/pessoajuridica/cnpj/cnpjreva/images/brasao2.gif');

            this.resultadoView.append(dadosReceita);
            var table = this.resultadoView.find("input[name=opcao]").parentsUntil("table").parent();
            table.next().remove();
            table.remove();
            this.resultadoView.find(".Rodape").remove();
            this.$el.find("table").removeAttr("style");
            this.$el.find("font").removeAttr("face").removeAttr("style").removeAttr("size");
            this.resultadoView.find("table:first").find("tr:first").remove();

            this.codigoTotal = [];
            this.labelArray = [];
            this.itemTable = this.resultadoView.find("table").find("td tr font");

            this.popularLabelArray();

            this.itemTable.each($.proxy(this.itemTableEach, this));

            this.procurar(this.codigoTotal);

            //this.traceValores();

            this.formulario.find("input#txtTexto_captcha_serpro_gov_br").val("");
        },
        event: {
            "click .consulta-cnpj-btn-enviar": "onConsultaCnpjBtnEnviarClick",
            "click .btn-atualizar-captcha": "onCaptchaAtualizarClick"
        },
        onCaptchaEnter: function (evt) {
            if (evt.which === 13) {
                this.onConsultaCnpjBtnEnviarClick(evt);
                return false;
            }
        },
        onCaptchaAtualizarClick: function (evt) {
            evt.preventDefault();
            this.getCaptcha();
        },
        onConsultaCnpjBtnEnviarClick: function (evt) {
            evt.preventDefault();
            var form = this.$el.find(".formReceita"),
                valid;
            form.validate();

            valid = form.valid();
            if (!valid) {
                return false;
            }
            evt.preventDefault();

            this.consultar();
        },
    });
    return ConsultaCNPJBBControl;
});