import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TextGuiElement} from '../../../shared/text/text.gui-element';

@GuiElement()
export class TerritoryNameGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('territoryName');

    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement(this.territoryState.name);

    constructor(private territoryState: TerritoryState) {
    }

    public gameOnInit(): void {
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '60px';
    }
}