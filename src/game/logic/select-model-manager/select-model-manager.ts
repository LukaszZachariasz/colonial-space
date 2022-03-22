import {Selectable} from './selectable';

export class SelectModelManager {
    public selected: Selectable;

    public select(model: Selectable): void {
        this.selected = model;
    }
}