define(['Scripts/plugins/fileupload/fileinput', 'plugins/fileupload/fileinput_locale_pt_BR'], function () {
    var FileUploadControl = Backbone.View.extend({
        el: '.upload-ph',
        initialize: function (options) {
            this.options = options || {};
            if (this.options.el) {
                this.el = this.options.el;
                this.$el = $(this.el);
            }
            this.render();
        },
        events: {
        },
        render: function () {
            var scope = this,
                inputUpload = this.$el.find('#ak-fileupload');

            this.url = this.options.url;

            this.inputUpload = inputUpload.fileinput({
                uploadUrl: scope.options.url,
                uploadAsync: true,
                showUpload: scope.options.showUpload,
                browseLabel: scope.options.browseLabel,
                removeLabel: scope.options.removeLabel,
                maxFileCount: this.options.maxFileCount || 1
            });

            inputUpload.on('filebatchuploaderror', function (event, data) {
                var message = '';
                if (data.jqXHR.status === 500) {
                    message = $($.parseHTML(data.jqXHR.responseText))[1].innerText;
                }

                if (scope.failCallback) {
                    scope.failCallback(message);
                }
            });
            inputUpload.on('fileloaded', function (event, data) {                

                if (scope.selectedCallback) {
                    scope.selectedCallback(data.name);
                }
                if (scope.options.autoSave) {
                    inputUpload.fileinput('upload');
                }
            });

            inputUpload.on('filebatchuploadsuccess', function (event, data) {
                var result = JSON.parse(data.jqXHR.responseText);
                if (!result.ESucesso) {
                    if (scope.failCallback) {
                        scope.failCallback(data.jqXHR);
                    }
                    return;
                }

                if (scope.completeCallback) {
                    scope.completeCallback(result);
                }
            });

            return this;
        },
        hasFile: function () {
            var hasFile = false;
            hasFile = this.$el.find('.fileupload-preview').text().length;
            return hasFile;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
            this.changeCallback = null;
        },
        send: function (obj) {
            this.inputUpload.fileinput.defaults.uploadExtraData = obj;
            this.inputUpload.fileinput('upload');
        },
        change: function (Callback) {
            this.changeCallback = Callback;
        },
        reset: function () {
            this.inputUpload.fileinput('reset');
        },
        complete: function (Callback) {
            this.completeCallback = Callback;
        },
        selected: function (Callback) {
            this.selectedCallback = Callback;
        },
        fail: function (Callback) {
            this.failCallback = Callback;
        },
        progress: function (Callback) {
            this.progressCallback = Callback;
        }
    });

    return FileUploadControl;
});