import * as GUI from 'babylonjs-gui';
import {PlanetFacilitiesContainer} from './planet-facilities/planet-facilities.container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {PlanetTotalProductionControl} from './planet-total-production/planet-total-production.control';
import {PlanetUnitsContainer} from './planet-units/planet-units.container';
import {StackPanel} from '../../../../../../../engine/gui-manager/stack-panel';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';

export class PlanetBuildingStackPanel extends StackPanel {
    public container: GUI.Container;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.stackPanel = new GUI.StackPanel('buildingStackPanel');

        this.stackPanel.addControl(new PlanetTotalProductionControl(this.planetState).render());

        this.container = new GUI.Container('buildingContainer');
        this.container.height = '150px';
        this.container.width = '100%';
        this.container.addControl(new PlanetFacilitiesContainer(this.planetState).render());
        this.container.addControl(new PlanetUnitsContainer().render());
        this.container.paddingTop = '20px';

        this.stackPanel.addControl(this.container);

        return this.stackPanel;
    }
}