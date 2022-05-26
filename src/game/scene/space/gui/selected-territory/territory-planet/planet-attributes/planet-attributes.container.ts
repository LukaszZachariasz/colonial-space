import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {SunlightAttributeControl} from './sunlight-attribute/sunlight-attribute.control';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {WaterAttributeControl} from './water-attribute/water-attribute.control';

export class PlanetAttributesContainer extends Container {
    public sunlightAttributeControl: GUI.Control;
    public waterAttributeControl: GUI.Control;

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }

    public render(): GUI.Container {
        this.container = new GUI.Container('attributes');
        this.container.width = '100%';
        this.container.height = '50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.sunlightAttributeControl = new SunlightAttributeControl(this.planetState).render();
        this.container.addControl(this.sunlightAttributeControl);

        this.waterAttributeControl = new WaterAttributeControl(this.planetState).render();
        this.waterAttributeControl.left = '70px';
        this.container.addControl(this.waterAttributeControl);

        return this.container;
    }
}
