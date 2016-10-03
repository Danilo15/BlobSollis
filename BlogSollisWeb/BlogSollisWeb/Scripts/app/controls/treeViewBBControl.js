define(['Scripts/plugins/jquery-ui-1.11.4'], function () {
    var TreeViewControl = function () {
        var tree,
            nodeSelected = {},
            onNodeClickCallBack,
            onActivateNodeCallBack,
            onSearchCompleteCallBack,
            onLoadCompleteCallBack,
            onDragNodeDropCallBack,
            enabled = true,
            treeViewControlOptions;

        //#region dispose Privado
        function dispose() {
            tree.dynatree("destroy");
            tree.empty();

            tree = undefined;
            nodeSelected = undefined;
            onNodeClickCallBack = undefined;
            onActivateNodeCallBack = undefined;
            onSearchCompleteCallBack = undefined;
            onDragNodeDropCallBack = undefined;
            onLoadCompleteCallBack = undefined;
        }
        //#endregion

        //#region adicionarDependencias
        function adicionarDependencias() {
            var head = $("head"),
                css = "<link id='dynatreecss' href='/Content/build/ui.dynatree.css' rel='stylesheet' type='text/css'/>",
                js = "<script id='dynatreecssjs' src='/Scripts/build/jquery.dynatree.js' type='text/javascript'></script>";

            if (!head.find("script[id='dynatreecssjs']").length) {
                head.prepend(js);
            }
            if (!head.find("link[id='dynatreecss']").length) {
                head.prepend(css);
            }
        }
        //#endregion

        //#region clearStyles
        function clearStyles() {
            tree.dynatree("getTree").visit(function (node) {
                $(node.li).find("span > a").removeClass("dynatree-search-matched");
            });
        }
        //#endregion

        //#region clearFilter
        function clearFilter() {
            tree.dynatree("getTree").visit(function (node) {
                $(node.li).removeClass("hidden");
                //clearStyles();
                //node.expand(false);
            });
        }
        //#endregion

        //#region filter
        function filter(key) {
            var filterP,
                parentTitle,
                firstMatch,
                nodes = [];

            //clearFilter();

            // Default to 'match title substring (not case sensitive)'
            if (typeof key === "string") {
                filterP = function (node) {
                    return (node.data.title.toLowerCase().indexOf(key.toLowerCase()) > -1);
                };
            }

            tree.dynatree("getTree").visit(function (node) {
                if (filterP(node)) {
                    node.expand(true);
                    //$(node.li).show();
                    $(node.li).removeClass("hidden");

                    node.visitParents(function (p) {
                        p.expand(true);
                        //$(p.li).show();
                        $(p.li).removeClass("hidden");
                    });

                    parentTitle = node.data.title;
                    $(node.li).find("span > a").addClass("dynatree-search-matched");
                    nodes.push(node);

                    if (!firstMatch) {
                        firstMatch = node;
                    }
                } else {
                    if (parentTitle === node.getParent().data.title) {
                        //$(node.li).show();
                        $(node.li).removeClass("hidden");
                        $(node.li).find("span > a").removeClass("dynatree-search-matched");
                    } else {
                        //$(node.li).hide();
                        $(node.li).addClass("hidden");
                    }
                }
            });

            onSearchCompleteCallBack(nodes);
        }
        //#endregion

        //#region addNoDataChildren
        function addNoDataChildren() {
            var childNode = tree.dynatree("getRoot").addChild({
                title: "Nenhum registro encontrado!",
                tooltip: "Nenhum registro encontrado!",
                focus: false
            });

            return childNode;
        }
        //#endregion

        //#region iniciar Privado
        function iniciar(opts) {
            adicionarDependencias();

            tree = $(opts.seletor);
            tree.dynatree({
                autoFocus: false,
                debugLevel: 0,
                onPostInit: function () {
                    this.visit(function (node) {
                        node.expand(false);
                    });

                    var root = tree.dynatree("getRoot");
                    if (root.childList && !root.childList[1]) {
                        addNoDataChildren();
                    }

                    if (onLoadCompleteCallBack) {
                        onLoadCompleteCallBack();
                    }
                },
                onActivate: function (node) {
                    if (onActivateNodeCallBack) {
                        onActivateNodeCallBack(node);
                    }
                },
                onClick: function (node, event) {
                    if (!enabled) {
                        return false;
                    }

                    clearStyles();

                    var isARef = $(event.target).is("a"),
                        expanded = node.isExpanded();

                    if (isARef) {
                        if (!expanded) {
                            node.expand(true);
                        }
                    } else {
                        tree.dynatree("getTree").visit(function (node) {
                            node.deactivate();
                        });

                        node.expand(node.isExpanded());
                    }

                    nodeSelected = node;

                    if (onNodeClickCallBack) {
                        onNodeClickCallBack(nodeSelected);
                    }
                },
                onFocus: function (node) {
                    nodeSelected = node;
                    node.activate();
                    node.focus();
                },
                dnd: {
                    onDragStart: function () {
                        return treeViewControlOptions.draggable;
                    },
                    autoExpandMS: 500,
                    preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                    onDragEnter: function () {
                        return treeViewControlOptions.draggable;
                    },
                    onDragOver: function (node, sourceNode, hitMode) {
                        if (node.isDescendantOf(sourceNode)) {
                            return false;
                        }
                        if (!node.data.isFolder && hitMode === "over") {
                            return "after";
                        }
                    },
                    onDrop: function (node, sourceNode, hitMode) {
                        if (treeViewControlOptions.draggable && onDragNodeDropCallBack) {
                            onDragNodeDropCallBack(node, sourceNode, hitMode);
                        }
                    }
                },
                initAjax: {
                    url: opts.urlData
                }
            });
        }
        //#endregion

        //#region onActivateNode
        this.onActivateNode = function (callBack) {
            if (callBack) {
                onActivateNodeCallBack = callBack;
            }
        };
        //#endregion

        //#region onDragNodeDropCallBack
        this.onDragNodeDrop = function (callBack) {
            if (callBack) {
                onDragNodeDropCallBack = callBack;
            }
        };
        //#endregion

        //#region clearFilter Publico
        this.clearFilter = function () {
            clearFilter();
        };
        //#endregion

        //#region filter Publico
        this.filter = function (key, searchComplete) {
            if (key.split(" ").join("").length > 0) {
                if (searchComplete) {
                    onSearchCompleteCallBack = searchComplete;
                }
                filter(key);
            }
        };
        //#endregion

        //#region Dispose Publico
        this.dispose = function () {
            dispose();
        };
        //#endregion

        //#region destroy Publico
        this.destroy = function () {
            dispose();
        };
        //#endregion

        //#region iniciar Publico
        this.iniciar = function (opts) {
            treeViewControlOptions = opts;
            iniciar(treeViewControlOptions);
        };
        //#endregion

        //#region reload Publico
        this.reload = function () {
            iniciar(treeViewControlOptions);
        };
        //#endregion

        //#region onNodeClick Publico
        this.onNodeClick = function (callBack) {
            if (callBack) {
                onNodeClickCallBack = callBack;
            }
        };
        //#endregion

        //#region setDimensions Publico ex:{width:500,height:200}
        this.setDimensions = function (opts) {
            tree.css(opts);
        };
        //#endregion

        //#region clearDimensions Publico
        this.clearDimensions = function () {
            tree.css({ width: '100%', height: '100%' });
        };
        //#endregion

        //#region LoadComplete Publico
        this.onLoadComplete = function (callback) {
            if (callback) {
                onLoadCompleteCallBack = callback;
            }
        };
        //#endregion

        //#region expandRoot Publico
        this.expandRoot = function () {
            var children = this.hasChildren();
            if (children) {
                this.getRoot().getChildren()[1].expand(true);
            }
        };
        //#endregion

        //#region expandRoot Publico
        this.expandAll = function () {
            tree.dynatree("getTree").visit(function (node) {
                node.expand(true);
            });
        };
        //#endregion        

        //#region expandRoot Publico
        this.closeAll = function () {
            tree.dynatree("getTree").visit(function (node) {
                node.expand(false);
            });
        };
        //#endregion    

        //#region activate Publico
        this.activate = function (key) {
            tree.dynatree("getTree").activateKey(key);
            nodeSelected = tree.dynatree("getTree").getNodeByKey(key);
            if (nodeSelected) {
                nodeSelected.expand(true);
                nodeSelected.focus();
            }
        };
        //#endregion

        //#region activateNodeById  Publico
        this.activateNodeById = function (id) {
            var localTree = tree.dynatree("getTree");
            localTree.visit(function (node) {
                if (node.data.id === id) {
                    nodeSelected = node;
                    nodeSelected.activate();
                    nodeSelected.focus();
                    if (nodeSelected) {
                        nodeSelected.expand(true);
                    }
                    return;
                }
            });
        };
        //#endregion

        //#region disablePrivado
        function disablePrivado() {
            enabled = false;
            tree.addClass("dynatree-disabled");
            tree.dynatree("disable");
        }
        //#endregion

        //#region enablePrivado
        function enablePrivado() {
            enabled = true;
            tree.removeClass("dynatree-disabled");
            tree.dynatree("enable");
        }
        //#endregion

        this.enable = function () {
            enablePrivado();
        };
        
        this.disable = function () {
            disablePrivado();
        };

        //#region activateFirst Publico
        this.activateFirst = function () {
            var children = this.hasChildren();
            if (children) {
                nodeSelected = this.getRoot().getChildren()[1];
                tree.dynatree("getTree").activateKey(nodeSelected.data.key);
                if (nodeSelected) {
                    nodeSelected.expand(true);
                }
            }
        };
        //#endregion

        //#region hasChildren Publico
        this.hasChildren = function () {
            var children = this.getRoot().getChildren();

            return children;
        };
        //#endregion

        //#region getSelectedNode Publico
        this.getSelectedNode = function () {
            var node = nodeSelected || {};

            return node;
        };
        //#endregion

        //#region getRoot Publico
        this.getRoot = function () {
            var root = tree.dynatree("getRoot");
            return root;
        };
        //#endregion

        //#region getFirstNode Publico
        this.getFirstNode = function () {
            var root = tree.dynatree("getRoot");
            nodeSelected = root.getChildren()[0];
            return nodeSelected;
        };
        //#endregion
    };

    return TreeViewControl;
});