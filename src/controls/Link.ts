module blueprint.core.controls {
    import Binding = Fayde.Data.Binding;

    export class Link extends Fayde.Shapes.Path {
        static SourceProperty = DependencyProperty.Register("Source", () => Object, Link, undefined, (link: Link, args) => link.OnSourceChanged(args.OldValue, args.NewValue));
        static PeersProperty = DependencyProperty.Register("Peers", () => nullstone.IEnumerable_, Link, undefined, (link: Link, args) => link.OnPeersChanged(args.OldValue, args.NewValue));
        Source: ILink;
        Peers: nullstone.IEnumerable<IResource>;

        constructor (link?: ILink) {
            super();
            this.DefaultStyleKey = Link;
            this.Source = link;
        }

        protected OnSourceChanged (oldValue: ILink, newValue: ILink) {
            this.SetBinding(Link.PeersProperty, Binding.fromData({
                Path: "peers",
                Source: newValue
            }))
        }

        protected OnPeersChanged (oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>) {
        }
    }
    Library.add(Link);
}