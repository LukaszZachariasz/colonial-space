import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {PlanetState} from '../../../../../logic/store/territory/planet/planet.state';
import {
    SelectedTerritoryPlanetAttributesContainer
} from './selected-territory-planet-attributes/selected-territory-planet-attributes.container';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';


export class SelectedTerritoryPlanetContainer extends Container {
    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Container {
        this.container = new GUI.Container('planetContainer');
        this.container.width = '100%';
        this.container.height = '65%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.container.addControl(new SelectedTerritoryPlanetAttributesContainer(this.planetState).render());

        return this.container;
    }
}
