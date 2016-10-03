define(['Scripts/build/typeahead.jquery'], function () {
    var AutoCompleteBBControl = Backbone.View.extend({
        el: ".autocomplete",
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }
            var head = $("head"),
                css = app.utilidades.linkCSS('autocompletebootstrap', '/Content/build/autocomplete.css');

            if (!head.find("link[id='autocompletebootstrap']").length) {
                head.prepend(css);
            }
            this.render();
        },        
        render: function () {
            var scope = this,
                map = {};

            this.setValue = this.options.campoHidden || this.$el;
            this.url = this.options.url || this.$el.attr('data-url');

            this.defaultMessage = $('.nenhum-registro-encontrado').text();
            this.defaultTemplate = '<p style="font-weight:100;font-size:12px;">{0}</p>';

            this.template = this.options.template || this.defaultTemplate;
            this.emptyMessage = this.options.emptyMessage || this.defaultMessage;

            this.destroy();

            this.$el.typeahead({
                minLength: this.options.minLength || 2, // send AJAX request only after user type in at least 3 characters
                limit: 10, // limit to show only 10 results
                name: 'name',
            }, {
                source: function (query, process) {
                    var objects = [];
                    $.ajax({
                        url: this.url,
                        async: false,
                        method: app.utilidades.EnumAjax.POST,
                        data: { query: query },
                        success: function (data) {
                            if (data.ESucesso) {
                                map = {};
                                objects = [];

                                data = data.Json.autoCompleteItens;
                                $.each(data, function (i, object) {
                                    map[object.Label] = object;
                                    objects.push(object.Label);
                                });

                            } else {
                                app.utilidades.notificacao().exibirError(data.Mensagem);
                            }
                        }
                    });
                    return process(objects);
                }.bind(this),
                templates: {
                    empty: this.template.format(this.emptyMessage),
                }
            });

            this.$el.on('keyup', function (evt) {
                var keyCode = evt.keyCode;
                if ((keyCode != 40 ||
                    keyCode != 13)&&this.options.camposHidden) {
                    $(this.setValue).val('');
                }
            }.bind(this));

            this.$el.on('typeahead:selected', function (evt, item) {
                $(this.setValue).val(map[item].Label);

                if (!this.options.noId) {
                    $(this.setValue).val(map[item].Id);
                }

                if (this.onSelectCallback) {
                    this.onSelectCallback();
                }
            }.bind(this));

            return this;
        },
        destroy: function () {
            this.$el.typeahead('destroy');
        },
        select: function (callback) {
            this.onSelectCallback = callback;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
    });

    return AutoCompleteBBControl;
});