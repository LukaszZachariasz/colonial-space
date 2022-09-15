import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../core/gui-manager/gui-elements/gui-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectedTerritoryService} from '../../../game-logic/territory/selected-territory.service';
import {TerritoryArtGuiElement} from './territory-art/territory-art.gui-element';
import {TerritoryPlanetGuiElement} from './territory-planet/territory-planet.gui-element';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TerritoryTitleGuiElement} from './territory-title/territory-title.gui-element';
import {isPlanet} from '../../../game-logic/store/territory/planet/is-planet';
import {selectTerritoryById} from '../../../game-logic/store/territory/territory.selectors';

@GuiElement()
export class SelectedTerritoryGuiElement implements GuiControl<GUI.StackPanel>, OnInit {
    public control: GUI.StackPanel = new GUI.StackPanel('selectedTerritoryStackPanel');
    public territoryState: TerritoryState = selectTerritoryById(Injector.inject(SelectedTerritoryService).selectedTerritoryId$.value);

    @AppendGuiControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendGuiControl() public territoryTitle: TerritoryTitleGuiElement = new TerritoryTitleGuiElement(this.territoryState);
    @AppendGuiControl() public territoryArt: TerritoryArtGuiElement = new TerritoryArtGuiElement(this.territoryState);
    @AppendGuiControl() public territoryPlanet: TerritoryPlanetGuiElement;

    public gameOnInit(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

        if (isPlanet(this.territoryState)) {
            this.territoryPlanet = new TerritoryPlanetGuiElement(this.territoryState);
        }
    }
}
