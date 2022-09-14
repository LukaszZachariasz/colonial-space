import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitArtGuiElement implements GuiControl<GUI.Image>, OnInit {
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
