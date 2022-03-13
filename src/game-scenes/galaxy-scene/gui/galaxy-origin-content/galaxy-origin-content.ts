import * as GUI from 'babylonjs-gui';
import {ComingThreatsList} from './coming-threats-list/coming-threats-list';
import {CurrentThreatsList} from './current-threats-list/current-threats-list';
import {GalaxyOriginNameText} from './galaxy-origin-name-text/galaxy-origin-name-text';
import {
    GalaxyOriginState
} from '../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GuiContainer} from '../../../../gui-objects/gui-container';
import {RightContentBox} from '../../../../gui-objects/shared/right-content-box/right-content-box';

export class GalaxyOriginContent extends GuiContainer {
    public rightContentBox: RightContentBox;

    private isCreated = false;

    constructor(private galaxyOriginState: GalaxyOriginState) {
        super();
    }

    public render(): GUI.Control {
        if (this.isCreated) {
            return;
        }

        this.rightContentBox = new RightContentBox();
        this.rightContentBox.render();

        this.rightContentBox.container.onDisposeObservable.addOnce(() => this.isCreated = false);

        this.rightContentBox.container.addControl(new GalaxyOriginNameText(this.galaxyOriginState).render());
        this.rightContentBox.container.addControl(new CurrentThreatsList(this.galaxyOriginState).render());
        this.rightContentBox.container.addControl(new ComingThreatsList(this.galaxyOriginState).render());

        this.isCreated = true;

        return this.rightContentBox.container;
    }
}
