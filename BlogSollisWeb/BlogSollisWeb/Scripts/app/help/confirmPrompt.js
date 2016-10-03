define(['plugins/bootbox'], function () {
    var ConfirmPrompt = Backbone.View.extend({
        el: '.confirm-prompt',
        initialize: function () {
        },
        render: function () {
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'click .btnConfirm': 'onBtnConfirmClick',
            'click .btnPrompt': 'onBtnPromptClick'
        },
        onBtnConfirmClick: function (evt) {            
            var options = {};
            options.message = "Teste";
            options.cancel = $.proxy(this.cancelCallBack, this);
            options.confirm = $.proxy(this.confirmCallBack, this);
            app.utilidades.confirm(options);
        },
        cancelCallBack: function () {
            app.utilidades.exibirInfo('cancelCallBack');
        },
        confirmCallBack: function () {
            app.utilidades.exibirInfo('confirmCallBack');
        },
        onBtnPromptClick: function (evt) {            
            var options = {};
            options.title = 'Prompt Teste';
            options.callback = $.proxy(this.onPromptReturn, this);
            app.utilidades.prompt(options);
        },
        onPromptReturn: function (result) {
            app.utilidades.exibirInfo(result);
        }
    });

    return ConfirmPrompt;
});