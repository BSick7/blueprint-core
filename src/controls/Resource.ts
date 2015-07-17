module blueprint.core.controls {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    import Binding = Fayde.Data.Binding;
    import BindingMode = Fayde.Data.BindingMode;

    export class Resource extends Fayde.Controls.Control {
        static SourceProperty = DependencyProperty.Register("Source", () => Object, Resource, undefined, (res: Resource, args) => res.OnSourceChanged(args.OldValue, args.NewValue));
        static LinksProperty = DependencyProperty.Register("Links", () => nullstone.IEnumerable_, Resource, undefined, (res: Resource, args) => res.OnLinksChanged(args.OldValue, args.NewValue));
        static ImageSourceProperty = DependencyProperty.Register("ImageSource", () => ImageSource, Resource);
        Source: IResource;
        Links: nullstone.IEnumerable<ILink>;
        ImageSource: ImageSource;

        protected $owner: IResourceOwner;
        private $lproxy: ItemsPropertyProxy;

        constructor () {
            super();
            this.DefaultStyleKey = Resource;
            this.$lproxy = new ItemsPropertyProxy((items: ILink[], index) => this.OnLinksAdded(items.en()), (items: ILink[], index) => this.OnLinksRemoved(items.en()));
            this.SetBinding(Resource.LinksProperty, Binding.fromData({
                Source: this,
                Path: "Source.links"
            }));
        }

        protected OnSourceChanged (oldValue: IResource, newValue: IResource) {
            if (oldValue) {
                ui.untrack(this);
                this.ImageSource = null;
            }
            if (newValue) {
                ui.track(newValue, this);
                var meta = metadata.registry.getByUid(newValue.metadataUid)
                    || metadata.Registry.DEFAULT;
                this.SetValue(Resource.ImageSourceProperty, nullstone.convertAnyToType(meta.thumbnail, ImageSource));
            }
        }

        protected OnLinksChanged (oldValue: nullstone.IEnumerable<ILink>, newValue: nullstone.IEnumerable<ILink>) {
            this.$lproxy.swap(oldValue, newValue);
        }

        protected OnLinksAdded (items: exjs.IEnumerableEx<ILink>) {
            var owner = this.$owner;
            if (!owner || !items)
                return;
            items.select(item => owner.RegisterLink(item))
                .where(link => !!link)
                .apply((link: Link) => link.RegisterPeer(this))
                .forEach(link => this.AddLinkToRoot(link));
        }

        protected OnLinksRemoved (items: exjs.IEnumerableEx<ILink>) {
            var owner = this.$owner;
            if (!owner || !items)
                return;
            items.select(item => owner.UnregisterLink(item))
                .where(link => !!link)
                .apply((link: Link) => link.UnregisterPeer(this))
                .forEach(link => this.RemoveLinkFromRoot(link));
        }

        AddLinkToRoot (link: Link) {
            if (!this.$owner)
                return;
            this.$owner.AddLinkToRoot(link);
        }

        RemoveLinkFromRoot (link: Link) {
            if (!this.$owner)
                return;
            this.$owner.RemoveLinkFromRoot(link);
        }

        AttachTo (owner: IResourceOwner) {
            this.$owner = owner;
            var source = this.Source;
            if (source)
                this.OnLinksAdded(source.links);
        }

        Detach () {
            var source = this.Source;
            if (source)
                this.OnLinksRemoved(source.links);
            this.$owner = null;
        }

        XMoved = new nullstone.Event<MovedEventArgs>();
        YMoved = new nullstone.Event<MovedEventArgs>();

        OnXMoved (dx: number) {
            this.XMoved.raise(this, new MovedEventArgs(dx));
        }

        OnYMoved (dy: number) {
            this.YMoved.raise(this, new MovedEventArgs(dy));
        }
    }
    Library.add(Resource);
}