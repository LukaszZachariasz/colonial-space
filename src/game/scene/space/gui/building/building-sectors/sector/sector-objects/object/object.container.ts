import * as GUI from 'babylonjs-gui';
import {BuildingObjectState} from '../../../../../../../../logic/store/building/building-scope/building-sector/building-object/building-object.state';
import {Container} from '../../../../../../../../../engine/gui-manager/container';
import {TextControl} from '../../../../../shared/text/text.control';

export class ObjectContainer extends Container {
    constructor(private object: BuildingObjectState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('object');
        this.container.width = '300px';
        this.container.height = '100%';
        this.container.background = 'rgba(255, 0, 0, 0.3)';
        this.container.addControl(new TextControl(this.object.name).render());
        return this.container;
    }
}
