import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingState} from '../../../../game-logic/store/building/building.state';
import {GuiControl} from '../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/gui-manager/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiElement} from '../../shared/text/text.gui-element';

@GuiElement()
export class BuildingHeaderGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('header');
    
    @AppendGuiControl() public title: TextGuiElement = new TextGuiElement('Building', {uppercase: true});

    constructor(private buildingState: BuildingState) {
    }

    public gameOnInit(): void {
        this.control.height = '10%';
        this.control.width = '100%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.title.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
