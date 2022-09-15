import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectionUnitService} from '../../../game-logic/selection/unit/selection-unit.service';
import {UnitArtGuiElement} from './unit-art/unit-art.gui-element';
import {UnitAttributesGuiElement} from './unit-attributes/unit-attributes.gui-element';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {UnitTitleGuiElement} from './unit-title/unit-title.gui-element';
import {selectUnitById} from '../../../game-logic/store/unit/unit.selectors';

@GuiElement()
export class SelectedUnitGuiElement implements GuiControl<GUI.Container>, OnInit {
    @Inject(SelectionUnitService) private selectionUnitService!: SelectionUnitService;
    
    public control: GUI.Container = new GUI.Container('selectedUnitContainer');
    
    public unitState: UnitState = selectUnitById(this.selectionUnitService.selectedUnitId$.value);

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
