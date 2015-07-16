module blueprint.core.controls {
    import CollectionChangedEventArgs = Fayde.Collections.CollectionChangedEventArgs;
    import CollectionChangedAction = Fayde.Collections.CollectionChangedAction;
    import INotifyCollectionChanged_ = Fayde.Collections.INotifyCollectionChanged_;

    export class ItemsPropertyProxy {
        constructor (private $onAdded: (newItems: any[], newIndex: number) => void, private $onRemoved: (oldItems: any[], oldIndex: number) => void) {
        }

        swap (oldValue: nullstone.IEnumerable<any>, newValue: nullstone.IEnumerable<any>) {
            if (oldValue) {
                var onc = INotifyCollectionChanged_.as(oldValue);
                if (onc)
                    onc.CollectionChanged.off(this.onChanged, this);
                CollectionChangedEventArgs.Reset(exjs.en(oldValue).toArray());
            }
            if (newValue) {
                CollectionChangedEventArgs.AddRange(exjs.en(newValue).toArray(), 0);
                var nnc = INotifyCollectionChanged_.as(newValue);
                if (nnc)
                    nnc.CollectionChanged.on(this.onChanged, this);
            }
        }

        private onChanged (e: CollectionChangedEventArgs) {
            switch (e.Action) {
                case CollectionChangedAction.Add:
                    this.$onAdded(e.NewItems, e.NewStartingIndex);
                    break;
                case CollectionChangedAction.Remove:
                    this.$onRemoved(e.OldItems, e.OldStartingIndex);
                    break;
                case CollectionChangedAction.Replace:
                    this.$onRemoved(e.OldItems, e.NewStartingIndex);
                    this.$onAdded(e.NewItems, e.NewStartingIndex);
                    break;
                case CollectionChangedAction.Reset:
                    this.$onRemoved(e.OldItems, 0);
                    break;
            }
        }
    }
}