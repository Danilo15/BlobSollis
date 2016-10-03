define(['controls/fileUploadControl'], function (FileUploadControl) {
    var FileUploadDemo = Backbone.View.extend({
        el: '.file-upload-demo-auto',
        initialize: function () {
            this.render();
        },
        render: function () {
            this.fileUploadControl = new FileUploadControl({ autoSave: true, url: '/help/upload', el: this.$el.find('.upload-ph').selector });
            this.fileUploadControl.complete($.proxy(this.onComplete, this));
            this.fileUploadControl.fail($.proxy(this.onFail, this));
            this.fileUploadControl.progress($.proxy(this.onProgress, this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
        },
        onComplete: function (message) {
            app.utilidades.exibirSucesso(message);
        },
        onFail: function (message) {
            app.utilidades.exibirError(message);
        },
        onProgress: function (percent) {
            app.utilidades.exibirInfo(percent);
        }
    });

    return FileUploadDemo;
});