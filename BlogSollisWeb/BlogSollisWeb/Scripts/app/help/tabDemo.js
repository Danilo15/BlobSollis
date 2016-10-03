define(['controls/tabControl'], function (TabControl) {
    var TabDemo = Backbone.View.extend({
        el: '.tab-demo',
        initialize: function () {
            this.render();
        },
        render: function () {
            this.tabControl = new TabControl({ el: '.tab-simple', trackHashChange: false });
            this.tabControl.onTabChange($.proxy(this.onTabChange, this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .btnDisableTab': 'onBtnDisableTab',
            'click .btnEnableTab': 'onBtnEnableTab',
            'click .btnSelecionarUltimoTab': 'onBtnSelecionarUltimoTabClick',
            'click .btnEsconderSegundoTab': 'onBtnEsconderSegundoTabClick',
            'click .btnExibirSegundoTab': 'onBtnExibirSegundoTabClick'
        },
        onBtnExibirSegundoTabClick: function (evt) {
            this.tabControl.showByIndex(1);
        },
        onBtnEsconderSegundoTabClick: function (evt) {
            this.tabControl.hideByIndex(1);
        },
        onBtnSelecionarUltimoTabClick: function (evt) {
            this.tabControl.selectByIndex(3);
        },
        onBtnEnableTab: function (evt) {
            this.tabControl.enable();
        },
        onTabChange: function (data) {
            //app.utilidades.exibirInfo({ title: 'Tab Change', message: data.retorno });
            app.utilidades.notificacao().exibirInfoInterno({ title: 'Tab Change', message: data.retorno });
        },
        onBtnDisableTab: function (evt) {
            this.tabControl.disable();
        }
    });

    return TabDemo;
});