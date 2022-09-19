import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../shared/icon/icon.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TerritoryNameGuiComponent} from './territory-name/territory-name.gui-component';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';

@GuiComponent()
export class TerritoryTitleGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('title');
    
    @AppendGuiControl() public icon: IconGuiComponent = new IconGuiComponent(this.territoryState.icon);
    @AppendGuiControl() public territoryName: TerritoryNameGuiComponent = new TerritoryNameGuiComponent(this.territoryState);

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
