import {ModelElement} from '../model-element';

export abstract class Model<T extends ModelElement> {
    public mesh: T;

    public onReady(): void {
    }

    public onDestroy(): void {
    }
}
