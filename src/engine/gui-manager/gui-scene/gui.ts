// TODO: convert to lifecycles
export abstract class Gui {
    /**
     * This hook is mandatory. Here you should initialize gui.
     */
    public abstract onCreate(): void;

    /**
     * If your gui has some listeners, you need to define them here.
     */
    public onRegisterListeners(): void {
    }

    /**
     * On this hook you can define post destroy actions.
     */
    public onDestroy(): void {
    }
}
