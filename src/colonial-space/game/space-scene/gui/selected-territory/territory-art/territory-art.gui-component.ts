import * as GUI from 'babylonjs-gui';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';

@GuiComponent()
export class TerritoryArtGuiComponent implements GuiControl<GUI.Image>, OnInit {
    public control = new GUI.Image('art', this.territoryState.artUrl);

    constructor(private territoryState: TerritoryState) {
    }

    public gameOnInit(): void {
        this.control.width = '150px';
        this.control.height = '150px';
        this.control.top = '60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
