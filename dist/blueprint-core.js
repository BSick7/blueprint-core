var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        core.version = '0.1.0';
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        core.Library = Fayde.TypeManager.resolveLibrary("http://schemas.wsick.com/blueprint");
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var controls;
        (function (controls) {
            var Canvas = Fayde.Controls.Canvas;
            var Binding = Fayde.Data.Binding;
            var Container = (function (_super) {
                __extends(Container, _super);
                function Container(source) {
                    var _this = this;
                    _super.call(this);
                    this.DefaultStyleKey = Container;
                    this.$linksProxy = new controls.ItemsPropertyProxy(function (items, index) { return _this.OnLinksAdded(items, index); }, function (items, index) { return _this.OnLinksRemoved(items, index); });
                    this.$childrenProxy = new controls.ItemsPropertyProxy(function (items, index) { return _this.OnChildrenAdded(items, index); }, function (items, index) { return _this.OnChildrenRemoved(items, index); });
                    this.Source = source;
                    this.SetBinding(Container.LinksProperty, Binding.fromData({
                        Path: "Source.links",
                        Source: this
                    }));
                    this.SetBinding(Container.ChildrenProperty, Binding.fromData({
                        Path: "Source.children",
                        Source: this
                    }));
                }
                Container.prototype.OnSourceChanged = function (oldValue, newValue) {
                };
                Container.prototype.OnLinksChanged = function (oldValue, newValue) {
                    this.$linksProxy.swap(oldValue, newValue);
                };
                Container.prototype.OnChildrenChanged = function (oldValue, newValue) {
                    this.$childrenProxy.swap(oldValue, newValue);
                };
                Container.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this._canvas = this.GetTemplateChild("canvas", Canvas);
                };
                Container.prototype.OnLinksAdded = function (items, index) {
                    var _this = this;
                    items.map(function (item) { return _this.CreateLink(item); })
                        .forEach(function (link) { return _this._canvas.Children.Add(link); });
                };
                Container.prototype.OnLinksRemoved = function (items, index) {
                    var children = this._canvas.Children;
                    exjs.en(children)
                        .join(items.en(), function (uie) { return uie.Source; }, function (link) { return link; }, function (uie, link) { return uie; })
                        .forEach(function (uie) { return children.Remove(uie); });
                };
                Container.prototype.OnChildrenAdded = function (items, index) {
                    var _this = this;
                    items.map(function (item) { return _this.CreateChild(item); })
                        .forEach(function (res) { return _this._canvas.Children.Add(res); });
                };
                Container.prototype.OnChildrenRemoved = function (items, index) {
                    var children = this._canvas.Children;
                    exjs.en(children)
                        .join(items.en(), function (uie) { return uie.Source; }, function (link) { return link; }, function (uie, link) { return uie; })
                        .forEach(function (uie) { return children.Remove(uie); });
                };
                Container.prototype.CreateChild = function (res) {
                    if (!res.children)
                        return new controls.Resource(res);
                    return new Container(res);
                };
                Container.prototype.CreateLink = function (link) {
                    return new controls.Link(link);
                };
                Container.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, Container, undefined, function (cont, args) { return cont.OnSourceChanged(args.OldValue, args.NewValue); });
                Container.LinksProperty = DependencyProperty.Register("Links", function () { return nullstone.IEnumerable_; }, Container, undefined, function (cont, args) { return cont.OnSourceChanged(args.OldValue, args.NewValue); });
                Container.ChildrenProperty = DependencyProperty.Register("Children", function () { return nullstone.IEnumerable_; }, Container, undefined, function (cont, args) { return cont.OnChildrenChanged(args.OldValue, args.NewValue); });
                return Container;
            })(Fayde.Controls.Control);
            controls.Container = Container;
            core.Library.add(Container);
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var controls;
        (function (controls) {
            var CollectionChangedEventArgs = Fayde.Collections.CollectionChangedEventArgs;
            var CollectionChangedAction = Fayde.Collections.CollectionChangedAction;
            var INotifyCollectionChanged_ = Fayde.Collections.INotifyCollectionChanged_;
            var ItemsPropertyProxy = (function () {
                function ItemsPropertyProxy($onAdded, $onRemoved) {
                    this.$onAdded = $onAdded;
                    this.$onRemoved = $onRemoved;
                }
                ItemsPropertyProxy.prototype.swap = function (oldValue, newValue) {
                    if (oldValue) {
                        var onc = INotifyCollectionChanged_.as(oldValue);
                        if (onc)
                            onc.CollectionChanged.off(this.onChanged, this);
                        CollectionChangedEventArgs.Reset(exjs.en(oldValue).toArray());
                    }
                    if (newValue) {
                        CollectionChangedEventArgs.AddRange(exjs.en(newValue).toArray(), 0);
                        var nnc = INotifyCollectionChanged_.as(newValue);
                        if (nnc)
                            nnc.CollectionChanged.on(this.onChanged, this);
                    }
                };
                ItemsPropertyProxy.prototype.onChanged = function (e) {
                    switch (e.Action) {
                        case CollectionChangedAction.Add:
                            this.$onAdded(e.NewItems, e.NewStartingIndex);
                            break;
                        case CollectionChangedAction.Remove:
                            this.$onRemoved(e.OldItems, e.OldStartingIndex);
                            break;
                        case CollectionChangedAction.Replace:
                            this.$onRemoved(e.OldItems, e.NewStartingIndex);
                            this.$onAdded(e.NewItems, e.NewStartingIndex);
                            break;
                        case CollectionChangedAction.Reset:
                            this.$onRemoved(e.OldItems, 0);
                            break;
                    }
                };
                return ItemsPropertyProxy;
            })();
            controls.ItemsPropertyProxy = ItemsPropertyProxy;
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var controls;
        (function (controls) {
            var Binding = Fayde.Data.Binding;
            var Link = (function (_super) {
                __extends(Link, _super);
                function Link(link) {
                    _super.call(this);
                    this.DefaultStyleKey = Link;
                    this.Source = link;
                }
                Link.prototype.OnSourceChanged = function (oldValue, newValue) {
                    this.SetBinding(Link.PeersProperty, Binding.fromData({
                        Path: "peers",
                        Source: newValue
                    }));
                };
                Link.prototype.OnPeersChanged = function (oldValue, newValue) {
                };
                Link.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, Link, undefined, function (link, args) { return link.OnSourceChanged(args.OldValue, args.NewValue); });
                Link.PeersProperty = DependencyProperty.Register("Peers", function () { return nullstone.IEnumerable_; }, Link, undefined, function (link, args) { return link.OnPeersChanged(args.OldValue, args.NewValue); });
                return Link;
            })(Fayde.Shapes.Path);
            controls.Link = Link;
            core.Library.add(Link);
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var controls;
        (function (controls) {
            var ImageSource = Fayde.Media.Imaging.ImageSource;
            var Binding = Fayde.Data.Binding;
            var Resource = (function (_super) {
                __extends(Resource, _super);
                function Resource(source) {
                    _super.call(this);
                    this.DefaultStyleKey = Resource;
                    this.Source = source;
                }
                Resource.prototype.OnSourceChanged = function (oldValue, newValue) {
                    var meta;
                    if (newValue && newValue.metadataUid && !!(meta = core.metadata.registry.getByUid(newValue.metadataUid))) {
                        this.SetBinding(Resource.ImageSourceProperty, Binding.fromData({
                            Path: "thumbnail",
                            Source: meta
                        }));
                        return;
                    }
                    this.ClearValue(Resource.ImageSourceProperty);
                };
                Resource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, Resource, undefined, function (res, args) { return res.OnSourceChanged(args.OldValue, args.NewValue); });
                Resource.ImageSourceProperty = DependencyProperty.Register("ImageSource", function () { return ImageSource; }, Resource);
                return Resource;
            })(Fayde.Controls.Control);
            controls.Resource = Resource;
            core.Library.add(Resource);
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var metadata;
        (function (metadata) {
            metadata.registry = new Registry();
            var Registry = (function () {
                function Registry() {
                }
                Registry.prototype.add = function (type) {
                    this.types.set(type.uid, type);
                };
                Registry.prototype.get = function (bundle, group) {
                    return this.types.values()
                        .where(function (t) { return !bundle || t.bundle === bundle; })
                        .where(function (t) { return !group || t.group === group; })
                        .toList();
                };
                Registry.prototype.getByUid = function (uid) {
                    return this.types.get(uid);
                };
                return Registry;
            })();
            metadata.Registry = Registry;
        })(metadata = core.metadata || (core.metadata = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
//# sourceMappingURL=blueprint-core.js.map