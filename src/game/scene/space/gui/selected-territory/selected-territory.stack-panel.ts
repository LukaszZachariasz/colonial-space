import * as GUI from 'babylonjs-gui';
import {StackPanel} from '../../../../../engine/gui-manager/gui-elements/stack-panel';
import {TerritoryArtControl} from './territory-art/territory-art.control';
import {TerritoryPlanetStackPanel} from './territory-planet/territory-planet.stack-panel';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryTitleContainer} from './territory-title/territory-title.container';
import {isPlanet} from '../../../../logic/store/territory/planet/is-planet';
import {logic} from '../../../../game';
import {selectTerritoryById} from '../../../../logic/store/territory/territory.selectors';

export class SelectedTerritoryStackPanel extends StackPanel {
    public backgroundImage: GUI.Image;
    public territoryTitleContainer: TerritoryTitleContainer;
    public territoryArtControl: TerritoryArtControl;
    public territoryPlanetStackPanel: TerritoryPlanetStackPanel;

    public territoryState: TerritoryState = selectTerritoryById(logic().selectedTerritoryService.selectedTerritoryId$.value);

    constructor() {
        super('selectedTerritoryStackPanel');
    }

    public onCreate(): void {
        super.onCreate();

        this.backgroundImage = new GUI.Image('image', 'resources/gui/selected-unit/background.png');
        this.territoryTitleContainer = new TerritoryTitleContainer(this.territoryState);
        this.territoryArtControl = new TerritoryArtControl(this.territoryState);

        if (isPlanet(this.territoryState)) {
            this.territoryPlanetStackPanel = new TerritoryPlanetStackPanel(this.territoryState);
        }
    }

    public onBuild(): void {
        this.addControlToStackPanel(this.backgroundImage);
        this.addControlToStackPanel(this.territoryTitleContainer);
        this.addControlToStackPanel(this.territoryArtControl);

        if (this.territoryPlanetStackPanel) {
            this.addControlToStackPanel(this.territoryPlanetStackPanel);
        }
    }

    public onApplyStyles(): void {
        this.control.width = '25%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.control.isPointerBlocker = true;

/*        this.backgroundImage.width = '100%';
        this.backgroundImage.height = '100%';*/
    }
}
