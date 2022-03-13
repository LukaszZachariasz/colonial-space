import * as GUI from 'babylonjs-gui';
import {
    GalaxyOriginState
} from '../../../../../engine/game-state/gameplay-state/galaxy-state/galaxy-origin-state/galaxy-origin-state';
import {GuiScrollViewer} from '../../../../../gui-objects/gui-scroll-viewer';
import {Threat} from '../../../../../game-core/threat/threat';
import {gameplayState} from '../../../../../core/game-platform';

export class ComingThreatsGuiScrollViewer extends GuiScrollViewer {
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
        this.scrollViewer.top = '40% + 70px';

        this.textBlock = new GUI.TextBlock();
        this.textBlock.textWrapping = true;
        this.textBlock.resizeToFit = true;
        this.textBlock.color = 'white';

        this.scene.registerBeforeRender(() => {
            this.textBlock.text = 'Coming threats: \n' + this.getComingThreats().map((el: Threat) => {
                if (gameplayState().currentTour < el.unknownUntilTour) {
                    return 'Unknown threat...';
                }
                return el.name + ' start tour ' + el.tourStart + ' until tour ' + el.tourEnd;
            }).join('\n');
        });

        this.scrollViewer.addControl(this.textBlock);

        return this.scrollViewer;
    }

    private getComingThreats(): Threat[] {
        return this.galaxyOriginState.threats.filter((el: Threat) => {
            return el.tourStart > gameplayState().currentTour && el.visibleFromTour <= gameplayState().currentTour;
        });
    }
}
