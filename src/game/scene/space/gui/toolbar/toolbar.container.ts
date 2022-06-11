import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {ToolbarBackgroundContainer} from './toolbar-background/toolbar-background.container';
import {ToolbarTitleControl} from './toolbar-title/toolbar-title.control';

export class ToolbarContainer extends Container {
    public toolbarBackground: ToolbarBackgroundContainer;
    public toolbarTitle: ToolbarTitleControl;

    public static TOOLBAR_OPACITY = 0.4;

    constructor() {
        super('toolbar');
    }

    public onCreate(): void {
        super.onCreate();
        this.toolbarBackground = new ToolbarBackgroundContainer('toolbarBackground');
        this.toolbarTitle = new ToolbarTitleControl();
    }

    public onBuild(): void {
        this.addControlToContainer(this.toolbarBackground);
        this.addControlToContainer(this.toolbarTitle);
    }

    public onApplyStyles(): void {
        this.control.height = '130px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
