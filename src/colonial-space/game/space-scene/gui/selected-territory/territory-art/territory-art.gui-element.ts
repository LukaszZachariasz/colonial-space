import * as GUI from 'babylonjs-gui';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';

@GuiElement()
export class TerritoryArtGuiElement implements GuiControl<GUI.Image>, OnInit {
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
