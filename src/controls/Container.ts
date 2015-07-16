module blueprint.core.controls {
    import Canvas = Fayde.Controls.Canvas;
    import Binding = Fayde.Data.Binding;

    export class Container extends Fayde.Controls.Control {
        static SourceProperty = DependencyProperty.Register("Source", () => Object, Container, undefined, (cont: Container, args) => cont.OnSourceChanged(args.OldValue, args.NewValue));
        static LinksProperty = DependencyProperty.Register("Links", () => nullstone.IEnumerable_, Container, undefined, (cont: Container, args) => cont.OnSourceChanged(args.OldValue, args.NewValue));
        static ChildrenProperty = DependencyProperty.Register("Children", () => nullstone.IEnumerable_, Container, undefined, (cont: Container, args) => cont.OnChildrenChanged(args.OldValue, args.NewValue));
        Source: IResource;
        Links: nullstone.IEnumerable<IResource>;
        Children: nullstone.IEnumerable<IResource>;

        protected OnSourceChanged (oldValue: IContainer, newValue: IContainer) {
        }

        protected OnLinksChanged (oldValue: nullstone.IEnumerable<ILink>, newValue: nullstone.IEnumerable<ILink>) {
            this.$linksProxy.swap(oldValue, newValue);
        }

        protected OnChildrenChanged (oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>) {
            this.$childrenProxy.swap(oldValue, newValue);
        }

        private _canvas: Canvas;
        private $linksProxy: ItemsPropertyProxy;
        private $childrenProxy: ItemsPropertyProxy;

        constructor (source?: IResource) {
            super();
            this.DefaultStyleKey = Container;
            this.$linksProxy = new ItemsPropertyProxy((items, index) => this.OnLinksAdded(items, index), (items, index) => this.OnLinksRemoved(items, index));
            this.$childrenProxy = new ItemsPropertyProxy((items, index) => this.OnChildrenAdded(items, index), (items, index) => this.OnChildrenRemoved(items, index));
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

        OnApplyTemplate () {
            super.OnApplyTemplate();
            this._canvas = <Canvas>this.GetTemplateChild("canvas", Canvas);
        }

        protected OnLinksAdded (items: ILink[], index: number) {
            items.map(item => this.CreateLink(item))
                .forEach(link => this._canvas.Children.Add(link));
        }

        protected OnLinksRemoved (items: ILink[], index: number) {
            var children = this._canvas.Children;
            exjs.en(children)
                .join(items.en(), uie => (<any>uie).Source, link => link, (uie, link) => uie)
                .forEach(uie => children.Remove(uie));
        }

        protected OnChildrenAdded (items: IResource[], index: number) {
            items.map(item => this.CreateChild(item))
                .forEach(res => this._canvas.Children.Add(res));
        }

        protected OnChildrenRemoved (items: IResource[], index: number) {
            var children = this._canvas.Children;
            exjs.en(children)
                .join(items.en(), uie => (<any>uie).Source, link => link, (uie, link) => uie)
                .forEach(uie => children.Remove(uie));
        }

        CreateChild (res: IResource): Container|Resource {
            if (!(<IContainer>res).children)
                return new Resource(res);
            return new Container(res);
        }

        CreateLink (link: ILink): Link {
            return new Link(link);
        }
    }
    Library.add(Container);
}