module blueprint.core.ui {
    import Canvas = Fayde.Controls.Canvas;

    export function move (uie: Fayde.UIElement, x: number, y: number) {
        if (x != null)
            Canvas.SetLeft(uie, x);
        if (y != null)
            Canvas.SetTop(uie, y);
    }
}