define([], function () {
    var RadioButtonDemo = Backbone.View.extend({
        el: '.radiobutton-demo',
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }
            this.render();
        },
        render: function () {
            this.radioButtonList = this.$el.find('.radio-button-list');
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'change input': 'onRadioChange',
            'click .btnSelecionarRb': 'onBtnSelecionarRb',
            'click .btnObterSelecionadoRb': 'onBtnObterSelecionadoRb',
            'click .btnDesmarcarTodosRb': 'onBtnDesmarcarTodosRb'
        },
        onRadioChange: function (evt) {
            var elmt = $(evt.currentTarget),
                id = elmt.attr('id'),
                value = elmt.val(),
                checked = elmt.is(':checked'),
                message = 'Id: {0}\nValor: {1}\nChecked: {2}'.format(id, value, checked);

            app.utilidades.exibirInfo(message);
        },
        onBtnSelecionarRb: function (evt) {
            this.radioButtonList.listSelectValue('2');
            app.utilidades.exibirInfo('Selecionou item 2');
        },
        onBtnObterSelecionadoRb: function (evt) {
            var value = this.radioButtonList.getSelectedValues()[0],
                message = 'Valor: {0}'.format(value);

            if (value) {
                app.utilidades.exibirInfo(message);
            }
        },
        onBtnDesmarcarTodosRb: function (evt) {
            this.radioButtonList.unselectAll();
        }
    });

    return RadioButtonDemo;
});