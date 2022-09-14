import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {Container} from 'typedi';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {SelectedUnitService} from '../../../../logic/services/unit/selected-unit.service';
import {UnitArtGuiElement} from './unit-art/unit-art.gui-element';
import {UnitAttributesGuiElement} from './unit-attributes/unit-attributes.gui-element';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {UnitTitleGuiElement} from './unit-title/unit-title.gui-element';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class SelectedUnitGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('selectedUnitContainer');
    
    public unitState: UnitState = selectUnitById(Container.get(SelectedUnitService).selectedUnitId$.value);

    @AppendGuiControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendGuiControl() public unitArt: UnitArtGuiElement = new UnitArtGuiElement(this.unitState);
    @AppendGuiControl() public unitTitle: UnitTitleGuiElement = new UnitTitleGuiElement(this.unitState);
    @AppendGuiControl() public unitAttributes: UnitAttributesGuiElement = new UnitAttributesGuiElement(this.unitState);

    public gameOnInit(): void {
        this.control.width = '25%';
        this.control.height = '40%';
        this.control.left = '30px';
        this.control.top = '-50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';
    }
}
