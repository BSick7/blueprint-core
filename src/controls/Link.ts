module blueprint.core.controls {
    import Binding = Fayde.Data.Binding;

    export class Link extends Fayde.Shapes.Path {
        static SourceProperty = DependencyProperty.Register("Source", () => Object, Link);
        Source: ILink;

        constructor () {
            super();
            this.DefaultStyleKey = Link;
        }

        RegisterPeer (peer: Resource) {
            peer.XMoved.on(this.OnChainXMoved, this);
            peer.YMoved.on(this.OnChainYMoved, this);
        }

        UnregisterPeer (peer: Resource) {
            peer.XMoved.off(this.OnChainXMoved, this);
            peer.YMoved.off(this.OnChainYMoved, this);
        }

        protected OnChainXMoved (sender, args: MovedEventArgs) {

        }

        protected OnChainYMoved (sender, args: MovedEventArgs) {

        }
    }
    Library.add(Link);
}