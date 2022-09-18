import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/module/scene/gui/gui-elements/gui-element';
import {IconGuiElement} from '../../shared/icon/icon.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TerritoryNameGuiElement} from './territory-name/territory-name.gui-element';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';

@GuiElement()
export class TerritoryTitleGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('title');
    
    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.territoryState.icon);
    @AppendGuiControl() public territoryName: TerritoryNameGuiElement = new TerritoryNameGuiElement(this.territoryState);

    constructor(private territoryState: TerritoryState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.left = '10px';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
