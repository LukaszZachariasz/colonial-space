import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {
    PlanetBuildingCurrentObjectGuiComponent
} from './planet-building-current-object/planet-building-current-object.gui-component';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {PlanetTotalProductionGuiComponent} from './planet-total-production/planet-total-production.gui-component';
import {SelectionBuildingService} from '../../../../../game-logic/selection/building/selection-building.service';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {selectBuildingById} from '../../../../../game-logic/store/building/building.selector';

@GuiComponent()
export class PlanetBuildingGuiComponent implements GuiControl<GUI.Container>, OnInit {
    @Inject(SelectionBuildingService) private selectionBuildingService: SelectionBuildingService;
    
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendGuiControl() public planetTotalProduction: PlanetTotalProductionGuiComponent = new PlanetTotalProductionGuiComponent(this.planetState);
    @AppendGuiControl() public planetBuildingCurrentObject: PlanetBuildingCurrentObjectGuiComponent = new PlanetBuildingCurrentObjectGuiComponent(this.planetState);

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.height = '200px';
        this.control.width = '100%';
        this.control.paddingTop = '20px';
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public selectBuilding(): void {
        this.selectionBuildingService.select(this.buildingState.id);
    }
}
