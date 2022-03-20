import {guiManager} from 'engine';

export abstract class Gui {
    protected guiManager = guiManager();

    public abstract render(): void;
}
