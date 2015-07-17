declare module blueprint.core {
    var version: string;
}
declare module blueprint.core {
    var Library: nullstone.ILibrary;
}
declare module blueprint.core {
    interface IContainer extends IResource {
        children: exjs.IEnumerableEx<IResource>;
    }
}
declare module blueprint.core {
    interface ILink {
        id: any;
        peers: exjs.IEnumerable<IResource>;
    }
}
declare module blueprint.core {
    interface IResource {
        id: any;
        metadataUid: string;
        owner?: IContainer;
        links?: exjs.IEnumerableEx<ILink>;
    }
}
declare module blueprint.core.controls {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    class Resource extends Fayde.Controls.Control {
        static SourceProperty: DependencyProperty;
        static LinksProperty: DependencyProperty;
        static ImageSourceProperty: DependencyProperty;
        Source: IResource;
        Links: nullstone.IEnumerable<ILink>;
        ImageSource: ImageSource;
        protected $owner: IResourceOwner;
        private $lproxy;
        constructor();
        protected OnSourceChanged(oldValue: IResource, newValue: IResource): void;
        protected OnLinksChanged(oldValue: nullstone.IEnumerable<ILink>, newValue: nullstone.IEnumerable<ILink>): void;
        protected OnLinksAdded(items: exjs.IEnumerableEx<ILink>): void;
        protected OnLinksRemoved(items: exjs.IEnumerableEx<ILink>): void;
        AddLinkToRoot(link: Link): void;
        RemoveLinkFromRoot(link: Link): void;
        AttachTo(owner: IResourceOwner): void;
        Detach(): void;
        XMoved: nullstone.Event<MovedEventArgs>;
        YMoved: nullstone.Event<MovedEventArgs>;
        OnXMoved(dx: number): void;
        OnYMoved(dy: number): void;
    }
}
declare module blueprint.core.controls {
    class Container extends Resource implements IResourceOwner {
        static ChildrenProperty: DependencyProperty;
        Children: nullstone.IEnumerable<IResource>;
        Source: IContainer;
        private $canvas;
        private $cproxy;
        private $registered;
        private $links;
        constructor();
        OnApplyTemplate(): void;
        protected OnChildrenChanged(oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>): void;
        protected OnChildrenAdded(items: exjs.IEnumerableEx<IResource>): void;
        protected OnChildrenRemoved(items: exjs.IEnumerableEx<IResource>): void;
        Register(item: IResource): Resource;
        Unregister(item: IResource): Resource;
        protected CreateChild(res: IResource): Resource;
        RegisterLink(item: ILink): Link;
        UnregisterLink(item: ILink): Link;
        AddLinkToRoot(link: Link): void;
        RemoveLinkFromRoot(link: Link): void;
        protected CreateLink(item: ILink): Link;
        AttachTo(owner: IResourceOwner): void;
        Detach(): void;
        HoistLinks(): void;
        UnhoistLinks(): void;
        FindResourceControl(item: IResource, last?: Container): Resource;
        OnXMoved(dx: number): void;
        OnYMoved(dy: number): void;
    }
}
declare module blueprint.core.controls {
    interface IResourceOwner {
        RegisterLink(item: ILink): Link;
        UnregisterLink(item: ILink): Link;
        AddLinkToRoot(link: Link): any;
        RemoveLinkFromRoot(link: Link): any;
        FindResourceControl(item: IResource, last?: Container): Resource;
    }
}
declare module blueprint.core.controls {
    class ItemsPropertyProxy {
        private $onAdded;
        private $onRemoved;
        constructor($onAdded: (newItems: any[], newIndex: number) => void, $onRemoved: (oldItems: any[], oldIndex: number) => void);
        swap(oldValue: nullstone.IEnumerable<any>, newValue: nullstone.IEnumerable<any>): void;
        private onChanged(e);
    }
}
declare module blueprint.core.controls {
    class Link extends Fayde.Shapes.Path {
        static SourceProperty: DependencyProperty;
        Source: ILink;
        constructor();
        RegisterPeer(peer: Resource): void;
        UnregisterPeer(peer: Resource): void;
        protected OnChainXMoved(sender: any, args: MovedEventArgs): void;
        protected OnChainYMoved(sender: any, args: MovedEventArgs): void;
    }
}
declare module blueprint.core.controls {
    class MovedEventArgs implements nullstone.IEventArgs {
        Delta: number;
        constructor(delta: number);
    }
}
declare module blueprint.core.metadata {
    interface IMetadataType {
        uid: any;
        bundle: string;
        group: string;
        name: string;
    }
}
declare module blueprint.core.metadata {
    interface IResourceMetadata extends IMetadataType {
        description?: string;
        thumbnail?: string;
        tags?: string[];
        isContainer?: boolean;
    }
}
declare module blueprint.core.metadata {
    class Registry {
        private types;
        add(type: IMetadataType): void;
        get(bundle?: string, group?: string): exjs.IEnumerableEx<IResourceMetadata>;
        getByUid(uid: any): IResourceMetadata;
        remove(type: IMetadataType): void;
        clear(): void;
    }
    var registry: Registry;
}
declare module blueprint.core.ui {
    function move(uie: Fayde.UIElement, x: number, y: number): void;
}
declare module blueprint.core.ui {
    function track(item: IResource, uie: Fayde.UIElement): void;
    function untrack(uie: Fayde.UIElement): void;
}
