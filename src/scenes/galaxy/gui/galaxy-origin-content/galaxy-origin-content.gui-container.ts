import * as GUI from 'babylonjs-gui';
import {ComingThreatsGuiScrollViewer} from './coming-threats/coming-threats.gui-scroll-viewer';
import {CurrentThreatsScrollViewer} from './current-threats/current-threats.scroll-viewer';
import {GalaxyOriginNameTextGuiObject} from './galaxy-origin-name-text/galaxy-origin-name-text.gui-object';
import {
    GalaxyOriginState
} from '../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GuiContainer} from '../../../../gui-objects/gui-container';
import {RightContentBoxGuiContainer} from '../../../../gui-objects/shared/right-content-box/right-content-box.gui-container';

export class GalaxyOriginContentGuiContainer extends GuiContainer {
    public rightContentBox: RightContentBoxGuiContainer;

    private isCreated = false;

    constructor(private galaxyOriginState: GalaxyOriginState) {
        super();
    }

    public render(): GUI.Control {
        if (this.isCreated) {
            return;
        }

        this.rightContentBox = new RightContentBoxGuiContainer();
        this.rightContentBox.render();

        this.rightContentBox.container.onDisposeObservable.addOnce(() => this.isCreated = false);

        this.rightContentBox.container.addControl(new GalaxyOriginNameTextGuiObject(this.galaxyOriginState).render());
        this.rightContentBox.container.addControl(new CurrentThreatsScrollViewer(this.galaxyOriginState).render());
        this.rightContentBox.container.addControl(new ComingThreatsGuiScrollViewer(this.galaxyOriginState).render());

        this.isCreated = true;

        return this.rightContentBox.container;
    }
}
