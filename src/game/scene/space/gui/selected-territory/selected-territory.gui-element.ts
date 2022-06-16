import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {TerritoryArtGuiElement} from './territory-art/territory-art.gui-element';
import {TerritoryPlanetGuiElement} from './territory-planet/territory-planet.gui-element';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryTitleGuiElement} from './territory-title/territory-title.gui-element';
import {isPlanet} from '../../../../logic/store/territory/planet/is-planet';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

@GuiElement()
export class SelectedTerritoryGuiElement implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('selectedTerritoryStackPanel');
    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    @AppendGuiControl() public backgroundImage: GUI.Image = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
    @AppendGuiControl() public territoryTitleGuiElement: TerritoryTitleGuiElement = new TerritoryTitleGuiElement(this.territoryState);
    @AppendGuiControl() public territoryArtGuiElement: TerritoryArtGuiElement = new TerritoryArtGuiElement(this.territoryState);
    @AppendGuiControl() public territoryPlanetGuiElement: TerritoryPlanetGuiElement;

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

        if (isPlanet(this.territoryState)) {
            this.territoryPlanetGuiElement = new TerritoryPlanetGuiElement(this.territoryState);
        }
    }
}
