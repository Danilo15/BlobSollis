define(['Scripts/plugins/bootstrap-datepicker', 'Scripts/plugins/locales/bootstrap-datepicker.pt-BR'], function () {
    var DatePickerBBControl = Backbone.View.extend({
        el: ".datepicker",
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }

            var head = $("head"),
                css = "<link id='datepickerbootstrapcss' href='/Content/build/datepicker.css' rel='stylesheet' type='text/css'/>";
            if (!head.find("link[id='datepickerbootstrapcss']").length) {
                head.prepend(css);
            }

            this.render();
        },
        render: function () {
            var nowTemp = new Date(),
                endDate = "{1}/{0}/{2}".format(nowTemp.getMonth() + 1, nowTemp.getDate(), nowTemp.getFullYear()),
                format = "dd/mm/yyyy";
            if (window.lang === "en-US") {
                format = "m/dd/yyyy";
            }

            if (this.options.disableFuture) {
                this.$el.datepicker({
                    autoclose: true,
                    language: window.lang,
                    startDate: "",
                    endDate: endDate,
                    format: format
                }).on('changeDate', $.proxy(this.onChange, this));
            } else if (this.options.futureOnly) {
                this.$el.datepicker({
                    autoclose: true,
                    language: window.lang,
                    startDate: endDate,
                    endDate: "",
                    format: format
                }).on('changeDate', $.proxy(this.onChange, this));
            } else {
                this.$el.datepicker({
                    autoclose: true,
                    language: window.lang,
                    format: format
                }).on('changeDate', $.proxy(this.onChange, this));
            }

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        onChange: function (e) {
            var dataFormatada,
                y = e.date.getFullYear(),
                mLocal = e.date.getMonth() + 1,
                m = (mLocal > 9 ? mLocal : '0' + mLocal),
                dLocal = e.date.getDate(),
                d = (dLocal > 9 ? dLocal : '0' + dLocal);

            dataFormatada = d + '/' + m + '/' + y;
            if (window.lang === "en-US") {
                dataFormatada = e.date.getMonth() + 1 + '/' + d + '/' + y;
            }
            this.trigger(app.utilidades.EnumEventos.onChange, { data: dataFormatada });
        }
    });

    return DatePickerBBControl;
});