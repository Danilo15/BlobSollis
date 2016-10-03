define([], function () {
    var CheckboxListDemo = Backbone.View.extend({
        el: '.checkbox-list-demo-vertical',
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }
            this.render();
        },
        render: function () {
            this.checkBoxList = this.$el.find(".checkbox-list-demo");
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .checkbox-list-vertical-item': 'onCheckChange',
            'click .checkbox-list-horizontal-item': 'onCheckChange',
            'click .btnSelecionarCb': 'onBtnSelecionarCb',
            'click .btnObterSelecionadoCb': 'onBtnObterSelecionadosCb',
            'click .btnDesmarcarTodosCb': 'onBtnDesmarcarTodosCb'
        },
        onCheckChange: function (evt) {
            var elmt = $(evt.currentTarget),
                id = elmt.attr('id'),
                value = elmt.val(),
                checked = elmt.is(':checked'),
                message = 'Id: {0}\nValor: {1}\nChecked: {2}'.format(id, value, checked);

            app.utilidades.exibirInfo(message);
        },
        onBtnSelecionarCb: function (evt) {
            this.checkBoxList.listSelectValue('2');
        },
        onBtnObterSelecionadosCb: function (evt) {
            var values = this.checkBoxList.getSelectedValues(),
                total = values.length,
                i = 0,
                output = '';

            for (i; i < total; i += 1) {
                output += 'Valor: {0}\n'.format(values[i]);
            }

            if (total) {
                app.utilidades.notificacao().exibirInfo(output);
            }
        },
        onBtnDesmarcarTodosCb: function (evt) {
            this.checkBoxList.unselectAll();
        }
    });

    return CheckboxListDemo;
});