module blueprint.core.metadata {
    export interface IResourceMetadata extends IMetadataType {
        description?: string;
        thumbnail?: string;
        tags?: string[];
        isContainer?: boolean;
    }
}