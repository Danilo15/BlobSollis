define([], function () {
    var EditorTexto = Backbone.View.extend({
        el: ".propostaeditortexto",
        initialize: function (opts) {
            if (opts) {
                this.options = opts;
            }
            if (!window.CKEDITOR) {
                throw Error("Necessário carregar o script do CKEditor.");
            }
            this.CKEDITOR_BASEPATH = this.options.basePath || '/ckeditor/'; //FIX NO PATH DO CKEDITOR
            this.CKEDITOR_SETTINGS = this.options.settings;
            this.CKEDITOR_CONFIG = this.options.config;
            this.registroAlterado = $('.editor-registro-alterado');

            this.render();
        },
        render: function () {
            this.ckeditorHelper = $('#' + this.options.id).ckeditorHelper(this.options.id, this.CKEDITOR_BASEPATH, this.CKEDITOR_SETTINGS, this.CKEDITOR_CONFIG);

            $.wait(300, function () {
                this.textoInicialEditor = this.ckeditorHelper.getFormatedText();
            }.bind(this));

            CKEDITOR.instances[this.options.id].on('change', function () {
                var textoAtual = this.ckeditorHelper.getFormatedText();

                if (this.textoInicialEditor != textoAtual) {
                    this.setRegistroAlterado(1);
                } else {
                    this.setRegistroAlterado(0);
                }

            }.bind(this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        change: function (callback) {
            CKEDITOR.instances[this.options.id].on('change', callback);
        },
        setRegistroAlterado: function (value) {
            this.registroAlterado.val(value);
            this.registroAlterado.change();
        },
        events: {

        },
    });

    return EditorTexto;
});