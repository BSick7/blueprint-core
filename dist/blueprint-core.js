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
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container() {
                _super.apply(this, arguments);
            }
            return Container;
        })(Fayde.Controls.ItemsControl);
        core.Container = Container;
        core.Library.add(Container);
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var Link = (function (_super) {
            __extends(Link, _super);
            function Link() {
                _super.apply(this, arguments);
            }
            return Link;
        })(Fayde.Shapes.Path);
        core.Link = Link;
        core.Library.add(Link);
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
var blueprint;
(function (blueprint) {
    var core;
    (function (core) {
        var ImageSource = Fayde.Media.Imaging.ImageSource;
        var Resource = (function (_super) {
            __extends(Resource, _super);
            function Resource() {
                _super.apply(this, arguments);
            }
            Resource.ImageSourceProperty = DependencyProperty.Register("ImageSource", function () { return ImageSource; }, Resource);
            return Resource;
        })(Fayde.Controls.Control);
        core.Resource = Resource;
        core.Library.add(Resource);
    })(core = blueprint.core || (blueprint.core = {}));
})(blueprint || (blueprint = {}));
//# sourceMappingURL=blueprint-core.js.map