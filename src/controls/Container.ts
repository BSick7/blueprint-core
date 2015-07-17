/// <reference path="Resource.ts" />

module blueprint.core.controls {
    import Canvas = Fayde.Controls.Canvas;
    import Binding = Fayde.Data.Binding;

    export class Container extends Resource implements IResourceOwner {
        static ChildrenProperty = DependencyProperty.Register("Children", () => nullstone.IEnumerable_, Container, undefined, (cont: Container, args) => cont.OnChildrenChanged(args.OldValue, args.NewValue));
        Children: nullstone.IEnumerable<IResource>;
        Source: IContainer;

        private $canvas: Canvas;
        private $cproxy: ItemsPropertyProxy;
        private $registered = new exjs.Map<IResource, Resource>();
        private $links = new exjs.Map<ILink, Link>();

        constructor () {
            super();
            this.DefaultStyleKey = Container;
            this.$cproxy = new ItemsPropertyProxy((items: IResource[], index) => this.OnChildrenAdded(items.en()), (items: IResource[], index) => this.OnChildrenRemoved(items.en()));
            this.SetBinding(Container.ChildrenProperty, Binding.fromData({
                Source: this,
                Path: "Source.children"
            }));
        }

        OnApplyTemplate () {
            super.OnApplyTemplate();
            this.$canvas = <Canvas>this.GetTemplateChild("Canvas", Canvas);
            var source = this.Source;
            if (source)
                this.OnChildrenAdded(source.children);
        }

        protected OnChildrenChanged (oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>) {
            this.$cproxy.swap(oldValue, newValue);
        }

        protected OnChildrenAdded (items: exjs.IEnumerableEx<IResource>) {
            if (!this.$canvas || !items)
                return;
            items.select(item => this.Register(item))
                .where(uie => !!uie)
                .forEach(uie => this.$canvas.Children.Add(uie));
        }

        protected OnChildrenRemoved (items: exjs.IEnumerableEx<IResource>) {
            if (!this.$canvas || !items)
                return;
            items.select(item => this.Unregister(item))
                .where(uie => !!uie)
                .forEach(uie => this.$canvas.Children.Remove(uie));
        }

        Register (item: IResource): Resource {
            var uie = this.$registered.get(item.id);
            if (uie)
                return uie;
            uie = this.CreateChild(item);
            uie.AttachTo(this);
            this.$registered.set(item.id, uie);
            return uie;
        }

        Unregister (item: IResource): Resource {
            var uie = this.$registered.get(item.id);
            if (!uie)
                return null;
            uie.Detach();
            this.$registered.delete(item.id);
            return uie;
        }

        protected CreateChild (res: IResource): Resource {
            var meta = metadata.registry.getByUid(res.metadataUid);
            var ctrl: Resource;
            if (meta && meta.isContainer)
                ctrl = new Container();
            else
                ctrl = new Resource();
            ctrl.Source = res;
            return ctrl;
        }

        RegisterLink (item: ILink): Link {
            var link = this.$links.get(item);
            if (link)
                return link;
            link = this.CreateLink(item);
            this.$links.set(item, link);
            return link;
        }

        UnregisterLink (item: ILink) {
            var link = this.$links.get(item);
            if (!link)
                return null;
            this.$links.delete(item);
            return link;
        }

        AddLinkToRoot (link: Link) {
            var owner = this.$owner;
            if (owner) {
                owner.AddLinkToRoot(link);
                return;
            }
            var canvas = this.$canvas;
            if (canvas && !canvas.Children.Contains(link))
                canvas.Children.Add(link);
        }

        RemoveLinkFromRoot (link: Link) {
            var owner = this.$owner;
            if (owner) {
                owner.RemoveLinkFromRoot(link);
                return;
            }
            if (this.$canvas)
                this.$canvas.Children.Remove(link);
        }

        protected CreateLink (item: ILink): Link {
            var link = new Link();
            link.Source = item;
            return link;
        }

        AttachTo (owner: IResourceOwner) {
            super.AttachTo(owner);
            this.HoistLinks();
        }

        Detach () {
            this.UnhoistLinks();
            super.Detach();
        }

        HoistLinks () {
            var owner = this.$owner;
            if (!owner)
                return;
            this.$links.values()
                .forEach(link => this.AddLinkToRoot(link));
        }

        UnhoistLinks () {
            this.$links.values()
                .forEach(link => this.RemoveLinkFromRoot(link));
        }

        FindResourceControl (item: IResource, last?: Container): Resource {
            //try me
            var reg = this.$registered;
            var res = reg.get(item.id);
            if (res)
                return res;
            //try children
            res = exjs.en(this.$canvas.Children)
                .where(child => child instanceof Container)
                .where((child: Container) => child !== last)
                .select((container: Container) => container.FindResourceControl(item, this))
                .skipWhile(ctrl => !ctrl)
                .first();
            if (res)
                return res;
            //try up the tree (and potentially back down)
            if (!this.$owner || last === this.$owner)
                return null;
            return this.$owner.FindResourceControl(item, this);
        }

        OnXMoved (dx: number) {
            super.OnXMoved(dx);
            this.$registered.values()
                .forEach(res => res.OnXMoved(dx));
        }

        OnYMoved (dy: number) {
            super.OnYMoved(dy);
            this.$registered.values()
                .forEach(res => res.OnYMoved(dy));
        }
    }
    Fayde.Controls.TemplateParts(Container,
        {Name: "Canvas", Type: Canvas});
    Library.add(Container);
}