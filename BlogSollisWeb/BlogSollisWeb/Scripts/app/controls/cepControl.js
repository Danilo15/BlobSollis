define(["Scripts/build/jquery.cep-1.0"], function () {
    var ConsultaCep = Backbone.View.extend({
        el: ".cep-control",
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }

            this.campos = {};
            this.render();
        },
        iniciar: function () {
            this.render();
        },
        render: function () {                
            this.campos.cep = this.$el.find(".cep");
            this.campos.endereco = this.$el.find(".endereco");
            this.campos.cidade = this.$el.find(".cidade");
            this.campos.bairro = this.$el.find(".bairro");
            this.campos.estado = this.$el.find(".estado");
            this.campos.cep.success = $.proxy(this.cepSuccess, this);
            this.campos.cep.error = $.proxy(this.cepError, this);

            return this;
        },
        cepError: function (err) {
            this.trigger('cepError',err);
        },
        cepSuccess: function () {
            this.trigger('cepSucesso');
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            "click .btn-cep-consultar": "onBtnCepConsultarClick",
        },
        onBtnCepConsultarClick: function () {
            this.campos.cep.cepConsultar(this.campos, $.proxy(this.cepSuccess, this), $.proxy(this.cepError, this));
        }
    });

    return ConsultaCep;
});