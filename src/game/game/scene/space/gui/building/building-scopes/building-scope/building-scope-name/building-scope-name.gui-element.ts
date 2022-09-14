import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../core/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';

@GuiElement()
export class BuildingScopeNameGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('sectorNameContainer');
    
    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement(this.scopeState.name);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '5%';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.4)';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.rotation = -Math.PI / 2;
    }
}