define(['Scripts/app/controls/autoCompleteBBControl'], function (AutoCompleteBBControl) {
    var AutoCompleteDemo = Backbone.View.extend({
        el: '.auto-complete-demo',
        initialize: function () {
            this.render();
        },
        render: function () {
            var scope = this;

            //inicializar
            this.autoCompleteControl = new AutoCompleteBBControl({
                el: '.ddlAutoComplete',
                defaultText: 'Busque um filme!',
                dataType: 'json',
                urlData: 'Help/AutoCompleteDemo',
                query: function (term, page) {
                    return {
                        q: term  //parametros enviados
                    };
                },
                results: function (data, page) {
                    return { results: data.Dados };
                }
            });
            this.autoCompleteControl.onFormat($.proxy(this.onAutoCompleteFormat, this));
            this.autoCompleteControl.onSelect($.proxy(this.onAutoCompleteSelect, this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
            'change .ddlAutoComplete': 'onAutoCompleteChange',
            'click .btnAutoCompleteEnable': 'onBtnAutoCompleteEnableClick',
            'click .btnAutoCompleteDisable': 'onBtnAutoCompleteDisableClick',
            'click .btnAutoCompleteOpen': 'onBtnAutoCompleteOpenClick'
        },
        onAutoCompleteChange: function (evt) {
            var label = $('.select2-choice').find('span').text();
        },
        onBtnAutoCompleteEnableClick: function (evt) {
            this.autoCompleteControl.enable();
        },
        onBtnAutoCompleteDisableClick: function (evt) {
            this.autoCompleteControl.disable();
        },
        onBtnAutoCompleteOpenClick: function (evt) {
            this.autoCompleteControl.open();
        },
        onAutoCompleteFormat: function (data) {
            var markup = '<labe>{0}</label>'.format(data.Title);
            return markup;
        },
        onAutoCompleteSelect: function (data) {
            var message = 'Item: {0}\nValor: {1}'.format(data.Title, data.Id);
            app.utilidades.notificacao().exibirInfo({ title: 'Retorno', message: message });
            return data.title;
        }
    });

    return AutoCompleteDemo;
});