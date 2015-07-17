module blueprint.core.metadata {
    export class Registry {
        private types = new exjs.Map<any, IMetadataType>();

        add (type: IMetadataType) {
            this.types.set(type.uid, type);
        }

        get (bundle?: string, group?: string): exjs.IEnumerableEx<IResourceMetadata> {
            return this.types.values()
                .where(t => !bundle || t.bundle === bundle)
                .where(t => !group || t.group === group)
                .toList();
        }

        getByUid (uid: any): IResourceMetadata {
            return this.types.get(uid);
        }
    }
    export var registry = new Registry();
}