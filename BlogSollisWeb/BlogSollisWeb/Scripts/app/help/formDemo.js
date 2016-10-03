define(['controls/datePickerBBControl'], function (DatePickerBBControl) {
    var FormularioDemo = Backbone.View.extend({
        el: '.formulario-demo',
        initialize: function () {

            this.render();
        },
        render: function () {
            this.form = this.$el.find('.formulario');
            this.form.validate();

            //DATE PICKER
            this.dateInputControl = new DatePickerBBControl();
            //this.dateInputControl.on(Utilidades.EnumEventos.onChange, $.proxy(this.onDatePickerChange, this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .btn-salvar': 'onBtnSalvarClick',
            'click .btn-cancelar': 'onBtnCancelarClick'
        },
        validar: function () {
            this.form.validate();
            return this.form.valid();
        },
        salvar: function () {
            var url = this.form.attr('action'),
                dataPost = this.form.serializeObject();

            app.utilidades.consultaAjax(url, app.utilidades.EnumAjax.POST, function (result) {
            }, function (result) {
            }, JSON.stringify(dataPost), true);
        },
        onDatePickerChange: function (e) {
            app.utilidades.notificacao().exibirInfo({ title: 'Data', message: e.data });
            this.validar();
        },
        onBtnCancelarClick: function (evt) {
            this.form.reset();
        },
        onBtnSalvarClick: function (evt) {
            var valid = this.validar();
            if (!valid) {
                return false;
            }
            evt.preventDefault();
            this.salvar();
        }
    });

    return FormularioDemo;
});