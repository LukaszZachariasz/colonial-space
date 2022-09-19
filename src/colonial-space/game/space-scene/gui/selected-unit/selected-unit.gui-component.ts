import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectionUnitService} from '../../../game-logic/selection/unit/selection-unit.service';
import {UnitArtGuiComponent} from './unit-art/unit-art.gui-component';
import {UnitAttributesGuiComponent} from './unit-attributes/unit-attributes.gui-component';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {UnitTitleGuiComponent} from './unit-title/unit-title.gui-component';
import {selectUnitById} from '../../../game-logic/store/unit/unit.selectors';

@GuiComponent()
export class SelectedUnitGuiComponent implements GuiControl<GUI.Container>, OnInit {
    @Inject(SelectionUnitService) private selectionUnitService!: SelectionUnitService;
    
    public control: GUI.Container = new GUI.Container('selectedUnitContainer');
    
    public unitState: UnitState = selectUnitById(this.selectionUnitService.selectedUnitId$.value);

    @AppendGuiControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendGuiControl() public unitArt: UnitArtGuiComponent = new UnitArtGuiComponent(this.unitState);
    @AppendGuiControl() public unitTitle: UnitTitleGuiComponent = new UnitTitleGuiComponent(this.unitState);
    @AppendGuiControl() public unitAttributes: UnitAttributesGuiComponent = new UnitAttributesGuiComponent(this.unitState);

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
