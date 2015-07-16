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
        peers: exjs.IEnumerable<IResource>;
    }
}
declare module blueprint.core {
    interface IResource {
        id: any;
        metadataUid: string;
        owner: IContainer;
        links: exjs.IEnumerableEx<ILink>;
    }
}
declare module blueprint.core.controls {
    class Container extends Fayde.Controls.Control {
        static SourceProperty: DependencyProperty;
        static LinksProperty: DependencyProperty;
        static ChildrenProperty: DependencyProperty;
        Source: IResource;
        Links: nullstone.IEnumerable<IResource>;
        Children: nullstone.IEnumerable<IResource>;
        protected OnSourceChanged(oldValue: IContainer, newValue: IContainer): void;
        protected OnLinksChanged(oldValue: nullstone.IEnumerable<ILink>, newValue: nullstone.IEnumerable<ILink>): void;
        protected OnChildrenChanged(oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>): void;
        private _canvas;
        private $linksProxy;
        private $childrenProxy;
        constructor(source?: IResource);
        OnApplyTemplate(): void;
        protected OnLinksAdded(items: ILink[], index: number): void;
        protected OnLinksRemoved(items: ILink[], index: number): void;
        protected OnChildrenAdded(items: IResource[], index: number): void;
        protected OnChildrenRemoved(items: IResource[], index: number): void;
        CreateChild(res: IResource): Container | Resource;
        CreateLink(link: ILink): Link;
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
        static PeersProperty: DependencyProperty;
        Source: ILink;
        Peers: nullstone.IEnumerable<IResource>;
        constructor(link?: ILink);
        protected OnSourceChanged(oldValue: ILink, newValue: ILink): void;
        protected OnPeersChanged(oldValue: nullstone.IEnumerable<IResource>, newValue: nullstone.IEnumerable<IResource>): void;
    }
}
declare module blueprint.core.controls {
    import ImageSource = Fayde.Media.Imaging.ImageSource;
    class Resource extends Fayde.Controls.Control {
        static SourceProperty: DependencyProperty;
        static ImageSourceProperty: DependencyProperty;
        Source: IResource;
        ImageSource: ImageSource;
        constructor(source?: IResource);
        protected OnSourceChanged(oldValue: IResource, newValue: IResource): void;
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
    var registry: Registry;
    class Registry {
        private types;
        add(type: IMetadataType): void;
        get(bundle?: string, group?: string): exjs.IEnumerableEx<IResourceMetadata>;
        getByUid(uid: any): IResourceMetadata;
    }
}
