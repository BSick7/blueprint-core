module blueprint.core.controls {
    export class MovedEventArgs implements nullstone.IEventArgs {
        Delta: number;
        constructor (delta: number) {
            Object.defineProperties(this, {
                "Delta": {writable: false, value: delta}
            });
        }
    }
}