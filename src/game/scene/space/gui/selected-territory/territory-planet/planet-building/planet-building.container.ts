import {Container} from '../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {ControlEvent} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {
    PlanetBuildingCurrentObjectContainer
} from './planet-building-current-object/planet-building-current-object.container';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {PlanetTotalProductionContainer} from './planet-total-production/planet-total-production.container';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../../game';
import {selectBuildingById} from '../../../../../../logic/store/building/building.selector';

@GuiElement()
export class PlanetBuildingContainer extends Container {
    public planetTotalProductionControl: PlanetTotalProductionContainer;
    public planetBuildingCurrentObjectContainer: PlanetBuildingCurrentObjectContainer;
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    constructor(private planetState: TerritoryState<PlanetState>) {
        super('buildingContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
        this.control.background = 'rgba(0, 0, 0, 0.6)';

        this.planetTotalProductionControl = new PlanetTotalProductionContainer(this.planetState);
        this.addControlToContainer(this.planetTotalProductionControl);

        this.planetBuildingCurrentObjectContainer = new PlanetBuildingCurrentObjectContainer(this.planetState);
        this.addControlToContainer(this.planetBuildingCurrentObjectContainer);
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public selectBuilding(): void {
        logic().selectedBuildingService.select(this.buildingState.id);
    }
}
