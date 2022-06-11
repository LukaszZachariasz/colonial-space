import * as GUI from 'babylonjs-gui';

export abstract class Control<T extends GUI.Control> {
    public control: T;

    public create(): void {
        this.onCreate();
        this.onBuild();
        this.onRegisterListeners();
        this.control.onDisposeObservable.add(() => {
            this.onDestroy();
        });
        this.onApplyStyles();
        this.onReady();
    }

    public abstract onCreate(): void;

    public onBuild(): void {
    }

    public onRegisterListeners(): void {
    }

    public onApplyStyles(): void {
    }

    public onReady(): void {
    }

    public onDestroy(): void {
    }
}
