import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiContainer} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../../shared/text/text.control';

@GuiElement()
export class BuildingScopeNameContainer extends GuiContainer implements AfterCreated {
    public text: TextControl = new TextControl(this.scopeState.name);

    constructor(private scopeState: BuildingScopeState) {
        super('sectorNameContainer');
    }

    public gameAfterCreated(): void {
        this.text = new TextControl(this.scopeState.name);

        this.control.width = '5%';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.4)';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.text.control.rotation = -Math.PI / 2;
        this.addControlToContainer(this.text);
    }
}
