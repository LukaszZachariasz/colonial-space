import * as GUI from 'babylonjs-gui';
import {BuildingObjectArtControl} from './building-object-art/building-object-art.control';
import {BuildingObjectNameControl} from './building-object-name/building-object-name.control';
import {BuildingObjectProductionControl} from './building-object-production/building-object-production.control';
import {BuildingObjectSelectControl} from './building-object-select/building-object-select.control';
import {BuildingObjectState} from '../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from '../../../../../../../../../engine/gui-manager/container';

export class BuildingObjectContainer extends Container {
    constructor(private object: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('object');
        this.container.width = '200px';
        this.container.height = '100%';
        this.container.background = 'rgba(255, 0, 0, 0.3)';
        this.container.addControl(new BuildingObjectNameControl(this.object).render());
        this.container.addControl(new BuildingObjectProductionControl(this.object).render());
        this.container.addControl(new BuildingObjectArtControl(this.object).render());
        this.container.addControl(new BuildingObjectSelectControl(this.object).render());
        return this.container;
    }
}
