import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TextGuiComponent} from '../../../../../../shared/gui/text/text.gui-component';

@GuiComponent()
export class TerritoryNameGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('territoryName');

    @AppendGuiControl() public text: TextGuiComponent = new TextGuiComponent(this.territoryState.name);

    constructor(private territoryState: TerritoryState) {
    }

    public gameOnInit(): void {
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '60px';
    }
}
