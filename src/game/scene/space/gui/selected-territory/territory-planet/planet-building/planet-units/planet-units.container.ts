import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {TextControl} from '../../../../shared/text/text.control';

export class PlanetUnitsContainer extends Container {
    public name: TextControl = new TextControl('Units', {uppercase: true});

    public render(): GUI.Control {
        this.container = new GUI.Container('planetFacilities');
        this.container.background = 'rgba(255, 255, 255, 0.1)';
        this.container.left = '-5%';
        this.container.horizontalAlignment = GUI.Container.HORIZONTAL_ALIGNMENT_RIGHT;
        this.container.width = '40%';
        this.container.height = '100%';

        this.container.addControl(this.name.render());
        this.name.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        return this.container;
    }
}