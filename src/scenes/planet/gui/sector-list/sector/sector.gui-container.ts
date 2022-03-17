import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../../gui-objects/gui-container';
import {GuiObject} from '../../../../../gui-objects/gui-object';
import {SectorFactory} from './sector-factory';
import {
    SectorState
} from '../../../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-state';

export class SectorGuiContainer extends GuiContainer {
    public sector: GuiObject;

    private sectorFactory: SectorFactory = new SectorFactory();

    constructor(public state: SectorState,
                public widthPercentage: number,
                public heightPercentage: number,
                public leftOffset: number,
                public topOffset: number) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('sector');
        this.container.width = this.widthPercentage + '%';
        this.container.height = this.heightPercentage + '%';
        this.container.top = this.topOffset + '%';
        this.container.left = this.leftOffset + '%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.sector = this.sectorFactory.create(this.state.type);

        this.container.addControl(this.sector.render());

        return this.container;
    }
}