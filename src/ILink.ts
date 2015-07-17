module blueprint.core {
    export interface ILink {
        id: any;
        peers: exjs.IEnumerable<IResource>;
    }
}