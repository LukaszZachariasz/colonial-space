import * as GUI from 'babylonjs-gui';
import {BuildingScopeState} from '../../../../../logic/store/territory/building/building-scope.state';
import {Container} from '../../../../../../engine/gui-manager/container';
import {TextControl} from '../../shared/text/text.control';

export class BuildingHeaderContainer extends Container {
    public title = new TextControl(this.buildingScopeState.label, {uppercase: true});

    constructor(private buildingScopeState: BuildingScopeState) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('header');
        this.container.height = '10%';
        this.container.width = '100%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.title.render();
        this.title.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.addControl(this.title.textBlock);
        return this.container;
    }
}
