import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event';
import {ControlEventListener} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event-listener';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {
    PlanetBuildingCurrentObjectGuiElement
} from './planet-building-current-object/planet-building-current-object.gui-element';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {PlanetTotalProductionGuiElement} from './planet-total-production/planet-total-production.gui-element';
import {SelectionBuildingService} from '../../../../../game-logic/selection/building/selection-building.service';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {selectBuildingById} from '../../../../../game-logic/store/building/building.selector';

@GuiElement()
export class PlanetBuildingGuiElement implements GuiControl<GUI.Container>, OnInit {
    @Inject(SelectionBuildingService) private selectionBuildingService: SelectionBuildingService;
    
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState = selectBuildingById(this.planetState.data.buildingId);

    @AppendGuiControl() public planetTotalProduction: PlanetTotalProductionGuiElement = new PlanetTotalProductionGuiElement(this.planetState);
    @AppendGuiControl() public planetBuildingCurrentObject: PlanetBuildingCurrentObjectGuiElement = new PlanetBuildingCurrentObjectGuiElement(this.planetState);

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
