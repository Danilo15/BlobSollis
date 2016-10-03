define(['controls/cepControl'], function (CepControl) {
    var ConsultaCepDemo = Backbone.View.extend({
        el: '.consulta-cep-demo',
        initialize: function () {
            this.cepControl = new CepControl();
            this.render();
        },
        render: function () {            
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {

        }
    });

    return ConsultaCepDemo;
});