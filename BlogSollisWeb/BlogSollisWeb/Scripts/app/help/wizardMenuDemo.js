define(['controls/wizardMenuControl'], function (WizardMenuControl) {
    var WizardMenuDemo = Backbone.View.extend({
        el: '.wizard-menu-demo',
        initialize: function () {
            this.render();
        },
        render: function () {
            this.wizardMenuControl = new WizardMenuControl();
            this.wizardMenuControl.change($.proxy(this.onWizardChange, this));
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .btnEnable': 'onBtnEnableClick',
            'click .btnDisable': 'onBtnDisableClick',
            'click .btnSelectSecond': 'onBtnSelectSecondClick',
            'click .btnClear': 'onBtnClearClick',
            'click .btnDisableNext': 'onBtnDisableNextClick'
        },
        onBtnDisableNextClick: function (evt) {
            this.wizardMenuControl.disableNext();
        },
        onBtnClearClick: function (evt) {
            this.wizardMenuControl.clear();
        },
        onBtnSelectSecondClick: function (evt) {
            this.wizardMenuControl.selectIndex(1);
        },
        onBtnEnableClick: function (evt) {
            this.wizardMenuControl.enable();
        },
        onBtnDisableClick: function (evt) {
            this.wizardMenuControl.disable();
        },
        onWizardChange: function (data) {
            var message = 'Selecionou Item {0}'.format(data.index + 1);
            app.utilidades.notificacao().exibirInfoInterno({ title: 'Change', message: message });
        }
    });

    return WizardMenuDemo;
});