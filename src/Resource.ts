module blueprint.core {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    export class Resource extends Fayde.Controls.Control {
        static ImageSourceProperty = DependencyProperty.Register("ImageSource", () => ImageSource, Resource);
        ImageSource: ImageSource;
    }
    Library.add(Resource);
}