import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../../engine/gui-manager/container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../../game';
import {selectBuildingById} from '../../../../../../logic/store/building/building.selector';

export class PlanetBuildingStackPanel extends Container {
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    constructor(private planetState: TerritoryState<PlanetState>) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('buildingContainer');
        this.container.height = '200px';
        this.container.width = '100%';
        this.container.paddingTop = '20px';
        this.container.background = 'rgba(0, 0, 0, 0.6)';

        this.container.onPointerDownObservable.add(() => {
            logic().selectedBuildingService.select(this.buildingState.id);
        });

        return this.container;
    }
}