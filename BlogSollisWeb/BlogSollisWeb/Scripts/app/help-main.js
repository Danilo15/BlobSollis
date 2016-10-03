require(['Scripts/app'
         , 'Scripts/plugins/jquery.validate'
         , 'Scripts/app/help/abrirModalSimples'
         , 'Scripts/app/help/checkboxListDemo'
         , 'Scripts/app/help/confirmPrompt'
         , 'Scripts/app/help/consultaCepDemo'
         , 'Scripts/app/help/exibirMensagens'
         , 'Scripts/app/help/formDemo'
         , 'Scripts/app/help/gridDemo'
         , 'Scripts/app/help/gridMultiplosDemo'
         , 'Scripts/app/help/radioButtonDemo'
         , 'Scripts/app/help/tabDemo'
         , 'Scripts/app/help/fileUploadDemo'
         , 'Scripts/app/help/fileUploadManualDemo'
         , 'Scripts/app/help/treeViewDemo'
         , 'Scripts/app/help/treeViewHtmlDemo'
         , 'Scripts/app/help/triggerEvents'
         , 'Scripts/app/help/wizardMenuDemo'
], function (app
            , validate
            , AbrirModalSimples
            , CheckboxListDemo
            , ConfirmPrompt
            , ConsultaCepDemo
            , ExibirMensagens
            , FormularioDemo
            , GridDemo
            , GridMultiplosDemo
            , RadioButtonDemo
            , TabDemo
            , FileUploadDemo
            , FileUploadManualDemo
            , TreeViewDemo
            , TreeViewHtmlDemo
            , TriggerEvents
            , WizardMenuDemo
            ) {
    _.extend(app.dispatcher, Backbone.Events);

    $(".demo .div:odd").css("background-color", "#ececeb");
    $(".demo .div:even").css("background-color", "#fefbe5");
    $(".demo").removeClass("hidden");
    $(".botao-codigo").click(function (evt) {
        var div = $(this).next('.sintax');
        if (div.css("display") === "block") {
            div.css("display", "none");
            $(this).val("Ver Código");
        } else {
            div.css("display", "block");
            $(this).val("Esconder Código");
        }
    });

    var event = $.Event(app.utilidades.EnumEventos.onAppLoaded)
                , abrirModalSimples = new AbrirModalSimples()
                , checkboxListDemoVertical = new CheckboxListDemo(), checkboxListDemoHorizontal = new CheckboxListDemo({ el: ".checkbox-list-demo-horizontal" })
                , confirmPrompt = new ConfirmPrompt()
                , consultaCepDemo = new ConsultaCepDemo()
                , exibirMensagens = new ExibirMensagens()
                , tabDemo = new TabDemo()
                , gridDemo = new GridDemo()
                , gridMultiplosDemo = new GridMultiplosDemo()
                , triggerEvents = new TriggerEvents()
                , radioButtonVertical = new RadioButtonDemo(), radioButtonHorizontal = new RadioButtonDemo({ el: ".radiobutton-demo-horizontal" })
                , treeViewDemo = new TreeViewDemo()
                , treeViewHtml = new TreeViewHtmlDemo()
                , fileUploadDemo = new FileUploadDemo()
                , fileUploadManualDemo = new FileUploadManualDemo()
                , wizardMenuDemo = new WizardMenuDemo()
                , formularioDemo = new FormularioDemo();

    $(window).trigger(event);

});