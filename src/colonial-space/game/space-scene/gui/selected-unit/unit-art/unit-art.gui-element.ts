import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

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
