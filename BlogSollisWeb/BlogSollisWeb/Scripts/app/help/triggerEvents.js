define([], function () {
    var TriggerEvents = Backbone.View.extend({
        el: '.trigger-events',
        initialize: function () {
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
            'click .btnAddListener': 'onBtnAddListenerClick',
            'click .btnRemoveListener': 'onBtnRemoveListenerClick',
            'click .btnTrigger': 'onBtnTriggerClick'
        },
        onBtnAddListenerClick: function (evt) {
            app.dispatcher.on(app.utilidades.EnumEventos.onChange, this.onChange);
        },
        onBtnRemoveListenerClick: function (evt) {
            app.dispatcher.off(app.utilidades.EnumEventos.onChange);
        },
        onBtnTriggerClick: function (evt) {
            app.dispatcher.trigger(app.utilidades.EnumEventos.onChange, { retorno: 'Trigger change callback' });
        },
        onChange: function (evt) {
            app.utilidades.exibirInfo('Event triggered ok');
        }
    });

    return TriggerEvents;
});