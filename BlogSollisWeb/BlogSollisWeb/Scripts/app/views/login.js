define(['app'], function () {
    var Login = Backbone.View.extend({
        el: '.login',
        initialize: function () {
            this.render();
        },
        render: function () {
            var hash = window.location.hash;
            this.form = this.$el.find('form');
            this.$el.find('.hashurl').val(hash.replace(/\#/, ''));
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        enviar: function () {
        },
        events: {
            'click .btn-entrar': 'onBtnEntrarClick',
            'click .link-esqueci-senha': 'onLinkEsqueciSenhaClick'
        },
        onLinkEsqueciSenhaClick: function (evt) {
            evt.preventDefault();

            var target = $(evt.currentTarget),
                url = target.attr('href'),
                title = target.attr('data-title');

            var opts = {
                title: title,
                remote: url
            }

            app.utilidades.modal.abrir(opts);
        },
        onBtnEntrarClick: function () {
            if (!this.form.valid()) {
                return false;
            }
        }
    });

    return Login;
});