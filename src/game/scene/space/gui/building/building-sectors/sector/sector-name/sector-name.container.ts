import * as GUI from 'babylonjs-gui';
import {
    BuildingScopeSectorState
} from '../../../../../../../logic/store/building/building-scope/building-sector/building-scope-sector.state';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {TextControl} from '../../../../shared/text/text.control';

export class SectorNameContainer extends Container {
    public text: TextControl = new TextControl(this.sector.name);

    constructor(private sector: BuildingScopeSectorState) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('sectorNameContainer');
        this.container.width = '5%';
        this.container.height = '100%';
        this.container.background = 'rgba(255, 0, 0, 0.4)';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.render();
        this.text.textBlock.rotation = -Math.PI / 2;
        this.container.addControl(this.text.textBlock);
        return this.container;
    }
}
