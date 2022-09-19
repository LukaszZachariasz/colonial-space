import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectionTerritoryService} from '../../../game-logic/selection/territory/selection-territory.service';
import {TerritoryArtGuiComponent} from './territory-art/territory-art.gui-component';
import {TerritoryPlanetGuiComponent} from './territory-planet/territory-planet.gui-component';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TerritoryTitleGuiComponent} from './territory-title/territory-title.gui-component';
import {isPlanet} from '../../../game-logic/store/territory/planet/is-planet';
import {selectTerritoryById} from '../../../game-logic/store/territory/territory.selectors';

@GuiComponent()
export class SelectedTerritoryGuiComponent implements GuiControl<GUI.StackPanel>, OnInit {
    @Inject(SelectionTerritoryService) private selectionTerritoryService!: SelectionTerritoryService;
    public control: GUI.StackPanel = new GUI.StackPanel('selectedTerritoryStackPanel');
    public territoryState: TerritoryState = selectTerritoryById(this.selectionTerritoryService.selectedTerritoryId$.value);

    @AppendGuiControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendGuiControl() public territoryTitle: TerritoryTitleGuiComponent = new TerritoryTitleGuiComponent(this.territoryState);
    @AppendGuiControl() public territoryArt: TerritoryArtGuiComponent = new TerritoryArtGuiComponent(this.territoryState);
    @AppendGuiControl() public territoryPlanet: TerritoryPlanetGuiComponent;

    public gameOnInit(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

        if (isPlanet(this.territoryState)) {
            this.territoryPlanet = new TerritoryPlanetGuiComponent(this.territoryState);
        }
    }
}
