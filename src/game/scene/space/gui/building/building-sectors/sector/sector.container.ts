import * as GUI from 'babylonjs-gui';
import {BuildingScopeSectorState} from '../../../../../../logic/store/building/building-scope/building-sector/building-scope-sector.state';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {SectorNameContainer} from './sector-name/sector-name.container';
import {SectorObjectsContainer} from './sector-objects/sector-objects.container';

export class SectorContainer extends Container {
    constructor(private sector: BuildingScopeSectorState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('sector');
        this.container.width = '100%';
        this.container.height = '300px';
        this.container.addControl(new SectorNameContainer(this.sector).render());
        this.container.addControl(new SectorObjectsContainer(this.sector).render());
        return this.container;
    }
}
