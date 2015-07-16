module blueprint.core {
    export interface IContainer extends IResource {
        children: exjs.IEnumerableEx<IResource>;
    }
}