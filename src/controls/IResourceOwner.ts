module blueprint.core.controls {
    export interface IResourceOwner {
        RegisterLink (item: ILink): Link;
        UnregisterLink (item: ILink): Link;
        AddLinkToRoot (link: Link);
        RemoveLinkFromRoot (link: Link);
        FindResourceControl (item: IResource, last?: Container): Resource;
    }
}