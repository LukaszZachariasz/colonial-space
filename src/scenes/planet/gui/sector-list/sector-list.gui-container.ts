import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../gui-objects/gui-container';
import {
    PlanetState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/planet-state';
import {SectorGuiContainer} from './sector/sector.gui-container';
import {
    SectorState
} from '../../../../engine/game-state/gameplay-state/galaxy-state/orbit-state/planet-state/sector-state/sector-state';

export class SectorListGuiContainer extends GuiContainer {
    public sectors: SectorGuiContainer[] = [];

    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('sectorsContainer');
        this.container.left = '6%';
        this.container.width = '80%';
        this.container.height = '95%';
        // this.container.background = 'rgb(0, 0, 0)';


        const sectorWidthPercentage = 100 / this.planetState.sectors[0].length;
        const sectorHeightPercentage = 100 / this.planetState.sectors.length;

        let topOffset = 0;
        let leftOffset = 0;
        this.planetState.sectors.forEach((sectorRow: SectorState[]) => {
            leftOffset = 0;
            sectorRow.forEach((sectorState: SectorState) => {
                this.sectors.push(new SectorGuiContainer(sectorState, sectorWidthPercentage, sectorHeightPercentage, leftOffset, topOffset));
                leftOffset += sectorWidthPercentage;
            });

            topOffset += sectorHeightPercentage;
        });

        this.sectors.forEach((sector: SectorGuiContainer) => this.container.addControl(sector.render()));


        return this.container;
    }
}