import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {ControlEvent} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
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
export class PlanetBuildingContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendControl() public planetTotalProductionControl: PlanetTotalProductionContainer = new PlanetTotalProductionContainer(this.planetState);
    @AppendControl() public planetBuildingCurrentObjectContainer: PlanetBuildingCurrentObjectContainer = new PlanetBuildingCurrentObjectContainer(this.planetState);

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameAfterCreated(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public selectBuilding(): void {
        logic().selectedBuildingService.select(this.buildingState.id);
    }
}
