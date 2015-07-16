module blueprint.core.controls {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    import Binding = Fayde.Data.Binding;
    import BindingMode = Fayde.Data.BindingMode;

    export class Resource extends Fayde.Controls.Control {
        static SourceProperty = DependencyProperty.Register("Source", () => Object, Resource, undefined, (res: Resource, args) => res.OnSourceChanged(args.OldValue, args.NewValue));
        static ImageSourceProperty = DependencyProperty.Register("ImageSource", () => ImageSource, Resource);
        Source: IResource;
        ImageSource: ImageSource;

        constructor (source?: IResource) {
            super();
            this.DefaultStyleKey = Resource;
            this.Source = source;
        }

        protected OnSourceChanged (oldValue: IResource, newValue: IResource) {
            var meta: metadata.IMetadataType;
            if (newValue && newValue.metadataUid && !!(meta = metadata.registry.getByUid(newValue.metadataUid))) {
                this.SetBinding(Resource.ImageSourceProperty, Binding.fromData({
                    Path: "thumbnail",
                    Source: meta
                }));
                return;
            }
            this.ClearValue(Resource.ImageSourceProperty);
        }
    }
    Library.add(Resource);
}