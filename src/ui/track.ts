module blueprint.core.ui {
    import Canvas = Fayde.Controls.Canvas;

    var XTrackerProperty = DependencyProperty.RegisterAttached("XTracker", () => Object, Fayde.UIElement);
    var YTrackerProperty = DependencyProperty.RegisterAttached("YTracker", () => Object, Fayde.UIElement);

    export function track (item: IResource, uie: Fayde.UIElement) {
        uie.SetValue(XTrackerProperty, uie.ListenToChanged(Canvas.LeftProperty, getXTracker(item, uie)));
        uie.SetValue(YTrackerProperty, uie.ListenToChanged(Canvas.TopProperty, getYTracker(item, uie)));
    }

    export function untrack (uie: Fayde.UIElement) {
        var xtracker = uie.GetValue(XTrackerProperty);
        if (xtracker)
            xtracker.Detach();
        uie.ClearValue(XTrackerProperty);

        var ytracker = uie.GetValue(YTrackerProperty);
        if (ytracker)
            ytracker.Detach();
        uie.ClearValue(YTrackerProperty);
    }

    interface Tracker {
        (sender, args: IDependencyPropertyChangedEventArgs): void;
    }
    function getXTracker (item: IResource, uie: Fayde.UIElement): Tracker {
        if (uie instanceof controls.Resource) {
            var obj = getUiObject(item);
            return (res: controls.Resource, args: IDependencyPropertyChangedEventArgs) => {
                obj.x = args.NewValue || 0;
                res.OnXMoved(args.NewValue - args.OldValue);
            }
        }
    }
    function getYTracker (item: IResource, uie: Fayde.UIElement): Tracker {
        if (uie instanceof controls.Resource) {
            var obj = getUiObject(item);
            return (res: controls.Resource, args: IDependencyPropertyChangedEventArgs) => {
                obj.y = args.NewValue || 0;
                res.OnYMoved(args.NewValue - args.OldValue);
            }
        }
    }

    interface IUIObject {
        x: number;
        y: number;
    }
    function getUiObject (item: IResource): IUIObject {
        return item["blueprint.ui"] = item["blueprint.ui"] || {};
    }
}