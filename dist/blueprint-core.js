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
        core.Library = Fayde.TypeManager.resolveLibrary("lib://blueprint-core");
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
            var ImageSource = Fayde.Media.Imaging.ImageSource;
            var Binding = Fayde.Data.Binding;
            var Resource = (function (_super) {
                __extends(Resource, _super);
                function Resource() {
                    var _this = this;
                    _super.call(this);
                    this.XMoved = new nullstone.Event();
                    this.YMoved = new nullstone.Event();
                    this.DefaultStyleKey = Resource;
                    this.$lproxy = new controls.ItemsPropertyProxy(function (items, index) { return _this.OnLinksAdded(items.en()); }, function (items, index) { return _this.OnLinksRemoved(items.en()); });
                    this.SetBinding(Resource.LinksProperty, Binding.fromData({
                        Source: this,
                        Path: "Source.links"
                    }));
                }
                Resource.prototype.OnSourceChanged = function (oldValue, newValue) {
                    if (oldValue) {
                        core.ui.untrack(this);
                        this.ImageSource = null;
                    }
                    if (newValue) {
                        core.ui.track(newValue, this);
                        var meta = core.metadata.registry.getByUid(newValue.metadataUid)
                            || core.metadata.Registry.DEFAULT;
                        this.SetValue(Resource.ImageSourceProperty, nullstone.convertAnyToType(meta.thumbnail, ImageSource));
                    }
                };
                Resource.prototype.OnLinksChanged = function (oldValue, newValue) {
                    this.$lproxy.swap(oldValue, newValue);
                };
                Resource.prototype.OnLinksAdded = function (items) {
                    var _this = this;
                    var owner = this.$owner;
                    if (!owner || !items)
                        return;
                    items.select(function (item) { return owner.RegisterLink(item); })
                        .where(function (link) { return !!link; })
                        .apply(function (link) { return link.RegisterPeer(_this); })
                        .forEach(function (link) { return _this.AddLinkToRoot(link); });
                };
                Resource.prototype.OnLinksRemoved = function (items) {
                    var _this = this;
                    var owner = this.$owner;
                    if (!owner || !items)
                        return;
                    items.select(function (item) { return owner.UnregisterLink(item); })
                        .where(function (link) { return !!link; })
                        .apply(function (link) { return link.UnregisterPeer(_this); })
                        .forEach(function (link) { return _this.RemoveLinkFromRoot(link); });
                };
                Resource.prototype.AddLinkToRoot = function (link) {
                    if (!this.$owner)
                        return;
                    this.$owner.AddLinkToRoot(link);
                };
                Resource.prototype.RemoveLinkFromRoot = function (link) {
                    if (!this.$owner)
                        return;
                    this.$owner.RemoveLinkFromRoot(link);
                };
                Resource.prototype.AttachTo = function (owner) {
                    this.$owner = owner;
                    var source = this.Source;
                    if (source)
                        this.OnLinksAdded(source.links);
                };
                Resource.prototype.Detach = function () {
                    var source = this.Source;
                    if (source)
                        this.OnLinksRemoved(source.links);
                    this.$owner = null;
                };
                Resource.prototype.OnXMoved = function (dx) {
                    this.XMoved.raise(this, new controls.MovedEventArgs(dx));
                };
                Resource.prototype.OnYMoved = function (dy) {
                    this.YMoved.raise(this, new controls.MovedEventArgs(dy));
                };
                Resource.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, Resource, undefined, function (res, args) { return res.OnSourceChanged(args.OldValue, args.NewValue); });
                Resource.LinksProperty = DependencyProperty.Register("Links", function () { return nullstone.IEnumerable_; }, Resource, undefined, function (res, args) { return res.OnLinksChanged(args.OldValue, args.NewValue); });
                Resource.ImageSourceProperty = DependencyProperty.Register("ImageSource", function () { return ImageSource; }, Resource);
                return Resource;
            })(Fayde.Controls.Control);
            controls.Resource = Resource;
            core.Library.add(Resource);
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
/// <reference path="Resource.ts" />
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
                function Container() {
                    var _this = this;
                    _super.call(this);
                    this.$registered = new exjs.Map();
                    this.$links = new exjs.Map();
                    this.DefaultStyleKey = Container;
                    this.$cproxy = new controls.ItemsPropertyProxy(function (items, index) { return _this.OnChildrenAdded(items.en()); }, function (items, index) { return _this.OnChildrenRemoved(items.en()); });
                    this.SetBinding(Container.ChildrenProperty, Binding.fromData({
                        Source: this,
                        Path: "Source.children"
                    }));
                }
                Container.prototype.OnApplyTemplate = function () {
                    _super.prototype.OnApplyTemplate.call(this);
                    this.$canvas = this.GetTemplateChild("Canvas", Canvas);
                    var source = this.Source;
                    if (source)
                        this.OnChildrenAdded(source.children);
                };
                Container.prototype.OnChildrenChanged = function (oldValue, newValue) {
                    this.$cproxy.swap(oldValue, newValue);
                };
                Container.prototype.OnChildrenAdded = function (items) {
                    var _this = this;
                    if (!this.$canvas || !items)
                        return;
                    items.select(function (item) { return _this.Register(item); })
                        .where(function (uie) { return !!uie; })
                        .forEach(function (uie) { return _this.$canvas.Children.Add(uie); });
                };
                Container.prototype.OnChildrenRemoved = function (items) {
                    var _this = this;
                    if (!this.$canvas || !items)
                        return;
                    items.select(function (item) { return _this.Unregister(item); })
                        .where(function (uie) { return !!uie; })
                        .forEach(function (uie) { return _this.$canvas.Children.Remove(uie); });
                };
                Container.prototype.Register = function (item) {
                    var uie = this.$registered.get(item.id);
                    if (uie)
                        return uie;
                    uie = this.CreateChild(item);
                    uie.AttachTo(this);
                    this.$registered.set(item.id, uie);
                    return uie;
                };
                Container.prototype.Unregister = function (item) {
                    var uie = this.$registered.get(item.id);
                    if (!uie)
                        return null;
                    uie.Detach();
                    this.$registered.delete(item.id);
                    return uie;
                };
                Container.prototype.CreateChild = function (res) {
                    var meta = core.metadata.registry.getByUid(res.metadataUid);
                    var ctrl;
                    if (meta && meta.isContainer)
                        ctrl = new Container();
                    else
                        ctrl = new controls.Resource();
                    ctrl.Source = res;
                    return ctrl;
                };
                Container.prototype.RegisterLink = function (item) {
                    var link = this.$links.get(item);
                    if (link)
                        return link;
                    link = this.CreateLink(item);
                    this.$links.set(item, link);
                    return link;
                };
                Container.prototype.UnregisterLink = function (item) {
                    var link = this.$links.get(item);
                    if (!link)
                        return null;
                    this.$links.delete(item);
                    return link;
                };
                Container.prototype.AddLinkToRoot = function (link) {
                    var owner = this.$owner;
                    if (owner) {
                        owner.AddLinkToRoot(link);
                        return;
                    }
                    if (this.$canvas)
                        this.$canvas.Children.Add(link);
                };
                Container.prototype.RemoveLinkFromRoot = function (link) {
                    var owner = this.$owner;
                    if (owner) {
                        owner.RemoveLinkFromRoot(link);
                        return;
                    }
                    if (this.$canvas)
                        this.$canvas.Children.Remove(link);
                };
                Container.prototype.CreateLink = function (item) {
                    var link = new controls.Link();
                    link.Source = item;
                    return link;
                };
                Container.prototype.AttachTo = function (owner) {
                    _super.prototype.AttachTo.call(this, owner);
                    this.HoistLinks();
                };
                Container.prototype.Detach = function () {
                    this.UnhoistLinks();
                    _super.prototype.Detach.call(this);
                };
                Container.prototype.HoistLinks = function () {
                    var _this = this;
                    var owner = this.$owner;
                    if (!owner)
                        return;
                    this.$links.values()
                        .forEach(function (link) { return _this.AddLinkToRoot(link); });
                };
                Container.prototype.UnhoistLinks = function () {
                    var _this = this;
                    this.$links.values()
                        .forEach(function (link) { return _this.RemoveLinkFromRoot(link); });
                };
                Container.prototype.FindResourceControl = function (item, last) {
                    var _this = this;
                    //try me
                    var reg = this.$registered;
                    var res = reg.get(item.id);
                    if (res)
                        return res;
                    //try children
                    res = exjs.en(this.$canvas.Children)
                        .where(function (child) { return child instanceof Container; })
                        .where(function (child) { return child !== last; })
                        .select(function (container) { return container.FindResourceControl(item, _this); })
                        .skipWhile(function (ctrl) { return !ctrl; })
                        .first();
                    if (res)
                        return res;
                    //try up the tree (and potentially back down)
                    if (!this.$owner || last === this.$owner)
                        return null;
                    return this.$owner.FindResourceControl(item, this);
                };
                Container.prototype.OnXMoved = function (dx) {
                    _super.prototype.OnXMoved.call(this, dx);
                    this.$registered.values()
                        .forEach(function (res) { return res.OnXMoved(dx); });
                };
                Container.prototype.OnYMoved = function (dy) {
                    _super.prototype.OnYMoved.call(this, dy);
                    this.$registered.values()
                        .forEach(function (res) { return res.OnYMoved(dy); });
                };
                Container.ChildrenProperty = DependencyProperty.Register("Children", function () { return nullstone.IEnumerable_; }, Container, undefined, function (cont, args) { return cont.OnChildrenChanged(args.OldValue, args.NewValue); });
                return Container;
            })(controls.Resource);
            controls.Container = Container;
            Fayde.Controls.TemplateParts(Container, { Name: "Canvas", Type: Canvas });
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
            var Link = (function (_super) {
                __extends(Link, _super);
                function Link() {
                    _super.call(this);
                    this.DefaultStyleKey = Link;
                }
                Link.prototype.RegisterPeer = function (peer) {
                    peer.XMoved.on(this.OnChainXMoved, this);
                    peer.YMoved.on(this.OnChainYMoved, this);
                };
                Link.prototype.UnregisterPeer = function (peer) {
                    peer.XMoved.off(this.OnChainXMoved, this);
                    peer.YMoved.off(this.OnChainYMoved, this);
                };
                Link.prototype.OnChainXMoved = function (sender, args) {
                };
                Link.prototype.OnChainYMoved = function (sender, args) {
                };
                Link.SourceProperty = DependencyProperty.Register("Source", function () { return Object; }, Link);
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
            var MovedEventArgs = (function () {
                function MovedEventArgs(delta) {
                    Object.defineProperties(this, {
                        "Delta": { writable: false, value: delta }
                    });
                }
                return MovedEventArgs;
            })();
            controls.MovedEventArgs = MovedEventArgs;
        })(controls = core.controls || (core.controls = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var metadata;
        (function (metadata) {
            var Registry = (function () {
                function Registry() {
                    this.types = new exjs.Map();
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
                Registry.prototype.remove = function (type) {
                    this.types.delete(type.uid);
                };
                Registry.prototype.clear = function () {
                    this.types.clear();
                };
                Registry.DEFAULT = {
                    uid: {},
                    bundle: "blueprint",
                    group: "core",
                    name: "Default",
                    thumbnail: blueprint.core.Library.uri.toString() + "/images/gear.png"
                };
                return Registry;
            })();
            metadata.Registry = Registry;
            metadata.registry = new Registry();
        })(metadata = core.metadata || (core.metadata = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var ui;
        (function (ui) {
            var Canvas = Fayde.Controls.Canvas;
            function move(uie, x, y) {
                if (x != null)
                    Canvas.SetLeft(uie, x);
                if (y != null)
                    Canvas.SetTop(uie, y);
            }
            ui.move = move;
        })(ui = core.ui || (core.ui = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var ui;
        (function (ui) {
            var Canvas = Fayde.Controls.Canvas;
            var XTrackerProperty = DependencyProperty.RegisterAttached("XTracker", function () { return Object; }, Fayde.UIElement);
            var YTrackerProperty = DependencyProperty.RegisterAttached("YTracker", function () { return Object; }, Fayde.UIElement);
            function track(item, uie) {
                uie.SetValue(XTrackerProperty, uie.ListenToChanged(Canvas.LeftProperty, getXTracker(item, uie)));
                uie.SetValue(YTrackerProperty, uie.ListenToChanged(Canvas.TopProperty, getYTracker(item, uie)));
            }
            ui.track = track;
            function untrack(uie) {
                var xtracker = uie.GetValue(XTrackerProperty);
                if (xtracker)
                    xtracker.Detach();
                uie.ClearValue(XTrackerProperty);
                var ytracker = uie.GetValue(YTrackerProperty);
                if (ytracker)
                    ytracker.Detach();
                uie.ClearValue(YTrackerProperty);
            }
            ui.untrack = untrack;
            function getXTracker(item, uie) {
                if (uie instanceof core.controls.Resource) {
                    var obj = getUiObject(item);
                    return function (res, args) {
                        obj.x = args.NewValue || 0;
                        res.OnXMoved(args.NewValue - args.OldValue);
                    };
                }
            }
            function getYTracker(item, uie) {
                if (uie instanceof core.controls.Resource) {
                    var obj = getUiObject(item);
                    return function (res, args) {
                        obj.y = args.NewValue || 0;
                        res.OnYMoved(args.NewValue - args.OldValue);
                    };
                }
            }
            function getUiObject(item) {
                return item["blueprint.ui"] = item["blueprint.ui"] || {};
            }
        })(ui = core.ui || (core.ui = {}));
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
//# sourceMappingURL=blueprint-core.js.map