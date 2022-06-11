import {Container} from '../../../../../../../engine/gui-manager/gui-elements/container';
import {
    PlanetBuildingCurrentObjectContainer
} from './planet-building-current-object/planet-building-current-object.container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {PlanetTotalProductionContainer} from './planet-total-production/planet-total-production.container';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../../game';
import {selectBuildingById} from '../../../../../../logic/store/building/building.selector';

export class PlanetBuildingContainer extends Container {
    public planetTotalProductionControl: PlanetTotalProductionContainer;
    public planetBuildingCurrentObjectContainer: PlanetBuildingCurrentObjectContainer;
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('buildingContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.planetTotalProductionControl = new PlanetTotalProductionContainer(this.planetState);
        this.planetBuildingCurrentObjectContainer = new PlanetBuildingCurrentObjectContainer(this.planetState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.planetTotalProductionControl);
        this.addControlToContainer(this.planetBuildingCurrentObjectContainer);
    }

    public onRegisterListeners(): void {
        this.control.onPointerDownObservable.add(() => {
            logic().selectedBuildingService.select(this.buildingState.id);
        });
    }

    public onApplyStyles(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }
}
