define(['Scripts/app/controls/treeViewBBControl'], function (TreeViewBBControl) {
    var TreeViewDemo = Backbone.View.extend({
        el: '.tree-view-demo',
        initialize: function () {
            this.nodeSelected = null;
            this.render();
        },
        render: function () {
            //inicializar
            this.treeViewControl = new TreeViewBBControl();
            this.treeViewControl.iniciar({ seletor: '.tree-view', urlData: '/help/LoadJson' });
            this.treeViewControl.onActivateNode($.proxy(this.onTreeViewActivateNode, this));
            this.treeViewControl.onLoadComplete($.proxy(this.onTreeViewLoadComplete, this));

            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
        },
        onTreeViewActivateNode: function (node) {
            this.nodeSelected = node.data;            
            app.utilidades.exibirInfo({ title: 'Node Selected', message: ' node title:{0}'.format(this.nodeSelected.title) });
        },
        onTreeViewLoadComplete: function (evt) {
            if (this.nodeSelected) {
                //this.treeViewControl.activate(this.nodeSelected.data.key);
            } else {
                //this.treeViewControl.activateFirst();
            }
        }
    });

    return TreeViewDemo;
});