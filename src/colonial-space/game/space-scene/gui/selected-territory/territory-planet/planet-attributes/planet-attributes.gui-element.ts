import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetState} from '../../../../../game-logic/store/territory/planet/planet.state';
import {PollutionAttributeGuiElement} from './pollution-attribute/pollution-attribute.gui-element';
import {Subscription, tap} from 'rxjs';
import {SunlightAttributeGuiElement} from './sunlight-attribute/sunlight-attribute.gui-element';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {WaterAttributeGuiElement} from './water-attribute/water-attribute.gui-element';
import {selectTerritoryById} from '../../../../../game-logic/store/territory/territory.selectors';

@GuiElement()
export class PlanetAttributesGuiElement implements GuiControl<GUI.Container>, OnInit, OnLoad, OnDestroy {
    @Inject(TourService) private tourService: TourService;
    
    public control: GUI.Container = new GUI.Container('attributes');
    
    @AppendGuiControl() public sunlightAttribute: SunlightAttributeGuiElement = new SunlightAttributeGuiElement(this.planetState);
    @AppendGuiControl() public waterAttribute: WaterAttributeGuiElement = new WaterAttributeGuiElement(this.planetState);
    @AppendGuiControl() public pollutionAttribute: PollutionAttributeGuiElement = new PollutionAttributeGuiElement(this.planetState);

    private subscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '50px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.waterAttribute.control.left = '70px';
        this.pollutionAttribute.control.left = '140px';
    }

    public gameOnLoad(): void {
        this.subscription = this.tourService.completeTour$.pipe(
            tap(() => {
                this.planetState = selectTerritoryById(this.planetState.id);
            })
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
