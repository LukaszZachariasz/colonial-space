import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {ControlEvent} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {
    PlanetBuildingCurrentObjectGuiElement
} from './planet-building-current-object/planet-building-current-object.gui-element';
import {PlanetState} from '../../../../../../logic/store/territory/planet/planet.state';
import {PlanetTotalProductionGuiElement} from './planet-total-production/planet-total-production.gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {logic} from '../../../../../../game';
import {selectBuildingById} from '../../../../../../logic/store/building/building.selector';

@GuiElement()
export class PlanetBuildingGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendGuiControl() public planetTotalProductionGuiElement: PlanetTotalProductionGuiElement = new PlanetTotalProductionGuiElement(this.planetState);
    @AppendGuiControl() public planetBuildingCurrentObjectGuiElement: PlanetBuildingCurrentObjectGuiElement = new PlanetBuildingCurrentObjectGuiElement(this.planetState);

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
