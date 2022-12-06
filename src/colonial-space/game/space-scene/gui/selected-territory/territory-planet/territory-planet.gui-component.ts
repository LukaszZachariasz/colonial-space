import * as GUI from 'babylonjs-gui';
import {AnalysisService} from '../../../../game-logic/anaylsis/analysis.service';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ColonizationService} from '../../../../game-logic/colonization/colonization.service';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {PlanetAnalysisGuiComponent} from './planet-analysis/planet-analysis.gui-component';
import {PlanetAttributesGuiComponent} from './planet-attributes/planet-attributes.gui-component';
import {PlanetBuildingGuiComponent} from './planet-building/planet-building.gui-component';
import {PlanetColonizationGuiComponent} from './planet-colonization/planet-colonization.gui-component';
import {PlanetState} from '../../../../game-logic/store/territory/planet/planet.state';
import {Subscription, filter, tap} from 'rxjs';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';

@GuiComponent()
export class TerritoryPlanetGuiComponent implements GuiControl<GUI.StackPanel>, OnInit, OnLoad, OnDestroy {
    @Inject(ColonizationService) private colonizationService: ColonizationService;
    @Inject(AnalysisService) private analysisService: AnalysisService;
    
    public control: GUI.StackPanel = new GUI.StackPanel('planetStackPanel');

    @AppendGuiControl() public planetAttributes: PlanetAttributesGuiComponent = new PlanetAttributesGuiComponent(this.planetState);
    @AppendGuiControl() public planetAnalysis: PlanetAnalysisGuiComponent;
    @AppendGuiControl() public planetColonization: PlanetColonizationGuiComponent;
    @AppendGuiControl() public planetBuilding: PlanetBuildingGuiComponent;

    private planetAnalysedSubscription: Subscription;
    private planetColonizedSubscription: Subscription;

    constructor(private planetState: TerritoryState<PlanetState>) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '65%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        if (!this.planetState.data.isAnalysed) {
            this.planetAnalysis = new PlanetAnalysisGuiComponent(this.planetState);
        }
        if (this.planetState.data.isAnalysed && !this.planetState.data.isColonized) {
            this.planetColonization = new PlanetColonizationGuiComponent(this.planetState);
        }
        if (this.planetState.data.isColonized) {
            this.planetBuilding = new PlanetBuildingGuiComponent(this.planetState);
        }
    }

    public gameOnLoad(): void {
        this.planetAnalysedSubscription = this.analysisService.analyzedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetAnalysis.control.dispose()),
            tap(() => this.planetColonization = new PlanetColonizationGuiComponent(this.planetState)),
            tap(() => this.control.addControl(this.planetColonization.control)) // TODO: change detector
        ).subscribe();

        this.planetColonizedSubscription = this.colonizationService.colonizedPlanetCompleted$.pipe(
            filter((id: string) => this.planetState.id === id),
            tap(() => this.planetColonization.control.dispose()),
            tap(() => this.planetBuilding = new PlanetBuildingGuiComponent(this.planetState)),
            tap(() => this.control.addControl(this.planetBuilding.control)) // TODO: change detector
        ).subscribe();
    }

    public gameOnDestroy(): void {
        this.planetAnalysedSubscription?.unsubscribe();
        this.planetColonizedSubscription?.unsubscribe();
    }
}
