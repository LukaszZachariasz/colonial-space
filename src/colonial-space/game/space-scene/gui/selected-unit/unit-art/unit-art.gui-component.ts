import * as GUI from 'babylonjs-gui';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

@GuiComponent()
export class UnitArtGuiComponent implements GuiControl<GUI.Image>, OnInit {
    public control = new GUI.Image('art', this.unitState.artUrl);

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '70%';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
