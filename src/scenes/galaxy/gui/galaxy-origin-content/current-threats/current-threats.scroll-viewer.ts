import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {
    GalaxyOriginState
} from '../../../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GuiScrollViewer} from '../../../../../gui-objects/gui-scroll-viewer';
import {Threat} from '../../../../../game-core/threat/threat';
import gameState from '../../../../../game-core/game-state/game-state';

export class CurrentThreatsScrollViewer extends GuiScrollViewer {
    public textBlock: GUI.TextBlock;

    constructor(private galaxyOriginState: GalaxyOriginState) {
        super();
    }

    public render(): GUI.Control {
        this.scrollViewer = new GUI.ScrollViewer();
        this.scrollViewer.width = '100%';
        this.scrollViewer.height = '30%';
        this.scrollViewer.background = 'rgb(56,56,56)';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.top = '70px';

        this.textBlock = new GUI.TextBlock();
        this.textBlock.textWrapping = true;
        this.textBlock.resizeToFit = true;
        this.textBlock.color = 'white';

        this.scene.registerBeforeRender(() => {
            this.textBlock.text = 'Current threats: \n' + this.getCurrentThreats().map((el: Threat) => el.name + ' until tour ' + el.tourEnd).join('\n');
        });

        this.scrollViewer.addControl(this.textBlock);

        return this.scrollViewer;
    }

    private getCurrentThreats(): Threat[] {
        return this.galaxyOriginState.threats.filter((el: Threat) => {
            return el.tourStart <= gameState.gameplayState.currentTour;
        });
    }
}
