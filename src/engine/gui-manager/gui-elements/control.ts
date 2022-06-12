import * as GUI from 'babylonjs-gui';

export abstract class Control<T extends GUI.Control> {
    public control: T;

    /**
     * This hook is mandatory. Here you should initialize control.
     */
    public abstract onCreate(): void;

    /**
     * If you want to add controls to your control, this hook is proper place.
     */
    public onBuild(): void {
    }

    /**
     * If your control has some listeners, you need to define them here.
     */
    public onRegisterListeners(): void {
    }

    /**
     * Here you can style your control.
     */
    public onApplyStyles(): void {
    }

    /**
     * This hook allows you to react after control is ready.
     */
    public onReady(): void {
    }

    /**
     * On this hook you can define post destroy actions.
     */
    public onDestroy(): void {
    }
}
