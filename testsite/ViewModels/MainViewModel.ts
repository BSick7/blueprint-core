type IResource = blueprint.core.IResource;
type IContainer = blueprint.core.IContainer;

class MainViewModel extends Fayde.MVVM.ViewModelBase {
    RootContainer: IContainer;

    constructor () {
        super();
        this.RootContainer = {
            id: 1,
            metadataUid: "1",
            children: [
                <IResource>{
                    id: 2,
                    metadataUid: "123456789"
                },
                <IResource>{
                    id: 3,
                    metadataUid: "123456789"
                }
            ].en()
        };
    }
}
Fayde.MVVM.NotifyProperties(MainViewModel, ["RootContainer"]);
export = MainViewModel;