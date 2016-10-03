define([], function () {
    var TreeViewHtmlDemo = Backbone.View.extend({
        el: '.tree-view-html-demo',
        initialize: function () {
            this.nodeSelected = null;
            this.render();
        },
        render: function () {
            var scope = this;

            $('.tree-view-html').dynatree({
                onPostInit: function (evt) {
                    this.visit(function (node) {
                        node.expand(false);
                    });
                },
                onActivate: function (node) {
                },
                onClick: function (node, event) {
                    scope.nodeSelected = node;
                },
                dnd: {
                    onDragStart: function (node) {
                        return true;
                    },
                    autoExpandMS: 500,
                    preventVoidMoves: true,
                    onDragEnter: function (node, sourceNode) {
                        return true;
                    },
                    onDragOver: function (node, sourceNode, hitMode) {
                        if (node.isDescendantOf(sourceNode)) {
                            return false;
                        }
                    },
                    onDrop: function (node, sourceNode, hitMode, ui, draggable) {
                    }
                }
            });
            return this;
        },
        dispose: function () {
            this.undelegateEvents();
            $(this.el).removeData().unbind();
        },
        events: {
        }
    });

    return TreeViewHtmlDemo;
});