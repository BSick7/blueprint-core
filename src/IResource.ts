module blueprint.core {
    export interface IResource {
        id: any;
        metadataUid: string;
        owner?: IContainer;
        links?: exjs.IEnumerableEx<ILink>;
    }
}