declare module blueprint.core {
    var version: string;
}
declare module blueprint.core {
    var Library: nullstone.ILibrary;
}
declare module blueprint.core {
    class Container extends Fayde.Controls.ItemsControl {
    }
}
declare module blueprint.core {
    class Link extends Fayde.Shapes.Path {
    }
}
declare module blueprint.core {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    class Resource extends Fayde.Controls.Control {
        static ImageSourceProperty: DependencyProperty;
        ImageSource: ImageSource;
    }
}
